<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
let airports = ref([]);
const airportList = ["CYHZ", "CYQM", "CYQX", "CYYT"];

onMounted(async () => {
  airportList.forEach(async (airport) => {
    let station = (await axios.get(`/api/station/${airport}/`)).data;
    let metar = (await axios.get(`/api/metar/${airport}/`)).data;
    airports.value.push({
      icao: airport,
      name: station.name,
      metar: metar,
    });
  });
});
</script>

<template>
  <div>
    <ul class="list-group">
      <li v-if="airports.length === 0" class="list-group-item text-center">
        Loading Weather
      </li>
      <li
        v-else
        class="list-group-item"
        v-for="airport in airports"
        :key="airport.id"
      >
        <!-- <span>{{ airport.name }}</span><br /> -->
        <span class="font-monospace">{{ airport.metar }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
