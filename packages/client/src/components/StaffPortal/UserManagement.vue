<template>
  <div class="">
    <table class="roster">
      <thead>
        <tr>
          <th colspan="10" style="text-align: center">
            Click to increment
            <button v-on:click="copyToClipboard(emails.join(', '))">
              Copy full list of emails
            </button> <button @click="toggleGuests()"><span v-if="showGuests">Hide Guests</span><span v-else>Show Guests</span></button>
          </th>
        </tr>

        <tr class="table-header">
          <th>Name (Click to copy email)</th>
          <th>CID</th>
          <th>Raiting</th>
          <th>GND</th>
          <th>TWR</th>
          <th>APP</th>
          <th>CTR</th>
          <th>Status</th>
          <th>Role</th>
          <th>Refresh page to reset</th>
        </tr>
      </thead>
      <tbody v-if="users.length > 0">
        <tr v-for="user in users" :key="user.id">
          <td>
            <button v-on:click="copyToClipboard(user.personal.email)">
              {{ user.personal.name_full }}
            </button>
          </td>
          <td>{{ user.cid }}</td>
          <!-- <td>{{ user.vatsim.rating.short }}</td> -->
          <td>{{ user.vatsim.rating.short }}</td>

          <td>
            <button
              v-on:click="user.roster.gnd = increment(user.roster.gnd, -1, 1)"
              :style="certificationStyle(user.roster.gnd)"
            >
              GND
            </button>
          </td>
          <td>
            <button
              v-on:click="user.roster.twr = increment(user.roster.twr, -1, 1)"
              :style="certificationStyle(user.roster.twr)"
            >
              TWR
            </button>
          </td>
          <td>
            <button
              v-on:click="user.roster.app = increment(user.roster.app, -1, 1)"
              :style="certificationStyle(user.roster.app)"
            >
              APP
            </button>
          </td>
          <td>
            <button
              v-on:click="user.roster.ctr = increment(user.roster.ctr, -1, 1)"
              :style="certificationStyle(user.roster.ctr)"
            >
              CTR
            </button>
          </td>

          <td>
            <button
              v-on:click="
                user.roster.status = increment(user.roster.status, -1, 1)
              "
            >
              {{
                user.roster.status == 1
                  ? 'Active'
                  : user.roster.status == 0
                  ? 'On Leave'
                  : 'Inactive'
              }}
            </button>
          </td>
          <td>
            <button v-if="(user.role.id >= 5 && staffUser.role.id <= 7)" disabled="disabled">
              {{ roles[user.role.id] }}
            </button>
            <button v-else v-on:click="user.role.id = increment(user.role.id, 0, (staffUser.role.id < 9 ? 4 : 10))">
              {{ roles[user.role.id] }}
            </button>
          </td>
          <th><button v-on:click="saveUser(user)">Apply Changes</button></th>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="10" style="text-align: center">No controllers found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import getUser from '../../scripts/getUser';

export default {
  setup: async () => {
    let showGuests = ref(false);
    let usersUnfiltered = ref([...(await axios.get('/api/user', {}, {
          withCredentials: true
        })).data.users]);

    let usersFiltered = ref(usersUnfiltered.value.filter((user) => {return user.role.id > 0}))
    let users = ref([...usersFiltered.value])

    let roles = ref([
      'Guest',
      'Visitor',
      'Home Controller',
      'Mentor',
      'Instructor',
      'EC',
      'FE',
      'CI',
      'DC',
      'WM',
      'Chief'
    ]);

    let emails = ref([]);

    usersUnfiltered.value.forEach((user) => {
      emails.value.push(user.personal.email);
    });

    const userData = await getUser();

    let staffUser = ref(userData);

    return {
      staffUser,
      usersUnfiltered,
      roles,
      emails,
      showGuests,
      users,
      usersFiltered
    };
  },
  methods: {
    certificationStyle(status) {
      let style = '';

      switch (status) {
        case -1:
          style = 'font-weight: bold; color: #ff0000';
          break;
        case 0:
          style = 'font-weight: bold; color: #ffc000';
          break;
        case 1:
          style = 'font-weight: bold; color: #00ff00;';
          break;
        default:
          console.log('default');
          break;
      }

      return style;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(String(text));
    },
    increment(current, min, max) {
      return current + 1 > max ? min : current + 1;
    },
    saveUser(user) {
      axios.get('/api/edituser', {
        params: {
          user,
        },
      }, {
          withCredentials: true
        });
    },
    toggleGuests() {
      this.showGuests = !this.showGuests;
      if (this.showGuests) {
        this.users = this.usersUnfiltered;
      } else {
        this.users = this.usersFiltered;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.roster {
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 44rem;
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

.container {
  height: revert;
  padding-top: revert;
  justify-content: flex-start;
}
</style>
