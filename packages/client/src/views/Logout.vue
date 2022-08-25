<template>
  <div class="container">
    <div class="text-formatting content">
      <h1 class="">Logging out...</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  setup: async () => {
    await axios.post('/api/logout', { withCredentials: true });
    window.location.href = '/';
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - var(--nav-size));
}
</style>
