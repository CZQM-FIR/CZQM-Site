<script setup>
import { onMounted, ref } from "vue";
import getNews from "../../scripts/getNews";
import router from "../../router";
import { marked } from "marked";

let article = ref({});
const parsedText = ref("");

onMounted(async () => {
  const id = router.currentRoute.value.params.id;
  article.value = await getNews(id);
  parsedText.value = marked.parse(article.value.text);

  document.title = `CZQM/QX | ${article.value.name}`;
});

const getTime = (article) => {
  const time = new Date(article.date);
  const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60000);

  // Format the time/date in DD/MM HHMMz format
  const timeString = `${timeUTC
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, timeZone: "UTC" })}/${(
    timeUTC.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    timeZone: "UTC",
  })} ${timeUTC.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    timeZone: "UTC",
  })}${timeUTC
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, timeZone: "UTC" })}z`;

  return timeString;
};
</script>

<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <h3 class="card-title">
          {{ article.name }}
        </h3>
        <div class="card-text">
          <span class="text-muted">{{ getTime(article) }}</span>
          <div v-html="parsedText"></div>
        </div>
      </div>
      <img
        v-if="article.image"
        :src="`https://api.czqm.ca/files/${article.image}`"
        :alt="`${article.name} Banner`"
        class="card-image-bottom"
      />
    </div>
  </div>
</template>

<style scoped></style>
