<template>
  <div class="table">
    <p>Total sum of currency {{ currencySum }}</p>
    <div>
      Search by
      <select v-model="currentSearchOption">
        <option
          v-for="(option, index) in searchOptions"
          :value="option"
          :key="`search-option-${index}`"
        >
          {{option}}
        </option>
      </select>
      <input v-model="searchValue"/>
    </div>
    <div>
      <button
        class="table__add-new-user"
        @click="showAddUserModal"
      >
        add user
      </button>
    </div>
    <table class="users-table">
      <thead>
      <th>
        Sort by
      </th>
      <th @click="sortBy('name')">name
      </th>
      <th @click="sortBy('location')">location
      </th>
      <th @click="sortBy('currency')">
        currency
      </th>
      <th>
        action
      </th>
      </thead>
      <tbody v-if="filteredUsers.length">
      <tr
        v-for="user in filteredUsers"
        :key="user.id"
      >
        <td>
          <router-link
            :to="{ path: `/table-item-details/${user.id}` }"
          >
            link to user
          </router-link>
        </td>
        <td><input v-model="user.name"/></td>
        <td><input v-model="user.location"/></td>
        <td><input v-model="user.currency"/></td>
        <td>
          <button @click="showEditUserModal(user)">edit</button>
          <button @click="removeUser(user.id)">delete</button>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <h2>
          no users
        </h2>
      </tr>
      </tbody>
    </table>
    <edit-modal
      v-if="showModal"
      :editableItem="selectedUser"
      @add="saveUser"
      @edit="editUserDetails"
      @close="showModal = false"
    />
  </div>
</template>

<script>
  import editModal from '@/components/EditModal'
  import { mapActions, mapState } from 'vuex'

  // TODO
  // add icons to edit and remove
  // add styles to input and button
  // add validation
  // refactor styles
  // watch, which methods I can refactor

  export default {
    components: {
      editModal
    },
    name: 'Table',
    data () {
      return {
        searchOptions: [
          'name',
          'location'
        ],
        sortingStateOptions: [
          'none',
          'up',
          'down'
        ],
        currentSearchOption: 'name',
        sortOrder: '',
        currentSortingOption: '',
        sortOption: '',
        searchValue: '',
        showModal: false,
        selectedUser: {}
      }
    },
    computed: {
      ...mapState(['users']),
      filteredUsers () {
        if (this.searchValue || this.currentSortingOption) {
          return this.users.filter((user) => {
            return (user[this.currentSearchOption].includes(this.searchValue))
          })
          .sort((a, b) => {
            return this.sortOrder === 'asc'
              ? String(a[this.currentSortingOption]).localeCompare(String(b[this.currentSortingOption]), 'en', { numeric: true, sensitivity: 'base' })
              : String(b[this.currentSortingOption]).localeCompare(String(a[this.currentSortingOption]), 'en', { numeric: true, sensitivity: 'base' })
          })
        } else {
          return this.users
        }
      },
      currencySum () {
        if (this.users.length) {
          return this.filteredUsers.reduce((sum, user) => sum + user.currency, 0)
        } else {
          return 0
        }
      }
    },
    methods: {
      ...mapActions([
        'createUser',
        'editUser',
        'deleteUser'
      ]),
      sortBy (key) {
        if (key === this.currentSortingOption) {
          this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc'
        } else {
          this.currentSortingOption = key
          this.sortOrder = 'asc'
        }
      },
      showEditUserModal (user) {
        this.showModal = true
        this.selectedUser = user
      },
      async editUserDetails (user) {
        user.currency = +user.currency || 0
        await this.editUser(user)
        this.showModal = false
      },
      async removeUser (userId) {
        this.deleteUser(userId)
      },
      showAddUserModal () {
        this.showEditUserModal()
      },
      async saveUser (user) {
        user.currency = +user.currency || 0
        await this.createUser(user)
        this.showModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }

  table {
    font-family:sans-serif;
    border-collapse: collapse;
    font-size:14px;
    margin: 20px auto;
  }

  table, th, td {
    border: 1px solid white;
  }

  table th, table td{
    padding:10px;
  }

  table th{
    color:white;
    background:black;
    font-size:18px;
  }

  table.greyscale{
    tr:nth-child(even){
      background:#d2d5d5;
    }
    tr:nth-child(odd){
      background:#e9eaea;
    }
  }

  table.colorscale{
    tr:nth-child(even){
      background:#d3d26e;
    }
    tr:nth-child(odd){
      background:#ECECC1;
    }
  }

  a {
    color: #42b983;
  }

  .add-new-user {
    margin: 20px auto 0;
    background-color: #42b983;
    color: white;
    font-size: 18px;
    width: 200px;
    height: 30px;
  }
</style>
