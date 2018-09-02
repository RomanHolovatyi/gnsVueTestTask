import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/test.json'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
  users: JSON.parse(localStorage.getItem('usersList')) || users
}

const getters = {
  getUserById: state => id => state.users.find(item => item.id === id)
}

const actions = {
  createTableItem ({ commit }, newItem) {
    const newTableData = [ ...state.users, newItem ]
    commit(types.SET_USERS, newTableData)
  },
  deleteTableItem ({ commit }, deletedItemId) {
    const newTableData = state.users.filter((tableItem) => {
      return (deletedItemId !== tableItem.id)
    })
    commit(types.SET_USERS, newTableData)
  },
  editTableItem ({ commit }, editedItem) {
    const newTableData = state.users.map((tableItem) => {
      if (tableItem.id === editedItem.id) {
        tableItem = { ...editedItem }
      }
      return tableItem
    })
    commit(types.SET_USERS, newTableData)
  }
}

const mutations = {
  [types.SET_USERS] (state, newTableData) {
    localStorage.setItem('usersList', JSON.stringify([ ...newTableData ]))
    state.tableData = [ ...newTableData ]
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
