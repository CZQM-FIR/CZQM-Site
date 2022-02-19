<template>
<Navbar/>
    <router-view class="main"/>
    <Footer/>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    }
  }
</script>

<style lang="scss">
@import 'assets/styles/global.scss';

.main {
  /* padding-top: 1rem;
  margin: 3rem; */
  margin-top: var(--nav-size);
  text-align: center;
  text-justify: auto;
  min-height: calc(100vh - 18rem); /* 18rem is a bit of an arbitrary number. Just started at 11rem (see Footer.vue) and went up till it looked good*/
  width: auto;
}
</style>