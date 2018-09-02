<template>
  <div class="user-wrapper">
    <h1>Single user page</h1>
    <p v-for="(value, key) of userDetails" :key="key">
      <b>{{key}}</b> : {{value}}
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'user',
    data () {
      return {
        userDetails: {}
      }
    },
    computed: {
      ...mapGetters(['getUserById'])
    },
    mounted () {
      this.userDetails = this.getUserById(this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    &-wrapper {
      max-width: 400px;
      margin: 0 auto;
      p {
        text-align: left;
      }
    }
  }
</style>
