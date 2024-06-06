/*
 * @Description: 
 * @version: 
 * @Author: PSG
 * @Date: 2021-10-28 15:01:26
 * @LastEditors: PSG
 * @LastEditTime: 2021-10-28 15:24:49
 */

// 任务
// 1、插件：挂在$store，在任何组件都可通过this访问到$store实例
// 2、实现Store类

let Vue // 缓存当前Vue

class Store {
  constructor(options) {
    // state响应式处理
    // this.$store.state.xxx
    this.state = new Vue({
      data: options.state
    })
  }
}

const install = (_Vue) => {
  Vue = _Vue
  // 全局混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install}