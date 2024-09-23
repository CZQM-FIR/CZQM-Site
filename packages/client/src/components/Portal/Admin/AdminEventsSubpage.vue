<template>
  <h3 v-if="eventID === 'new'">Create Event</h3>
  <h3 v-else>Edit Event</h3>
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
      <label for="start">Start</label>
      <input
        type="datetime-local"
        class="form-control"
        id="start"
        required
        :min="now"
        v-model="start"
      />
    </div>

    <div class="mb-3">
      <label for="end">End</label>
      <input
        type="datetime-local"
        class="form-control"
        id="end"
        :min="start"
        required
        v-model="end"
      />
    </div>

    <div class="mb-3">
      <label for="image">Image</label>
      <input
        v-if="eventID !== ''"
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
      <label for="description">Description</label>
      <textarea
        class="form-control"
        id="description"
        required
        style="min-height: 10rem; max-height: 25rem"
        v-model="description"
      ></textarea>
    </div>

    <div class="mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        v-model="deleteEvent"
      />
      <label class="form-check-label ms-1" for="flexCheckDefault">
        Delete Event
      </label>
    </div>

    <button class="btn btn-primary" @click="submit()">Submit</button>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import router from "../../../router";

const eventID = ref(router.currentRoute.value.params.id);

const name = ref("");
const start = ref("");
const end = ref("");
const image = ref("");
const description = ref("");
const deleteEvent = ref(false);
const now = new Date(Date.now()).toISOString().substring(0, 16);

onMounted(async () => {
  if (eventID.value === "new") return;

  let event = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/event/${eventID.value}`,
    {},
    {
      withCredentials: true,
    }
  );

  if (!event) return;

  name.value = event.data.name;
  description.value = event.data.description;
  image.value = event.data.image;

  let startDate = new Date(event.data.start);
  let endDate = new Date(event.data.end);

  start.value = startDate.toISOString().substring(0, 16);
  end.value = endDate.toISOString().substring(0, 16);
});

const updateImage = (e) => {
  let files = e.target.files;
  if (!files.length) return;
  let file = files[0];

  image.value = file;
};

const submit = () => {
  if (deleteEvent.value) {
    axios.delete(`${import.meta.env.VITE_API_ROUTE}/api/event/${eventID.value}`).then(() => {
      router.push("/portal/admin/events");
    });
    return;
  }

  if (!name.value || !start.value || !end.value || !description.value) return;

  let data = new FormData();
  data.append("name", `${name.value}`);
  data.append("description", description.value);
  data.append("start", `${start.value}Z`);
  data.append("end", end.value);

  if (image.value.name) {
    data.append("image", image.value, image.value.name);
  }

  if (eventID.value && eventID.value !== "new") {
    data.append("_id", eventID.value);
  }

  axios
    .post(`${import.meta.env.VITE_API_ROUTE}/api/editevent`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      router.push("/portal/admin/events");
    });
};
</script>

<style lang="scss" scoped></style>
