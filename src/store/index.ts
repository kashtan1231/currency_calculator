import Vue from 'vue'
import Vuex from 'vuex'
import currency from './currency'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    initialiseStore(state) {
      const savedState = localStorage.getItem('store')
      if (savedState) {
        this.replaceState({ ...state, ...JSON.parse(savedState) })
      }
    }
  },
  actions: {},
  modules: {
    currency
  }
})
