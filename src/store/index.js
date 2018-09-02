import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/test.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: users
  },
  mutations: {

  },
  actions: {

  }
})
