<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal__row">
            <label
              class="modal__row-label"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="modal__row-input"
              v-model="formData.name"
              @blur="$v.formData.name.$touch"
            />
            <span class="modal__error-message" v-if="isFieldInvalid('name')">Required field</span>
          </div>
          <div class="modal__row">
            <label for="location">Location</label>
            <input
              id="location"
              class="modal__row-input"
              v-model="formData.location"
              @blur="$v.formData.location.$touch"
            />
            <span class="modal__error-message" v-if="isFieldInvalid('location')">Required field</span>
          </div>
          <div class="modal__row">
            <label for="name">Currency</label>
            <input
              id="currency"
              class="modal__row-input"
              v-model="formData.currency"
              @blur="$v.formData.currency.$touch"
            />
            <span class="modal__error-message" v-if="isFieldInvalid('currency')">Required field</span>
          </div>

          <div class="modal-buttons--wrapper">
            <a-button
              backgroundColor="red"
              @click.native="close"
            >
              Cancel
            </a-button>
            <a-button
                backgroundColor="green"
                @click.native="saveUser"
            >
              Save
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import AButton from '@/components/shared/AButton'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'EditModal',
    data () {
      return {
        formData: {}
      }
    },
    components: {
      AButton
    },
    props: {
      editableItem: {
        type: Object
      }
    },
    validations: {
      formData: {
        name: {
          required
        },
        location: {
          required
        },
        currency: {
          required
        }
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
        this.$v.$touch()
        if (this.$v.$invalid) return
        if (this.isNewUser) {
          this.$emit('add', this.formData)
        } else {
          this.$emit('edit', this.formData)
        }
      },
      isFieldInvalid (field) {
        return this.$v.formData[field].$dirty && this.$v.formData[field].$invalid
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

    &-buttons--wrapper {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
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

  .modal {
    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    &__row-input {
      margin: 10px 0;
    }

    &__error-message {
      color: red;
      font-size: 12px;
      bottom: -5px;
      right: 0;
      position: absolute;
    }
  }
</style>