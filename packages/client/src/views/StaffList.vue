<template>
  <div class="container">
    <table class="content roster">
      <thead>
        <tr class="table-header">
          <th>Name</th>
          <th>Position</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffList" :key="staff.id">
          <td>{{ staff[0] }}</td>
          <td>{{ staff[1] }}</td>
          <td>{{ staff[2] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      staffList: [
        ['Mark Walsh', 'FIR Chief', 'firchief@czqm.ca'],
        ['Steve Oster', 'Cheif Instructor', 'instructor@czqm.ca'],
        ['Jagard Strong', 'Deputy Cheif', 'deputycheif@czqm.ca'],
        ['Jack Koskie', 'Events', 'events@czqm.ca'],
        ['Dustin Pasch', 'Sector Engineer', 'engineer@czqm.ca'],
        ['Jack Koskie', 'Webmaster', 'webmaster@czqm.ca'],
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.roster {
  border-collapse: collapse;
  font-size: 1rem;
  max-width: 50rem;
  height: revert;
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
  min-height: calc(100vh - var(--nav-size));
  padding-top: 5rem;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
