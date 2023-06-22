<template>
  <h5>Controller Info:</h5>
  <ul style="list-style: none">
    <li>
      <b>CID:</b> <i>{{ user.cid }}</i>
    </li>
    <li>
      <b>Full Name:</b> <i>{{ user.personal.name_full }}</i>
    </li>
    <li>
      <b>Email:</b> <i>{{ user.personal.email }}</i>
    </li>
    <li>
      <b>Vatsim Rating: </b>
      <i>{{ user.vatsim.rating.long }} ({{ user.vatsim.rating.short }})</i>
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
  <p>{{ user.bio ? user.bio.length : "0" }}/750</p>
  <textarea
    name="bio"
    id="bio"
    style="
      width: 100%;
      max-width: 25rem;
      height: 15rem;
      max-height: 20rem;
      font-size: 12pt;
    "
    v-model="user.bio"
    maxlength="750"
  ></textarea
  ><br />
  <button
    :class="`btn ${bioStatus === 1 ? 'btn-success' : 'btn-primary'}`"
    @click="saveBio()"
  >
    Save
  </button>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import getRoleName from "../../scripts/getRoleName";
import getUser from "../../scripts/getUser";
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
let bioStatus = ref(0);

const saveBio = async () => {
  await axios.get(`/api/edituser?user=${JSON.stringify(user.value)}`);
  bioStatus.value = 1;
};

onMounted(async () => {
  user.value = await getUser();
  roleName.value = await getRoleName(user.value.flags);
});
</script>

<style lang="scss" scoped></style>
