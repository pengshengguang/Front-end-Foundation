class HD {
  static PENDING = 'pedding'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor (executor) {
    this.status = HD.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error) 
    }
  }
  resolve (value) {
    if (this.status === HD.PENDING) {
      this.status = HD.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callbacks.map(callback => {
          try {
            callback.onFulfilled(this.value)
          } catch (error) {
            callback.onRejected(error)
          }
        })
      })
    }
  }
  reject (reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECTED
      this.value = reason
      setTimeout(() => {
        // 注意，如果最外面的HD，也就是resolve或者reject没有被setTimeout包裹，那么this.callbacks就是空数组
        this.callbacks.map(callback => {
          try {
            callback.onRejected(reason)
          } catch (error) {
            callback.onRejected(error)
          }
        })
      })
    }
  }
  then (onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => this.value  // 这里要返回this.value是要解决.then().then(.....) 的穿透问题
    }
    if (typeof onRejected !== 'function') {
      onRejected = () =>  this.value
    }
    return new HD((resolve, reject) => {
      if (this.status === HD.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            try {
              let result = onFulfilled(value)
              if (result instanceof HD) {
                result.then(resolve, reject)
              } else {
                resolve(result)
              }
            } catch (error) {
              reject(error)
            }
          },
          onRejected: value => {
            try {
              let result = onRejected(value)
              if (result instanceof HD) {
                result.then(resolve, reject)
              } else {
                resolve(result)
              }
            } catch (error) {
              reject(error)
            }
          }
        })
      }
      if (this.status === HD.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            if (result instanceof HD) {
              // result.then(value => {
              //   resolve(value)
              // }, reason => {
              //   reject(reason)
              // })
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === HD.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            if (result instanceof HD) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
  static resolve (value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  static reject (value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject)
      } else {
        reject(value)
      }
    })
  }
  static all (promises) {
    const values = []
    return new HD((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          values.push(value)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  static race (promises) { 
    return new HD((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolve(value) // 因为这个new HD 这个promise一旦被改变了，就不可逆了，所以循环重复执行也是没有用，哈哈哈
        }, reason => {
          reject(reason)
        })
      })
    })
  }
}
