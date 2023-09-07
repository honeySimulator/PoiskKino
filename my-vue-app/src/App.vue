<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from './components/Footer.vue'
import Header from './components/Header.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
}
</script>

<style>
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>