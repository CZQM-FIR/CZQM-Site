<template>
<Navbar/>
    <router-view class="main dynamicHeight"/>
    <Footer/>
</template>

<script>
  import Navbar from './components/navbar/Navbar.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    }
  }
</script>

<style>
@import 'assets/styles/global.css';

.main {
  padding-top: 1rem;
  margin: 3rem;
  margin-top: var(--nav-size);
  text-align: center;
  text-justify: auto;
}
</style>