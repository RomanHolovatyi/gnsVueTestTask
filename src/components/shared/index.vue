<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AButton',
    props: {
      color: {
        type: String,
        default: 'green'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>