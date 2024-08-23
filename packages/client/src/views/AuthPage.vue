<template>
  <div class="container">
    <h1>Authenticating...</h1>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import getVATSIMConnect from "../scripts/getVATSIMConnect";

let urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");
let redirect = urlParams.get("redirect");

if (!code) {
  window.location.href = getVATSIMConnect();
} else {
  axios.post(`${import.meta.env.VITE_API_ROUTE}/api/login/${code}`, {}, {}).then(() => {
    window.location.href = redirect ? redirect : "/";
  });
}

onMounted(() => {
  document.title = "CZQM/QX | Authenticating...";
});
</script>

<style lang="scss" scoped></style>
