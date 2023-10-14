<template>
  <div>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: 'CZQM - Moncton Gander',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    },
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    },
  ],
});
</script>
