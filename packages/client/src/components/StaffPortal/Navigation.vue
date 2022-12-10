<template>
  <div>
    <h1>{{ greeting }} {{ user.personal.name_first }}!</h1>
    <div class="cta-row">
      <router-link v-if="(user.role.id === 5) || (user.role.id >= 8)" :to="{ query: { page: 'events' } }" class="cta"
        >Events</router-link
      >
      <router-link :to="{ query: { page: 'news' } }" class="cta"
        >News</router-link
      >
      <router-link v-if="(user.role.id === 7) || (user.role.id >= 8)" :to="{ query: { page: 'users' } }" class="cta"
        >User Management</router-link
      >
      <router-link v-if="(user.role.id === 6) || (user.role.id >= 8)" :to="{ query: { page: 'sector-files' } }" class="cta"
        >Sector Files</router-link
      >
      <a v-if="user.role.id >= 3" href="https://trello.com/invite/b/oDjaz39q/ATTIdf015a6319284dcd8225adf08e82f6639C637235/czqm-controller-board" class="cta"
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
