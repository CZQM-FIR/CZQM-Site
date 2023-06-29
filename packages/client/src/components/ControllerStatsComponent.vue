<template>
  <div>
    <h4 class="mt-3 mt-lg-0">Controller Statistics:</h4>
    <h5>Hours</h5>
    <div
      class="d-flex flex-row flex-wrap justify-content-arround gap-5 text-center"
    >
      <div>
        <h6>Month</h6>
        <p>{{ month.toFixed(1) }}h</p>
      </div>
      <div>
        <h6>Quarter</h6>
        <p>{{ quarter.toFixed(1) }}h</p>
      </div>
      <div>
        <h6>Year</h6>
        <p>{{ year.toFixed(1) }}h</p>
      </div>
      <div>
        <h6>Total</h6>
        <p>{{ total.toFixed(1) }}h</p>
      </div>
    </div>
    <h5>Positions</h5>
    <ul class="list-group" v-if="positions.length > 0">
      <li
        v-for="position in positions"
        :key="position.id"
        class="list-group-item"
      >
        <b>{{ position }}: </b>
        <i
          >{{ getPositionHours(position, sessions) }}h -
          {{ sessions.filter((sesh) => sesh.callsign === position).length }}
          Session{{
            sessions.filter((sesh) => sesh.callsign === position).length > 1
              ? "s"
              : ""
          }}</i
        >
      </li>
    </ul>
    <ul v-else class="list-group">
      <li class="list-group-item">
        <i>No recorded controlling sessions. Get out there and control!</i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import getSessions from "../scripts/getSessions";

const props = defineProps({
  cid: {
    required: true,
  },
});

const getPositionHours = (position, sessions) => {
  let hours = 0;
  sessions.forEach((session) => {
    if (session.callsign === position) {
      hours += session.duration / 3_600_000;
    }
  });
  return hours.toFixed(1);
};

const orderSessions = (array) => {
  const result = [];
  const positions = [];
  array.forEach((session) => {
    if (!positions.includes(session.callsign)) {
      positions.push(session.callsign);
    }
  });
  positions.forEach((position) => {
    result.push(position);
  });
  result.sort((a, b) => {
    return getPositionHours(b, array) - getPositionHours(a, array);
  });

  return result;
};

let sessions = ref([]);
let positions = ref([]);
let month = ref(0);
let quarter = ref(0);
let year = ref(0);
let total = ref(0);
const now = new Date(Date.now());

const main = async () => {
  // Make sure it has a CID before loading
  while (!props.cid) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  sessions.value = await getSessions(props.cid);
  positions.value = orderSessions(sessions.value);

  const quarterMonths = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];
  const currentQuarter = quarterMonths.findIndex((quarter) =>
    quarter.includes(now.getMonth())
  );
  for (let i = 0; i < sessions.value.length; i++) {
    const session = sessions.value[i];
    if (session.duration) {
      total.value += session.duration / 3_600_000;
      if (
        quarterMonths[currentQuarter].includes(
          new Date(Number(session.logonTime)).getMonth()
        ) &&
        new Date(Number(session.logonTime)).getFullYear() === now.getFullYear()
      ) {
        quarter.value += session.duration / 3_600_000;
      }
      if (
        now.getMonth() === new Date(Number(session.logonTime)).getMonth() &&
        now.getFullYear() === new Date(Number(session.logonTime)).getFullYear()
      ) {
        month.value += session.duration / 3_600_000;
      }
      if (
        now.getFullYear() === new Date(Number(session.logonTime)).getFullYear()
      ) {
        year.value += session.duration / 3_600_000;
      }
    }
  }
};

onMounted(async () => {
  main();
});
</script>

<style lang="scss" scoped></style>
