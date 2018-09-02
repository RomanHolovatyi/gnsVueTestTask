<template>
  <div class="table">
    <p>Total sum of currency {{currencySum}}</p>
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
    <!--<div>-->
      <!--Sort by-->
      <!--<select v-model="currentSortingOption">-->
        <!--<option-->
            <!--v-for="(option, index) in searchOptions"-->
            <!--:value="option"-->
            <!--:key="`sorting-option-${index}`"-->
        <!--&gt;-->
          <!--{{option}}-->
        <!--</option>-->
      <!--</select>-->
      <!--&lt;!&ndash;<select v-model="currentSortingState">&ndash;&gt;-->
        <!--&lt;!&ndash;<option&ndash;&gt;-->
            <!--&lt;!&ndash;v-for="(option, index) in sortingStateOptions"&ndash;&gt;-->
            <!--&lt;!&ndash;:value="option"&ndash;&gt;-->
            <!--&lt;!&ndash;:key="`sorting-state-${index}`"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;{{option}}&ndash;&gt;-->
        <!--&lt;!&ndash;</option>&ndash;&gt;-->
      <!--&lt;!&ndash;</select>&ndash;&gt;-->
    <!--</div>-->
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
        <!--<select @change="changeSortOption('name', $event)">-->
          <!--<option value="none">-->
            <!--none-->
          <!--</option>-->
          <!--<option value="up">-->
            <!--up-->
          <!--</option>-->
          <!--<option value="down">-->
            <!--down-->
          <!--</option>-->
        <!--</select>-->
      </th>
      <th>location
        <!--<select @change="changeSortOption('location', $event)">-->
          <!--<option value="none">-->
            <!--none-->
          <!--</option>-->
          <!--<option value="up">-->
            <!--up-->
          <!--</option>-->
          <!--<option value="down">-->
            <!--down-->
          <!--</option>-->
        <!--</select>-->
      </th>
      <th>
        currency
        <!--<select @change="changeSortOption('currency', $event)">-->
          <!--<option value="none">-->
            <!--none-->
          <!--</option>-->
          <!--<option value="up">-->
            <!--up-->
          <!--</option>-->
          <!--<option value="down">-->
            <!--down-->
          <!--</option>-->
        <!--</select>-->
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
        <td>{{user.name}}</td>
        <td>{{user.location}}</td>
        <td>{{user.currency}}</td>
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
      :user="selectedUser"
      :addUser="addUser"
      @add="saveUser"
      @edit="editUser"
      @close="showModal = false"
    />
  </div>
</template>

<script>
  import editModal from '@/components/EditModal'
  import { mapActions, mapState } from 'vuex'

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
        currentSortingState: '',
        sortOption: '',
        searchValue: '',
        showModal: false,
        selectedUser: {},
        addUser: false
      }
    },
    computed: {
      ...mapState(['users']),
      filteredUsers () {
        if (this.searchValue || this.currentSortingState) {
          return this.users.filter((user) => {
            return (user[this.currentSearchOption].includes(this.searchValue))
          })
          .sort((a, b) => {
            return this.sortOrder === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          })
        } else {
          return this.users
        }
      },
      currencySum () {
        if (this.users.length) {
          return this.users.reduce((sum, user) => sum + user.currency, 0)
        } else {
          return 0
        }
      }
    },
    methods: {
      ...mapActions(['updateUser', 'getUsers', 'deleteUser', 'createUser']),
      sortBy (key) {
        if (key === this.currentSortingState) {
          this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc'
        } else {
          this.currentSortingState = key
          this.sortOrder = 'asc'
        }
      },
      showEditUserModal (user) {
        this.showModal = true
        this.selectedUser = user
      },
      async editUser (user) {
        user.currency = +user.currency || 0
        await this.updateUser(user)
        this.showModal = false
      },
      async removeUser (userId) {
        this.deleteUser(userId)
      },
      showAddUserModal () {
        this.addUser = true
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
