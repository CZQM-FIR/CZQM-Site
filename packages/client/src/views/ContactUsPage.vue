<template>
  <div class="container mt-4">
    <h3>Contact Us</h3>
    <p>
      Hey, thanks for wanting to reach out to us! Please be aware that this is
      not the real CZQM FIR but rather the
      <a href="https://vatsim.net">VATSIM</a> CZQM FIR. We do not represent any
      real world aviation organizations including NAVCANADA.
    </p>
    <div class="card mt-1">
      <div class="card-body">
        <form v-if="sent == false" @submit.prevent>
          <div class="mb-3">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="John Doe"
              required
              v-model="name"
            />
          </div>

          <div class="mb-3">
            <label for="email">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              required
              v-model="email"
            />
          </div>

          <div class="mb-3">
            <label for="category">Category</label>
            <select
              class="form-select"
              id="category"
              aria-label="Category"
              required
              v-model="staff"
            >
              <option disabled selected>Select A Category</option>
              <option
                v-for="recipient in recipients"
                :key="recipient.id"
                :value="recipient['email']"
              >
                {{ recipient.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="subject">Subject</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              required
              v-model="subject"
            />
          </div>

          <div class="mb-3">
            <label for="message">Message</label>
            <textarea
              class="form-control"
              id="message"
              required
              style="min-height: 10rem; max-height: 25rem"
              v-model="message"
            ></textarea>
          </div>

          <button class="btn btn-primary" @click="submit()">Submit</button>
        </form>
        <h3 v-else>Message Sent</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import getUser from "../scripts/getUser";

let sent = ref(false);
let name = ref("");
let email = ref("");
let staff = ref("Select A Category");
let subject = ref("");
let message = ref("");
let recipients = [
  {
    name: "Staff",
    email: "administration@czqm.ca",
  },
  {
    name: "Events",
    email: "eventsrequest@czqm.ca",
  },
  {
    name: "Training",
    email: "training@czqm.ca",
  },
  {
    name: "Website",
    email: "webmaster@czqm.ca",
  },
  {
    name: "Feedback",
    email: "feedback@czqm.ca",
  },
  {
    name: "Other",
    email: "admin@czqm.ca",
  },
];

const submit = () => {
  if (
    name.value == "" ||
    email.value == "" ||
    staff.value == "" ||
    subject.value == "" ||
    message.value == "" ||
    sent.value == true
  ) {
    return;
  }

  let data = new FormData();

  data.append("name", name.value);
  data.append("email", email.value);
  data.append("staff", staff.value);
  data.append("subject", subject.value);
  data.append("message", message.value);

  axios
    .post(`/api/contact`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      sent.value = true;
    });
};

onMounted(async () => {
  document.title = "CZQM/QX | Contact Us";

  let userData = await getUser();

  if (userData.personal) {
    name.value = userData.personal.name_full;
    email.value = userData.personal.email;
  }
});
</script>

<style lang="scss" scoped></style>
