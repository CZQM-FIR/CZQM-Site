<script setup>
import { onMounted, ref } from "vue";
import getEvent from "../../scripts/getEvent";
import router from "../../router";
import { marked } from "marked";

let event = ref({});
const parsedDescription = ref("");

onMounted(async () => {
  const id = router.currentRoute.value.params.id;
  event.value = await getEvent(true, id);
  parsedDescription.value = marked.parse(event.value.description);

  document.title = `CZQM/QX | ${event.value.name}`;
});

const getTime = (event) => {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const startUTC = new Date(
    start.getTime() + start.getTimezoneOffset() * 60000
  );
  const endUTC = new Date(end.getTime() + end.getTimezoneOffset() * 60000);

  // Format the time/date in DD/MM HHMMz format
  const startTime = `${startUTC
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, timeZone: "UTC" })}/${(
    startUTC.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    timeZone: "UTC",
  })} ${startUTC.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    timeZone: "UTC",
  })}${startUTC
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, timeZone: "UTC" })}z`;
  const endTime = `${endUTC
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, timeZone: "UTC" })}/${(
    endUTC.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    timeZone: "UTC",
  })} ${endUTC.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    timeZone: "UTC",
  })}${endUTC
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, timeZone: "UTC" })}z`;

  return startTime + " - " + endTime;
};
</script>

<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <h3 class="card-title">
          {{ event.name }}
        </h3>
        <div class="card-text">
          <span class="text-muted">{{ getTime(event) }}</span>
          <div v-html="parsedDescription"></div>
        </div>
      </div>
      <img
        :src="`https://api.czqm.ca/files/${event.image}`"
        :alt="`${event.name} Banner`"
        class="card-image-bottom"
      />
    </div>
  </div>
</template>

<style scoped></style>
