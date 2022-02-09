<template>
<div class="app">
    <Navbar/>
    <router-view class="main"/>
</div>
</template>

<script>
  import Navbar from './components/navbar/Navbar.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style>
.app {
  padding: 0;
  margin: 0;
}

.main {
  padding-top: 1rem;
  margin: 3rem;
  margin-top: 5rem;
  text-align: justify;
  text-justify: auto;
}
</style>