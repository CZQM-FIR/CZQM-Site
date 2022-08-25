<template>
  <div>
    <section>
      <div>
        <h2 v-if="sectorFile == 0">Moncton/Gander Domestic</h2>
        <h2 v-else-if="sectorFile == 1">VATCAN CZQM Sector Provider File</h2>
        <h2 v-else-if="sectorFile == 2">Automated Moncton/Gander Domestic</h2>
      </div>

      <input
        type="file"
        class="input-field"
        required
        name="image"
        @change="updateFile"
      />
      <br />
      <button class="submit" v-on:click="saveSectorFile()">Submit</button>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: ['sectorFile'],
  setup: async () => {
    let file = ref('');

    return {
      file,
    };
  },
  methods: {
    updateFile(e) {
      let files = e.target.files;
      if (!files.length) return;
      let file = files[0];

      this.file = file;
    },
    saveSectorFile() {
      if (this.file == '') return;

      let data = new FormData();
      data.append('file', this.file, this.file.name);
      data.append('fileID', this.sectorFile);

      axios
        .post(`/api/sector`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          console.log('saved');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label {
  padding-right: 1rem;
}

.submit {
  margin-top: 1rem;
}
</style>
