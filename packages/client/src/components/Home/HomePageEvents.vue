<script setup>
import { onMounted, ref } from "vue";
import getEvent from "../../scripts/getEvent";

let events = ref([]);
onMounted(async () => {
  events.value.push(...(await getEvent()).slice(0, 5));
});

const getTime = (event) => {
  const time = new Date(Number(event.start));
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
      <li v-if="events.length === 0" class="list-group-item">
        No Events Scheduled
      </li>
      <li
        v-else
        v-for="event in events.slice(0, 5)"
        :key="event"
        class="list-group item"
      >
        <div class="row">
          <router-link
            class="text-decoration-none text-reset text-truncate col-8"
            :to="{ path: `/events/${event._id}` }"
            >{{ event.name }}</router-link
          >
          <span class="text-muted col text-end">{{ getTime(event) }}</span>
        </div>
      </li>
    </ul>
    <router-link to="/events" class="btn btn-primary mt-2"
      >See More</router-link
    >
  </div>
</template>

<style scoped></style>
