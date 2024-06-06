/*
 * @Description: 
 * @version: 
 * @Author: PSG
 * @Date: 2021-10-28 15:00:00
 * @LastEditors: PSG
 * @LastEditTime: 2021-10-28 15:37:48
 */
import Vue from "../vue"
import Vuex from '../vuex'

// this.$store
Vue.use(Vuex)
debugger
const store = new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    // state从哪里来
    add(state) {
      state.counter++
    },
  },
  actions: {
    // 参数从哪里来
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  moudles: {}
})
