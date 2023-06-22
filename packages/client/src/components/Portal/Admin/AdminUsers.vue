<template>
  <div class="row">
    <div class="col-6">
      <h3>Controllers</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="user in users" :key="user.id">
          <div class="row">
            <div class="col-11">
              <b>{{ user.personal.name_full }}</b> - {{ user.cid }} ({{
                user.vatsim.rating.short
              }})
            </div>
            <div class="col">
              <router-link
                class="text-body"
                :to="`/portal/admin/users/${user.cid}`"
                ><i class="bi bi-pencil-square"></i
              ></router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-6">
      <h3>Visitors</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="user in visitors" :key="user.id">
          <div class="row">
            <div class="col-11">
              <b>{{ user.personal.name_full }}</b> - {{ user.cid }} ({{
                user.vatsim.rating.short
              }})
            </div>
            <div class="col">
              <router-link
                class="text-body"
                :to="`/portal/admin/users/${user.cid}`"
                ><i class="bi bi-pencil-square"></i
              ></router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const users = ref([]);
const visitors = ref([]);

onMounted(async () => {
  users.value = await axios
    .get("/api/user", {}, { withCredentials: true })
    .then((res) => {
      return res.data.users.filter((user) => user.flags.includes("controller"));
    });

  visitors.value = await axios
    .get("/api/user", {}, { withCredentials: true })
    .then((res) => {
      return res.data.users.filter((user) => user.flags.includes("visitor"));
    });
});
</script>

<style lang="scss" scoped></style>
