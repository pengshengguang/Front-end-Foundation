/*
 * @Description: 
 * @version: 
 * @Author: PSG
 * @Date: 2021-10-27 15:18:49
 * @LastEditors: PSG
 * @LastEditTime: 2021-10-28 12:57:47
 */

// 出处：
// https://www.bilibili.com/video/BV1g44y117Sw?p=4

class Vue{
  constructor(options) {
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$options = options
    this.$watchEvent = {}
    this.proxyData()  // 这里是为了实现 在mehthods里面能够直接用this.xxx直接访问this.$data里面的值
    this.observe()
    this.compile(this.$el)
  }
  // 劫持data中的属性，并且赋值给当前实例(大对象)
  proxyData() { 
    for (let key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(val) {
          this.$data[key] = val
        }
      })
    }
  }
  // 劫持数据变化进行更新视图
  observe() {
    for (let key in this.$data) {
      let value = this.$data[key]
      let that = this
      Object.defineProperty(this.$data, key, {
        get() {
          return value
        },
        set(val) {
          value = val
          // 如果修改了，执行update方法
          if (that.$watchEvent[key]) {
            that.$watchEvent[key].forEach((item, index) => {
              item.update()
            })
          }
        }
      })
    }
  }
  // 编辑解析
  compile(node) {
    node.childNodes.forEach((item, index) => {
      // 元素节点
      if (item.nodeType === 1) {
        // 判断事件
        if (item.hasAttribute('@click')) {
          let vmKey = item.getAttribute('@click').trim()
          item.addEventListener('click', (event) => {
            this.eventFn = this.$options.methods[vmKey].bind(this) // 这里用bind绑定this，是为了让执行btn里面的函数体是指向当前实例。否则this指向window
            this.eventFn(event)
          })
        }
        // 判断v-model
        if (item.hasAttribute('v-model')) {
          let vmKey = item.getAttribute('v-model').trim()
          item.value = this[vmKey]
          item.addEventListener('input', (event) => {
            this[vmKey] = item.value
            console.log(item.value, event)
          })
        }

        if (item.childNodes.length > 0) {
          this.compile(item)
        }
      }
      // 文本节点
      if (item.nodeType === 3) {
        let reg = /\{\{(.*)\}\}/g
        let text = item.textContent
        item.textContent = item.textContent.replace(reg, (match, vmKey) => {
          vmKey = vmKey.trim()
          
          if (this.hasOwnProperty(vmKey)) {
            let watcher = new Watch(this, vmKey, item, 'textContent')
            if (this.$watchEvent[vmKey]) {
              this.$watchEvent[vmKey].push(watcher)
            } else {
              this.$watchEvent[vmKey] = []
              this.$watchEvent[vmKey].push(watcher)
            }
          }
          
          return this.$data[vmKey]
        })
      }
    });
  }
}

class Watch{
  constructor(vm, key, node, attr) {
    this.vm = vm  // Vue对象
    this.key = key  // 就是data的数据
    this.node = node  // 节点 
    this.attr = attr  // textContent
  }
  // 数据发生改变，来更新视图
  update() {
    this.node[this.attr] = this.vm[this.key]
  }
}