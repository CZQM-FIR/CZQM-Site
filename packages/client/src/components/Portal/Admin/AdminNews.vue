<template>
  <div class="row">
    <div class="col-8">
      <h3>News Articles</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="article in news" :key="article.id">
          <div class="row">
            <div class="col-11">
              <b>{{ article.name }}</b> |
              <span class="text-muted">{{ getArticleTime(article) }}</span>
            </div>
            <div class="col">
              <router-link
                class="text-body"
                :to="`/portal/admin/news/${article._id}`"
                ><i class="bi bi-pencil-square"></i
              ></router-link>
            </div>
          </div>
        </li>
      </ul>
      <router-link to="/portal/admin/news/new" class="btn btn-primary mt-3"
        >New</router-link
      >
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const news = ref([]);

const getArticleTime = (article) => {
  const time = new Date(article.date);
  const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60000);

  const startTime = `${timeUTC
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

  return startTime;
};

onMounted(async () => {
  news.value = await axios
    .get("/api/news", {}, { withCredentials: true })
    .then((res) => {
      return res.data;
    });
});
</script>

<style lang="scss" scoped></style>
