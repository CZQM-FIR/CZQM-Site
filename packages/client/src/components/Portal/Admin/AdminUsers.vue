<template>
  <div class="row">
    <div class="col-6">
      <h3>Controllers</h3>
      <h6>
        Not meeting activity requirements:
        <i class="bi bi-flag-fill" style="color: orange"></i> This quarter
        <i class="bi bi-flag-fill" style="color: red"></i> Last Quarter
      </h6>
      <ul class="list-group">
        <li class="list-group-item" v-for="user in users" :key="user.id">
          <div class="row">
            <div class="col-10">
              <b>{{ user.personal.name_full }}</b> - {{ user.cid }} ({{
                user.vatsim.rating.short
              }})
            </div>
            <div class="col">
              <div style="text-align: right">
                <span v-if="inactiveThisQuarter.includes(user.cid)">
                  <i class="bi bi-flag-fill" style="color: orange"></i>
                </span>
                <span v-if="inactiveLastQuarter.includes(user.cid)">
                  <i class="bi bi-flag-fill" style="color: red"></i>
                </span>
                <router-link
                  class="text-body"
                  :to="`/portal/admin/users/${user.cid}`"
                >
                  <i class="bi bi-pencil-square"></i
                ></router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-6">
      <h3>Visitors</h3>
      <h6>
        Not meeting activity requirements:
        <i class="bi bi-flag-fill" style="color: orange"></i> This quarter
        <i class="bi bi-flag-fill" style="color: red"></i> Last Quarter
      </h6>
      <ul class="list-group">
        <li class="list-group-item" v-for="user in visitors" :key="user.id">
          <div class="row">
            <div class="col-10">
              <b>{{ user.personal.name_full }}</b> - {{ user.cid }} ({{
                user.vatsim.rating.short
              }})
            </div>
            <div class="col">
              <div style="text-align: right">
                <span v-if="inactiveThisQuarter.includes(user.cid)">
                  <i class="bi bi-flag-fill" style="color: orange"></i>
                </span>
                <span v-if="inactiveLastQuarter.includes(user.cid)">
                  <i class="bi bi-flag-fill" style="color: red"></i>
                </span>
                <router-link
                  class="text-body"
                  :to="`/portal/admin/users/${user.cid}`"
                >
                  <i class="bi bi-pencil-square"></i
                ></router-link>
              </div>
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

const inactiveThisQuarter = ref([]);
const inactiveLastQuarter = ref([]);
const sessions = ref([]);

onMounted(async () => {
  users.value = await axios
    .get(`${import.meta.env.VITE_API_ROUTE}/api/user`, {}, { withCredentials: true })
    .then((res) => {
      return res.data.users.filter((user) => user.flags.includes("controller"));
    });

  visitors.value = await axios
    .get(`${process.env.API_ROUTE}/api/user`, {}, { withCredentials: true })
    .then((res) => {
      return res.data.users.filter((user) => user.flags.includes("visitor"));
    });
  sessions.value = (await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/stats/`)).data.sessions;

  users.value.forEach(async (user) => {
    if ((await userInactive(user.cid)) == true) {
      inactiveLastQuarter.value.push(user.cid);
    }
    if ((await userInactive(user.cid, true)) == true) {
      inactiveThisQuarter.value.push(user.cid);
    }
  });
  visitors.value.forEach(async (user) => {
    if ((await userInactive(user.cid)) == true) {
      inactiveLastQuarter.value.push(user.cid);
    }
    if ((await userInactive(user.cid, true)) == true) {
      inactiveThisQuarter.value.push(user.cid);
    }
  });
});

let userInactive = async (cid, thisQuarter = false) => {
  const userSessions = sessions.value.filter((session) => session.cid == cid);
  if (!userSessions) return true;

  let quarter = 0;
  let inactive = false;
  const quarterMonths = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];
  const now = new Date();
  let quarterID = quarterMonths.findIndex((quarter) =>
    quarter.includes(now.getMonth())
  );
  if (!thisQuarter) {
    quarterID = quarterID === 0 ? 3 : quarterID - 1;
  }

  for (let i = 0; i < userSessions.length; i++) {
    const session = userSessions[i];
    if (session.duration) {
      if (!thisQuarter && quarterID == 3) {
        if (
          quarterMonths[quarterID].includes(
            new Date(Number(session.logonTime)).getMonth()
          ) &&
          new Date(Number(session.logonTime)).getFullYear() ===
            now.getFullYear() - 1
        ) {
          quarter += session.duration / 3_600_000;
        }
      } else {
        if (
          quarterMonths[quarterID].includes(
            new Date(Number(session.logonTime)).getMonth()
          ) &&
          new Date(Number(session.logonTime)).getFullYear() ===
            now.getFullYear()
        ) {
          quarter += session.duration / 3_600_000;
        }
      }
    }
  }
  if (quarter < 3) {
    inactive = true;
  }

  if (!inactive) {
    return false;
  } else {
    return true;
  }
};
</script>

<style lang="scss" scoped></style>
