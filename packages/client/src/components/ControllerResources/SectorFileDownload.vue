<template>
  <div>
    <h2>Sector Files: Download</h2>
    <p>
      There are three different downloads linked below. The first, labeled
      <b>Sector File</b>, is a zip containing the files you need. The second,
      labeled <b>Automatic Update</b>, is a PDF that outlines how to setup
      Euroscope to automaticaly download the sector file. The third, labeled <b>Sector Provider</b>, is a text file used by Euroscope to help automaticaly download the sector files. You should not have to download this unless instructed to.
    </p>
    <div class="cta-row">
      <a :href="fileURL" class="cta">Sector File</a>
      <a href="files/docs/automatic-update.pdf" class="cta">Automatic Update</a>
      <a download href="files/VATCAN_CZQM_Sector_Provider.txt" class="cta">Sector Provider</a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup: async () => {
    let fileURL = ref('');

    fileURL = (await axios.get('api/sector')).data;

    return {
      fileURL,
    };
  },
};
</script>

<style lang="scss" scoped></style>
