<template>
  <div class="users">
    <p>Total sum of currency {{ currencySum }}</p>
    <div class="users__search">
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
      <a-button
        backgroundColor="blue"
        @click.native="showAddUserModal"
      >
        Add user
      </a-button>
    </div>
    <table class="users__table">
      <thead>
      <th class="users__table-heading">
        Details
      </th>
      <th
        class="users__table-heading"
        @click="sortBy('name')"
      >
        Name
      </th>
      <th
        class="users__table-heading"
        @click="sortBy('location')"
      >
        Location
      </th>
      <th
        class="users__table-heading"
        @click="sortBy('currency')"
      >
        Currency
      </th>
      <th class="users__table-heading">
        Action
      </th>
      </thead>
      <tbody v-if="filteredUsers.length">
      <tr
        v-for="user in filteredUsers"
        :key="user.id"
        class="users__table-row"
      >
        <td class="users__table-cell">
          <a-button
            backgroundColor="blue"
            @click.native="openDetailsPage(user.id)"
          >
            Open details
          </a-button>
        </td>
        <td class="users__table-cell">{{ user.name }}</td>
        <td class="users__table-cell">{{ user.location }}</td>
        <td class="users__table-cell">{{ user.currency }}</td>
        <td class="users__table-cell">
          <a-button
            backgroundColor="green"
            class="users__action-button"
            @click.native="showEditUserModal(user)"
          >
            edit
          </a-button>
          <a-button
            backgroundColor="red"
            class="users__action-button"
            @click.native="removeUser(user.id)"
          >
            delete
          </a-button>
        </td>
      </tr>
      </tbody>
      <tbody
        v-else
        class="users__table--no-items"
      >
      <p>no users</p>
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
  import AButton from '@/components/shared/AButton'
  import { mapActions, mapState } from 'vuex'

  // TODO
  // add validation
  // refactor styles
  // watch, which methods I can refactor

  export default {
    name: 'Table',
    components: {
      editModal,
      AButton
    },
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
      openDetailsPage (id) {
        this.$router.push({ path: `/table-item-details/${id}` })
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
  .users {
    &__table {
      border-collapse: collapse;
      font-size: 14px;
      margin: 20px auto;
      width: 80%;

      &--no-items {
        text-align: center;
      }
    }

    &__table-heading {
      text-align: center;
      background-color: #4CAF50;
      color: white;
      font-size: 20px;
    }

    &__table-row {
      &:nth-child(even) {
        background-color: #f2f2f2;
      }

      &:hover {
        background-color: #ddd;
      }
    }

    &__table-heading,
    &__table-cell {
      width: 20%;
      border: 1px solid #ddd;
      padding: 8px;
    }

    &__action-button {
      margin: 0 5px;
    }
  }

  a {
    color: #42b983;
  }
</style>
