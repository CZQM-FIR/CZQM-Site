<template>
  <div>
    <ul class="list-group">
      <li v-if="controllers.length === 0" class="list-group-item text-center">
        No Controllers Online
      </li>
      <li
        v-else
        class="list-group-item"
        v-for="controller in controllers"
        :key="controller.id"
      >
        <span data-bs-toggle="tooltip" :title="controller.frequency">{{
          controller.callsign
        }}</span>

        <span> - </span>

        <span
          v-if="controller.name !== controller.cid"
          data-bs-toggle="tooltip"
          :title="controller.cid"
          >{{ controller.name }}</span
        >

        <span v-else>{{ controller.cid }}</span>

        <span> ({{ controller.time }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ref } from "vue";
import axios from "axios";

onMounted(() => {
  setTimeout(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new Tooltip(tooltip);
    });
  }, 1000);
});

let controllers = ref([]);
const getOnlineControllers = async () => {
  let controllersData = await axios.get("/api/liveControllers", {
    withCredentials: false,
  });
  controllersData = controllersData.data;
  controllersData.forEach((controller) => {
    let msPerMin = 60 * 1000;
    let msPerH = msPerMin * 60;
    let elapsed = new Date(Date.now() - Date.parse(controller.logon_time));
    let elapsedMinutes = (Math.round(elapsed / msPerMin) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    let elapsedHours = Math.floor(elapsed / msPerH);
    let time = `${elapsedHours}:${elapsedMinutes}`;
    // let time = Date.parse(controller.logon_time)
    controllers.value.push({
      cid: controller.cid,
      callsign: controller.callsign,
      name: controller.name,
      time,
      rating: controller.rating,
      frequency: controller.frequency,
    });
  });
};
getOnlineControllers();
</script>

<style scoped></style>
