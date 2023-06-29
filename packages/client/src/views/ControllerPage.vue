<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg">
        <h4>Controller Info:</h4>
        <ul style="list-style: none" class="">
          <li>
            <b>CID:</b> <i>{{ user.cid }}</i>
          </li>
          <li>
            <b>Full Name:</b> <i>{{ user.personal.name_full }}</i>
          </li>
          <li>
            <b>Vatsim Rating: </b>
            <i
              >{{ user.vatsim.rating.long }} ({{ user.vatsim.rating.short }})</i
            >
          </li>
          <li>
            <b>Pilot Rating: </b>
            <i
              >{{ user.vatsim.pilotrating.long }} ({{
                user.vatsim.pilotrating.short
              }})</i
            >
          </li>
          <li>
            <b>FIR Status: </b><i>{{ roleName }}</i>
          </li>
        </ul>
        <h5>Bio:</h5>
        <p v-if="user.bio">{{ user.bio }}</p>
        <p v-else>This user has no bio :(</p>
      </div>
      <div class="col">
        <StatsComponent :cid="user.cid" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import getRoleName from "../scripts/getRoleName";
import getUser from "../scripts/getUser";
import StatsComponent from "../components/ControllerStatsComponent.vue";
import router from "../router";

const cid = router.currentRoute.value.params.cid;

let user = ref({
  cid: "",
  personal: {
    name_first: "",
    name_last: "",
    name_full: "",
    email: "",
  },
  vatsim: {
    rating: {
      short: "",
      long: "",
    },
    pilotrating: {
      short: "",
      long: "",
    },
  },
  flags: [],
  bio: "",
});
let roleName = ref("");

onMounted(async () => {
  document.title = "CZQM/QX | Controller Info";
  user.value = await getUser(cid);
  roleName.value = getRoleName(user.value.flags);
});
</script>

<style lang="scss" scoped></style>
