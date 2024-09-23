<template>
  <div class="container">
    <h1>Logging Out...</h1>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";

onMounted(() => {
  document.title = "CZQM/QX | Logging Out...";
});

await axios.post(`${import.meta.env.VITE_API_ROUTE}/api/logout`, {}, { withCredentials: true });
window.location.href = "/";
</script>

<style lang="scss" scoped></style>
