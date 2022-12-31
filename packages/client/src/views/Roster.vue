<template>
  <div class="container">
    <table class="roster">
      <thead>
        <p class="key">
          Key: <span :style="certificationStyle(-1)">Not Authorised</span> | <span :style="certificationStyle(-2)">Under Supervision</span> | <span
            :style="certificationStyle(0)">Solo</span> | <span :style="certificationStyle(1)">Certified</span>
        </p>

        <tr class="table-header">
          <th>Name</th>
          <th>CID</th>
          <th>Rating</th>
          <th>GND</th>
          <th>TWR</th>
          <th>APP</th>
          <th>CTR</th>
          <th>Status</th>
          <th>FIR Role</th>
        </tr>
      </thead>
      <tbody v-if="controllers.length > 0">
        <tr v-for="controller in controllers" :key="controller.id">
          <td>{{ controller.name }}</td>
          <td>{{ controller.cid }}</td>
          <td>{{ controller.rating }}</td>

          <td :style="certificationStyle(controller.roster.gnd)"><span v-if="controller.roster.gnd === -1">---</span><span
              v-else>GND</span></td>
          <td :style="certificationStyle(controller.roster.twr)"><span v-if="controller.roster.twr === -1">---</span><span
              v-else>TWR</span></td>
          <td :style="certificationStyle(controller.roster.app)"><span v-if="controller.roster.app === -1">---</span><span
              v-else>APP</span></td>
          <td :style="certificationStyle(controller.roster.ctr)"><span v-if="controller.roster.ctr === -1">---</span><span
              v-else>CTR</span></td>

          <td>
            {{
                controller.flags.some((flag) => flag === 'inactive') ? 'Inactive' : (controller.flags.some((flag) => flag === 'leave') ? 'On Leave' : 'Active')
            }}
          </td>
          <td>{{ controller.role }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="9" style="text-align: center">No controllers found</td>
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
    let controllers = ref([]);

    await axios.get('/api/roster').then((response) => {
      controllers.value = response.data;
    });

    return {
      controllers,
    };
  },
  methods: {
    certificationStyle(status) {
      let style = '';

      switch (status) {
        case -2:
          style = 'font-weight: bold; background-color: #FF6961;';
          break;
        case -1:
          style = 'font-weight: bold; background-color: #CCCCC4; text-align: center';
          break;
        case 0:
          style = 'font-weight: bold; background-color: #F8F1AE';
          break;
        case 1:
          style = 'font-weight: bold; background-color: #BEE5B0; ';
          break; 
        
      }

      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: var(--view-height);
  padding-top: 5rem;
  justify-content: flex-start;
}

.roster {
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 44rem;
  font-family: 'Raleway', sans-serif;
}

.roster thead tr {
  background-color: var(--nav-colour);
  color: rgb(255, 255, 255);
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
  background-color: #ffffff;
}

.roster tbody tr:last-of-type {
  border-bottom: 2px solid var(--nav-colour);
}

.container {
  flex-direction: column;
}
</style>
