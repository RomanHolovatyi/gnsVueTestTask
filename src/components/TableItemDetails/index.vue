<template>
  <div class="user">
    <h1>User Details</h1>
    <p v-for="(value, key) of userDetails" :key="key">
      <strong>{{key}}</strong>: {{value}}
    </p>
    <a-button
      backgroundColor="red"
      @click.native="redirectToHome"
    >
      Back
    </a-button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AButton from '@/components/shared/AButton'

  export default {
    name: 'user',
    components: {
      AButton
    },
    data () {
      return {
        userDetails: {}
      }
    },
    computed: {
      ...mapGetters(['getUserById'])
    },
    methods: {
      redirectToHome () {
        this.$router.push({ path: '/' })
      }
    },
    mounted () {
      this.userDetails = this.getUserById(this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    max-width: 400px;
    margin: 0 auto;

    p {
      text-align: left;
    }
  }
</style>
