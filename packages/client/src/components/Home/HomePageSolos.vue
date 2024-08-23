<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min.js";

onMounted(() => {
  setTimeout(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new Tooltip(tooltip);
    });
  }, 1000);
});

let users = ref([]);

const findSoloPos = (roster) => {
  if (roster.ctr === 0) return "CTR";
  if (roster.app === 0) return "APP";
  if (roster.twr === 0) return "TWR";
  if (roster.gnd === 0) return "GND";
};

onMounted(async () => {
  let userList = (await axios.get(`${process.env.VITE_API_ROUTE}/api/roster/`)).data;

  userList.forEach((user) => {
    if (user.roster.ctr === 0) {
      users.value.push(user);
    } else if (user.roster.app === 0) {
      users.value.push(user);
    } else if (user.roster.twr === 0) {
      users.value.push(user);
    } else if (user.roster.gnd === 0) {
      users.value.push(user);
    }
  });
});
</script>

<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col8">Name</th>
          <th scope="col4">Position</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <th scope="row" colspan="2">No Solo Certifications</th>
        </tr>
        <tr v-else v-for="user in users" :key="user.id">
          <td scope="row">
            <router-link
              :to="`/controller/${user.cid}`"
              class="text-black text-underline-hover"
              >{{ user.name }}</router-link
            >
          </td>
          <td>{{ findSoloPos(user.roster) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
