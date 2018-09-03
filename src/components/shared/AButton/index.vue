<template>
  <div :class="buttonClasses">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AButton',
    props: {
      backgroundColor: {
        type: String,
        default: 'green'
      }
    },
    computed: {
      buttonClasses () {
        return [
          'button',
          `button--${this.backgroundColor}`
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button {
    color: white;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;

    &--green {
      background: #4caf50;
    }

    &--blue {
      background: #008cba;
    }

    &--red {
      background: #f44336;
    }
  }
</style>