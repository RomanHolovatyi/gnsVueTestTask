<template>
  <div class="user">
    <h1>User Details</h1>
    <p
      v-for="(value, key) of userDetails"
      :key="key"
      class="user__row"
    >
      <span class="user__key">{{key}}</span>: {{value}}
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

    &__key {
      font-weight: 800;
      text-transform: uppercase;
    }

    &__row {
      text-align: left;
      font-size: 18px;
    }
  }
</style>
