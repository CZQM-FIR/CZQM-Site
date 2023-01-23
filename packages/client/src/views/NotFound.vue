<template>
  <div class="container">
    <div class="content text-formatting">
      <h1 class="">Page Not Found</h1>
      <h3 class="">This page could not be found.</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup: () => {
    const count = ref(5);

    return {
      count,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: var(--view-height);
}
</style>
