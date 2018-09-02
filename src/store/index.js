import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/test.json'
// import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
  users: users
}

const getters = {
  getUserById: state => id => state.users.find(item => item.id === id)
}

const actions = {
}

const mutations = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
