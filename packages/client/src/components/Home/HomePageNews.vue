<script setup>
import { onMounted, ref } from "vue";
import getNews from "../../scripts/getNews";

let news = ref([]);

onMounted(async () => {
  news.value.push(...(await getNews()).slice(0, 5));
});

const getTime = (article) => {
  const time = new Date(Number(article.date));
  const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60000);

  // Format the time/date in DD/MM HHMMz format
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[timeUTC.getMonth()]}. ${timeUTC.getDate()}`;
};
</script>

<template>
  <div>
    <ul class="list-group">
      <li v-if="news.length === 0" class="list-group-item">
        No Articles Posted
      </li>
      <li v-else v-for="article in news" :key="article" class="list-group item">
        <div class="row">
          <router-link
            class="text-decoration-none text-reset text-truncate col-8"
            :to="{ path: `/news/${article._id}` }"
            >{{ article.name }}</router-link
          >
          <span class="text-muted col text-end">{{ getTime(article) }}</span>
        </div>
      </li>
    </ul>
    <router-link to="/news" class="btn btn-primary mt-2">See More</router-link>
  </div>
</template>

<style scoped></style>
