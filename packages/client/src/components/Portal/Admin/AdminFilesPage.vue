<template>
  <div class="row">
    <div class="col-8">
      <h3>File Upload</h3>
      <form @submit.prevent>
        <p>
          Use the box below to upload files to the server. The force name box
          will force the system to overwrite any existing files with the same
          name. If left unchecked, the system will append a timestamp to keep
          the file names unique. Files will be accessible at
          https://czqm.ca/files/[filename].
        </p>

        <p>
          If you require access to the servers files directly, contact the
          webmaster re: FTP access.
        </p>

        <div class="mb-3">
          <label for="image">Upload</label>
          <input
            type="file"
            class="form-control"
            id="image"
            required
            @change="updateUpload"
          />
        </div>

        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="forceName"
            v-model="forceName"
          />
          <label class="form-check-label" for="forceName">Force Name</label>
        </div>

        <button class="btn btn-primary" @click="submit()">Submit</button>

        {{ status }}
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import getUser from "../../../scripts/getUser";

const name = ref("");
const upload = ref("");
const user = ref({});
const status = ref("");
const forceName = ref(false);

onMounted(async () => {
  user.value = await getUser();
});

const updateUpload = (e) => {
  let files = e.target.files;
  if (!files.length) return;
  let file = files[0];

  upload.value = file;
};

const submit = () => {
  let data = new FormData();
  data.append("name", `${name.value}`);
  data.append("forceName", forceName.value);
  console.log(upload.value);

  if (upload.value.name) {
    data.append("file", upload.value, upload.value.name);
  }

  axios
    .post(`/api/fileupload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        status.value = `Success! https://czqm.ca/files/${res.data.data}`;
      } else {
        status.value = "Error Uploading File";
      }
    });
};
</script>

<style lang="scss" scoped></style>
