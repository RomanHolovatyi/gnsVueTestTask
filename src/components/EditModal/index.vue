<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <label for="name">Name</label>
            <input
              id="name"
              class="modal-input"
              v-model="formData.name"
            />
          </div>
          <div>
            <label for="location">Location</label>
            <input
                id="location"
                class="modal-input"
                v-model="formData.location"
            />
          </div>
          <div>
            <label for="name">Currency</label>
            <input
                id="currency"
                class="modal-input"
                v-model="formData.currency"
            />
          </div>

          <div class="modal-buttons--wrapper">
            <button @click="saveUser">
              save
            </button>
            <button @click="close">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'EditModal',
    data () {
      return {
        formData: {}
      }
    },
    props: {
      editableItem: {
        type: Object
      }
    },
    computed: {
      isNewUser () {
        return !this.editableItem
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      saveUser () {
        if (this.isNewUser) {
          this.$emit('add', this.formData)
        } else {
          this.$emit('edit', this.formData)
        }
      }
    },
    mounted () {
      if (!this.isNewUser) {
        this.formData = { ...this.editableItem }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    &-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }
    &-wrapper {
      display: table-cell;
      vertical-align: middle;
    }
    &-container {
      width: 300px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
    &-header h3 {
      margin-top: 0;
      color: #42b983;
    }
    &-body {
      margin: 20px 0;
    }
    &-input {
      margin: 10px 0;
    }
    &-buttons--wrapper {
      display: flex;
      justify-content: space-around;
    }
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>