<template>
  <div class="container">
    <h2 class="mt-5">{{ resource }} Resources</h2>
    <div v-if="resourceValue" v-html="pseudoToHTML(resourceValue)"></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import router from "../router";
import pseudoToHTML from "../scripts/pseudoToHTML";

const resource = router.currentRoute.value.name;
const resourceValue = ref("");

onMounted(async () => {
  document.title = `CZQM/QX | ${resource} Resources`;

  const res = await axios.get(`${import.meta.env.API_ROUTE}/api/resources?type=${resource.toLowerCase()}`);

  resourceValue.value = res.data.data.value;
});
</script>

<style lang="scss" scoped></style>
