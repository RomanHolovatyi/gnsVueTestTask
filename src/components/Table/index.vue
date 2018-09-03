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
          {{ option }}
        </option>
      </select>
      <input v-model="searchValue"/>
    </div>
    <div>
      <a-button
        backgroundColor="blue"
        class="users__add-user-button"
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
        class="users__table-heading users__table-heading--can-sorts"
        @click="sortBy('name')"
      >
        <div>
          Name
          <span v-if="isAsc('name')">&#x25BC;</span>
          <span v-if="isDesc('name')">&#x25B2;</span>
        </div>
      </th>
      <th
        class="users__table-heading users__table-heading--can-sorts"
        @click="sortBy('location')"
      >
        <div>
          Location
          <span v-if="isAsc('location')">&#x25BC;</span>
          <span v-if="isDesc('location')">&#x25B2;</span>
        </div>
      </th>
      <th
        class="users__table-heading users__table-heading--can-sorts"
        @click="sortBy('currency')"
      >
        <div>
          Currency
          <span v-if="isAsc('currency')">&#x25BC;</span>
          <span v-if="isDesc('currency')">&#x25B2;</span>
        </div>
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
            Edit
          </a-button>
          <a-button
            backgroundColor="red"
            class="users__action-button"
            @click.native="removeUser(user.id)"
          >
            Delete
          </a-button>
        </td>
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
  import AButton from '@/components/shared/AButton'
  import { mapActions, mapState } from 'vuex'

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
        sortOrder: 'asc',
        currentSortingOption: 'name',
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
        return this.filteredUsers.length
          ? this.filteredUsers.reduce((sum, user) => sum + user.currency, 0)
          : 0
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
      isAsc (field) {
        return this.currentSortingOption === field && this.sortOrder === 'asc'
      },
      isDesc (field) {
        return this.currentSortingOption === field && this.sortOrder === 'desc'
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
      removeUser (userId) {
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

    &__add-user-button {
      margin-top: 15px;
    }

    &__table-heading {
      text-align: center;
      background-color: #4CAF50;
      color: white;
      font-size: 20px;

      &--can-sorts {
        cursor: pointer;
      }
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
</style>
