<script setup>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
</script>

<template>
  <Suspense>
    <NavbarComponent />
  </Suspense>
  <RouterView style="min-height: calc(100vh - 120px)" />
  <FooterComponent class="mt-5" />
</template>

<style scoped></style>
