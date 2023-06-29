<script setup>
import { onMounted, ref } from "vue";
import getNews from "../../scripts/getNews";

let articles = ref([]);

onMounted(async () => {
  document.title = "CZQM/QX | News";
  articles.value.push(...(await getNews()));
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
    <div class="mt-3">
      <h3 class="">News Articles</h3>
      <ul class="list-group">
        <li v-if="articles.length === 0" class="list-group-item">
          Unable to load news articles
        </li>
        <router-link
          :to="{ path: `/news/${article._id}` }"
          class="list-group-item list-group-item-action"
          v-else
          v-for="article in articles"
          :key="article.id"
        >
          {{ article.name }}
          <span class="text-muted">{{ getTime(article) }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
