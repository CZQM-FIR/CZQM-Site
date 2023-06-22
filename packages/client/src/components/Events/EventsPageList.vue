<script setup>
import { onMounted, ref } from "vue";
import getEvent from "../../scripts/getEvent";

let events = ref([]);

onMounted(async () => {
  document.title = "CZQM/QX | Events";

  events.value.push(...(await getEvent()));
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
    <div class="mt-3">
      <h3 class="">Scheduled Events</h3>
      <ul class="list-group">
        <li v-if="events.length === 0" class="list-group-item">
          No Events Scheduled
        </li>
        <router-link
          :to="{ path: `/events/${event._id}` }"
          class="list-group-item list-group-item-action"
          v-else
          v-for="event in events"
          :key="event.id"
        >
          {{ event.name }}
          <span class="text-muted">{{ getTime(event) }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
