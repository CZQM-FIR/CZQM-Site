<template>
<Suspense>
  <Navbar/>
</Suspense>
<Suspense>
<router-view class="main"/>
</Suspense>
<Footer/>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'

  // Font Awesome
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer,
      "font-awesome-icon": FontAwesomeIcon,
    }
  }
</script>

<style lang="scss">
@import 'assets/styles/global.scss';

.main {
  margin-top: var(--nav-size);
  text-justify: auto;
  min-height: calc(100vh - 18rem); /* 18rem is a bit of an arbitrary number. Just started at 11rem (see Footer.vue) and went up till it looked good*/
  width: auto;
}
</style>