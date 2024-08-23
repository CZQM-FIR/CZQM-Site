<template>
  <div class="row">
    <div class="col-8">
      <h3>Events</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="event in events" :key="event.id">
          <div class="row">
            <div class="col-11">
              <b>{{ event.name }}</b> |
              <span class="text-muted">{{ getEventTime(event) }}</span>
            </div>
            <div class="col">
              <router-link
                class="text-body"
                :to="`/portal/admin/events/${event._id}`"
                ><i class="bi bi-pencil-square"></i
              ></router-link>
            </div>
          </div>
        </li>
      </ul>
      <router-link to="/portal/admin/events/new" class="btn btn-primary mt-3"
        >New</router-link
      >
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const events = ref([]);

const getEventTime = (event) => {
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

onMounted(async () => {
  events.value = await axios
    .get(`${import.meta.env.API_ROUTE}/api/event`, {}, { withCredentials: true })
    .then((res) => {
      return res.data;
    });
});
</script>

<style lang="scss" scoped></style>
