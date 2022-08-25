<template>
  <div>
    <Suspense>
      <Navbar />
    </Suspense>
    <Suspense>
      <router-view class="main" />
    </Suspense>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import 'assets/styles/global.scss';

.main {
  margin-top: var(--nav-size);
  text-justify: auto;
  min-height: calc(
    100vh - 18rem
  ); /* 18rem is a bit of an arbitrary number. Just started at 11rem (see Footer.vue) and went up till it looked good*/
  width: auto;
}

router-view {
  z-index: 50;
  overflow: scroll;
}

Navbar {
  z-index: 100;
}

Footer {
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 99;
}
</style>
