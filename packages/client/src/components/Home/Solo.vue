<template>
  <div>
    <table class="roster">
      <thead class="table-header">
        <tr>
          <th>Name</th>
          <th>CID</th>
          <th>Rating</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.cid }}</td>
          <td>{{ user.rating }}</td>
          <td>{{ findSoloPos(user.roster) }}</td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="4" style="text-align: center">No Solo Certifications</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup: async () => {
    let users = ref([]);

    let userList = (await axios.get('/api/roster')).data;

    userList.forEach((user) => {
      let push = false;

      if (user.roster.ctr === 0) {
        push = true;
        users.value.push(user);
      } else if (user.roster.app === 0) {
        push = true;
        users.value.push(user);
      } else if (user.roster.twr === 0) {
        push = true;
        users.value.push(user);
      } else if (user.roster.gnd === 0) {
        push = true;
        users.value.push(user);
      }

      if (push === true) {
      }
    });

    return {
      users,
    };
  },
  methods: {
    findSoloPos: (roster) => {
      if (roster.ctr === 0) return 'CTR';
      if (roster.app === 0) return 'APP';
      if (roster.twr === 0) return 'TWR';
      if (roster.gnd === 0) return 'GND';
    },
  },
};
</script>

<style lang="scss" scoped>
.roster {
  border-collapse: collapse;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
}

.roster thead tr {
  background-color: var(--nav-colour);
  color: white;
  text-align: left;
  font-weight: bold;
}

.roster th,
.roster td {
  padding: 0.75rem 0.95rem;
}

.roster tbody tr {
  border-bottom: 1px solid #dddddd;
}

.roster tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.roster tbody tr:last-of-type {
  border-bottom: 2px solid var(--nav-colour);
}
</style>
