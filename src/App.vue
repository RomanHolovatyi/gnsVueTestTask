<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .fade {
    &-enter-active,
    &-leave-active {
      transition: all .35s;
    }
    &-enter,
    &-leave-to {
      position: absolute;
      transform: translateY(30px);
      opacity: 0;
    }
  }
</style>
