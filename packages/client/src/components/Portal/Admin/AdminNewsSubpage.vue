<template>
  <h3 v-if="articleID === 'new'">Create Article</h3>
  <h3 v-else>Edit Article</h3>
  <form @submit.prevent>
    <div class="mb-3">
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        required
        v-model="name"
      />
    </div>

    <div class="mb-3">
      <label for="image">Image</label>
      <input
        v-if="articleID !== ''"
        type="file"
        class="form-control"
        id="image"
        @change="updateImage"
      />
      <input
        v-else
        type="file"
        class="form-control"
        id="image"
        required
        @change="updateImage"
      />
    </div>

    <div class="mb-3">
      <label for="text">Text</label>
      <textarea
        class="form-control"
        id="text"
        required
        style="min-height: 10rem; max-height: 25rem"
        v-model="text"
      ></textarea>
    </div>

    <div class="mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        v-model="deleteArticle"
      />
      <label class="form-check-label ms-1" for="flexCheckDefault">
        Delete Article
      </label>
    </div>

    <button class="btn btn-primary" @click="submit()">Submit</button>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import router from "../../../router";

const articleID = ref(router.currentRoute.value.params.id);

const name = ref("");
const image = ref("");
const text = ref("");
const date = ref("");
const deleteArticle = ref(false);

onMounted(async () => {
  if (articleID.value === "new") return;

  let event = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/news/${articleID.value}`,
    {},
    {
      withCredentials: true,
    }
  );

  if (!event) return;

  name.value = event.data.name;
  text.value = event.data.text;
  image.value = event.data.image;
  date.value = event.data.date;
});

const updateImage = (e) => {
  let files = e.target.files;
  if (!files.length) return;
  let file = files[0];

  image.value = file;
};

const submit = () => {
  if (deleteArticle.value) {
    axios.delete(`${import.meta.env.VITE_API_ROUTE}/api/news/${articleID.value}`).then(() => {
      router.push("/portal/admin/news");
    });
    return;
  }

  if (!name.value || !text.value) return;

  const now = new Date(Date.now()).toISOString().substring(0, 16);

  let data = new FormData();
  data.append("name", `${name.value}`);
  data.append("text", text.value);
  data.append("date", date.value || now);

  if (image.value?.name) {
    data.append("image", image.value, image.value.name);
  }

  if (articleID.value && articleID.value !== "new") {
    data.append("_id", articleID.value);
  }

  axios
    .post(`${process.env.API_ROUTE}/api/editnews`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      router.push("/portal/admin/news");
    });
};
</script>

<style lang="scss" scoped></style>
