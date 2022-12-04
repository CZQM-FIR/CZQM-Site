<template>
  <div class="container">
    <div class="text-formatting content">
      <h1 class="">Authenticating...</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router/index';

export default {
  setup: () => {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    axios
      .post(`/api/login/${code}`, {}, { withCredentials: true })
      .then((res, err) => {
        window.location.href = '/';
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: var(--view-height);
}
</style>
