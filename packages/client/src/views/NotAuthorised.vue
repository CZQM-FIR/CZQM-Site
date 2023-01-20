<template>
  <div class="container">
    <div class="content text-formatting">
      <h1 class="">Not Authorised</h1>
      <h3 class="">You are not authorised to view this page</h3>
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
