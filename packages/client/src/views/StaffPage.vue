<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="container">
    <div>
      <h2 class="mt-5">Staff</h2>
      <hr />
      <div v-for="user in staffList" class="mb-4" :key="user.id">
        <h4>{{ user.personal.name_full }}</h4>
        <h5 class="text-muted">{{ getRoleName(user.flags, "staff") }}</h5>
        <p v-if="user.bio" style="max-width: 60rem">{{ user.bio }}</p>
        <p v-else>This user has no bio :(</p>
      </div>
    </div>
    <div>
      <h2 class="mt-5">Training Team</h2>
      <hr />
      <div class="d-flex flex-wrap gap-5" style="max-width: 60rem">
        <div v-for="user in instructorList" class="mb-4" :key="user.id">
          <h5>{{ user.personal.name_full }}</h5>
          <h6 class="text-muted">
            {{ getRoleName(user.flags, "instructor") }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import getRoleName from "../scripts/getRoleName";
const staffList = ref([]);
const instructorList = ref([]);

onMounted(async () => {
  document.title = `CZQM/QX | Staff`;

  const users = (await axios.get(`/api/user`)).data.users;

  const staffPositions = [
    "chief",
    "deputy",
    "chief-instructor",
    "web",
    "events",
    "sector",
  ];

  const instructorPositions = ["chief-instructor", "instructor", "mentor"];

  // Get all staff in order of seniority
  for (const position of staffPositions) {
    const user = users.find((user) => user.flags.includes(position));
    if (!user || staffList.value.includes(user)) continue;
    staffList.value.push(user);
  }

  // Get all instructors in order of seniority
  for (const position of instructorPositions) {
    const user = users.filter((user) => user.flags.includes(position));
    if (user.length === 0) continue;
    for (const instructor of user) {
      if (instructorList.value.includes(instructor)) continue;
      instructorList.value.push(instructor);
    }
  }
});
</script>

<style lang="scss" scoped></style>
