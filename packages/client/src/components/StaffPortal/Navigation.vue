<template>
  <div>
    <h1>{{ greeting }} {{ user.personal.name_first }}!</h1>
    <div class="cta-row">
      <router-link v-if="user.flags.some((flag) => ['events', 'admin'].includes(flag))" :to="{ query: { page: 'events' } }" class="cta"
        >Events</router-link
      >
      <router-link v-if="user.flags.some((flag) => ['staff'].includes(flag))" :to="{ query: { page: 'news' } }" class="cta"
        >News</router-link
      >
      <router-link v-if="user.flags.some((flag) => ['chief-instructor', 'web', 'chief', 'deputy', 'admin'].includes(flag))" :to="{ query: { page: 'users' } }" class="cta"
        >User Management</router-link
      >
      <router-link v-if="user.flags.some((flag) => ['sector', 'admin'].includes(flag))" :to="{ query: { page: 'sector-files' } }" class="cta"
        >Sector Files</router-link
      >
      <a v-if="user.flags.some((flag) => ['staff-training', 'admin'].includes(flag))" target="_blank" href="https://trello.com/b/oDjaz39q/czqm-controller-board" class="cta"
        >Trello</a
      >
    </div>
  </div>
</template>

<script>
import getUser from '../../scripts/getUser';
import { ref } from 'vue';

export default {
  setup: async () => {
    // Get user info
    let user = ref(await getUser());

    // Get current greeting
    let hour = new Date().getHours();
    let greeting = ref(
      `Good ${hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'}`
    );

    return {
      greeting,
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  align-self: center;
}

.cta-row {
  justify-content: center;
}
</style>
