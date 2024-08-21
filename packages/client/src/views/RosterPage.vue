<template>
  <div class="container mt-4">
    <h5>Legend</h5>
    <p>
      <span :style="certificationStyle(-2)">In Training</span>
      <span class="ms-2" :style="certificationStyle(0)">Solo</span>
      <span class="ms-2" :style="certificationStyle(1)">Certified</span>
    </p>
    <h3>Controller Roster</h3>
    <table class="table table-striped table-hover mt-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>CID</th>
          <th>Rating</th>
          <th class="text-center">GND</th>
          <th class="text-center">TWR</th>
          <th class="text-center">APP</th>
          <th class="text-center">CTR</th>
          <th>Status</th>
          <th>FIR Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <router-link
              :to="`/controller/${user.cid}`"
              class="text-black text-underline-hover"
              >{{ user.name }}</router-link
            >
          </td>
          <td>
            <router-link
              :to="`/controller/${user.cid}`"
              class="text-black text-underline-hover"
              >{{ user.cid }}</router-link
            >
          </td>
          <td>{{ user.rating }}</td>
          <td :style="certificationStyle(user.roster.gnd)">
            <span v-if="user.roster.gnd === -1">---</span
            ><span v-else>GND</span>
          </td>
          <td :style="certificationStyle(user.roster.twr)">
            <span v-if="user.roster.twr === -1">---</span
            ><span v-else>TWR</span>
          </td>
          <td :style="certificationStyle(user.roster.app)">
            <span v-if="user.roster.app === -1">---</span
            ><span v-else>APP</span>
          </td>
          <td :style="certificationStyle(user.roster.ctr)">
            <span v-if="user.roster.ctr === -1">---</span
            ><span v-else>CTR</span>
          </td>
          <td>
            <i
              v-if="user.flags.some((flag) => flag === 'inactive')"
              class="bi bi-x-circle-fill ms-3 text-danger"
              data-bs-toggle="tooltip"
              :title="`Inactive`"
            ></i>
            <i
              v-else-if="user.flags.some((flag) => flag === 'leave')"
              class="bi bi-dash-circle-fill ms-3 text-warning"
              data-bs-toggle="tooltip"
              :title="`On Leave`"
            ></i>
            <i
              v-else
              class="bi bi-check-circle-fill ms-3 text-success"
              data-bs-toggle="tooltip"
              :title="`Active`"
            ></i>
          </td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>

    <h3>Visitor Roster</h3>
    <table class="table table-striped table-hover mt-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>CID</th>
          <th>Rating</th>
          <th class="text-center">GND</th>
          <th class="text-center">TWR</th>
          <th class="text-center">APP</th>
          <th class="text-center">CTR</th>
          <th>Status</th>
          <th>FIR Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in visitors" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.cid }}</td>
          <td>{{ user.rating }}</td>
          <td :style="certificationStyle(user.roster.gnd)">
            <span v-if="user.roster.gnd === -1">---</span
            ><span v-else>GND</span>
          </td>
          <td :style="certificationStyle(user.roster.twr)">
            <span v-if="user.roster.twr === -1">---</span
            ><span v-else>TWR</span>
          </td>
          <td :style="certificationStyle(user.roster.app)">
            <span v-if="user.roster.app === -1">---</span
            ><span v-else>APP</span>
          </td>
          <td :style="certificationStyle(user.roster.ctr)">
            <span v-if="user.roster.ctr === -1">---</span
            ><span v-else>CTR</span>
          </td>
          <td>
            <i
              v-if="user.flags.some((flag) => flag === 'inactive')"
              class="bi bi-x-circle-fill ms-3 text-danger"
              data-bs-toggle="tooltip"
              :title="`Inactive`"
            ></i>
            <i
              v-else-if="user.flags.some((flag) => flag === 'leave')"
              class="bi bi-dash-circle-fill ms-3 text-warning"
              data-bs-toggle="tooltip"
              :title="`On Leave`"
            ></i>
            <i
              v-else
              class="bi bi-check-circle-fill ms-3 text-success"
              data-bs-toggle="tooltip"
              :title="`Active`"
            ></i>
          </td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min.js";

let users = ref([]);
let visitors = ref([]);

onMounted(async () => {
  document.title = "CZQM/QX | Roster";
  users.value.push(
    ...(await axios.get(`${process.env.API_ROUTE}/api/roster/`)).data.filter((user) =>
      user.flags.includes("controller")
    )
  );
  visitors.value.push(
    ...(await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/roster/`)).data.filter((user) =>
      user.flags.includes("visitor")
    )
  );

  users.value.filter((user) => user.flags.includes("visitor"));
  visitors.value;

  setTimeout(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new Tooltip(tooltip);
    });
  }, 1000);
});

const certificationStyle = (status) => {
  let style = "";

  switch (status) {
    case -2:
      style =
        "font-weight: bold; background-color: #FF6961; text-align: center; ";
      break;
    case -1:
      style =
        "font-weight: bold; background-color: #CCCCC4; text-align: center; ";
      break;
    case 0:
      style =
        "font-weight: bold; background-color: #F8F1AE; text-align: center; ";
      break;
    case 1:
      style =
        "font-weight: bold; background-color: #BEE5B0; text-align: center;  ";
      break;
  }

  return style;
};
</script>

<style lang="scss" scoped></style>
