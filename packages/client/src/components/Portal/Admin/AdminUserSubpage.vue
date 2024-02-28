<template>
  <div>
    <h3>Edit User</h3>
    <div class="row">
      <div class="col-6">
        <ul class="list-unstyled">
          <li>Name: {{ user.personal.name_full }}</li>
          <li>CID: {{ user.cid }}</li>
          <!-- <li>Email: {{ user.personal.email }}</li> -->
          <li>Email: <i>Temporarily Not Available</i></li>
        </ul>

        <h5>Flags:</h5>
        <ul>
          <li v-for="flag in user.flags" :key="flag.id">
            {{ flag }}
          </li>
        </ul>
        <div>
          <input
            list="flags"
            name="flag"
            id="flag"
            v-model="flag"
            style="max-width: 7rem"
          />
          <datalist id="flags">
            <option v-for="flag in flagList" :key="flag.id" :value="flag">
              {{ flag }}
            </option>
          </datalist>
          <button
            class="btn btn-outline-dark ms-2"
            @click="submitFlag(flag, user, flagList)"
          >
            Submit
          </button>
        </div>
      </div>
      <div class="col">
        <StatsComponent :cid="routeCID" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import router from "../../../router";
import StatsComponent from "../../ControllerStatsComponent.vue";

const routeCID = ref(router.currentRoute.value.params.cid);

const user = ref({
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
  bio: "",
  flags: [],
});

const flag = ref("");

let flagList = ref([
  "staff",
  "staff-instructing",
  "instructor",
  "mentor",
  "chief",
  "deputy",
  "chief-instructor",
  "web",
  "events",
  "sector",
  "roster-gnd-sup",
  "roster-twr-sup",
  "roster-app-sup",
  "roster-ctr-sup",
  "roster-twr-solo",
  "roster-app-solo",
  "roster-ctr-solo",
  "roster-gnd-cert",
  "roster-twr-cert",
  "roster-app-cert",
  "roster-ctr-cert",
  "fss",
  "controller",
  "visitor",
  "no-email",
  "inactive",
  "leave",
  "delete",
]);

const submitFlag = async (flag, user, flagList) => {
  if (!flag) return;
  if (!flagList.includes(flag)) return;
  await axios.get(
    `/api/edituser/`,
    {
      params: {
        user: JSON.stringify(user),
        flag,
      },
    },
    {
      withCredentials: true,
    }
  );
  window.location.reload();
};

onMounted(async () => {
  user.value = await axios.get(
    `/api/user/`,
    {},
    {
      withCredentials: true,
    }
  );
  user.value = user.value.data.users.filter(
    (user) => user.cid === routeCID.value
  )[0];
});
</script>

<style lang="scss" scoped></style>
