<template>
  <form class="event-form" @submit.prevent>
    <h1 v-if="id">Edit Event</h1>
    <h1 v-else>New Event</h1>

    <div v-if="id">
      <label class="">ID</label>
      <div class="input">
        <input
          type="text"
          v-model="id"
          name="_id"
          disabled
          class="input-field"
        />
      </div>
    </div>

    <div class="input">
      <input
        type="text"
        class="input-field"
        name="name"
        v-model="name"
        required
      />
      <label class="input-label">Event Name</label>
    </div>

    <div class="input">
      <textarea
        class="input-field"
        name="description"
        required
        v-model="description"
      />
      <label class="input-label">Description</label>
    </div>

    <div class="input">
      <input
        type="datetime-local"
        class="input-field"
        name="start"
        v-model="start"
        :min="now"
        required
      />
      <label class="input-label">Start Time</label>
    </div>

    <div class="input">
      <input
        type="datetime-local"
        class="input-field"
        name="end"
        v-model="end"
        :min="start"
        required
      />
      <label class="input-label">End Time</label>
    </div>

    <div class="input">
      <div v-if="!id">
        <label>Image</label>
        <input
          type="file"
          class="input-field"
          required
          name="image"
          @change="updateImage"
        />
      </div>

      <div v-else>
        <label>Image (Only upload to replace current)</label>
        <input
          type="file"
          class="input-field"
          name="image"
          @change="updateImage"
        />
      </div>
    </div>

    {{ notice }}

    <br /><span class="disclamer">Check for errors before saving.</span>

    <div class="cta-row">
      <button class="cta" @click="saveEvent()">Save Event</button>
    </div>
    <div v-if="!id">
      <span
        >Note: Clicking the button will save the event, clicking it again will
        create a duplicate</span
      >
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import router from '../../router';
import axios from 'axios';

export default {
  data() {
    return {
      now: new Date(Date.now()).toISOString().substring(0, 16),
      notice: '',
      // name: '',
      // description: '',
      // start: '',
      // end: '',
      // image: '',
    };
  },
  setup: async () => {
    let id = ref('');
    let name = ref('');
    let description = ref('');
    let start = ref('');
    let end = ref('');
    let image = ref('');

    id.value = router.currentRoute.value.query._id;

    if (id.value) {
      let event = await axios.get(`/api/event/${id.value}`, {}, {
          withCredentials: true
        });

      if (!event) return;

      name.value = event.data.name;
      description.value = event.data.description;
      image.value = event.data.image;

      let startDate = new Date(event.data.start);
      let endDate = new Date(event.data.end);

      start.value = startDate.toISOString().substring(0, 16);
      end.value = endDate.toISOString().substring(0, 16);
    }

    return {
      id,
      name,
      description,
      start,
      end,
      image,
    };
  },
  methods: {
    saveEvent() {
      if (
        this.name == '' ||
        this.description == '' ||
        this.start == '' ||
        this.end == '' ||
        this.image == ''
      )
        return;

      let data = new FormData();
      data.append('name', `${this.name}`);
      data.append('description', this.description);
      data.append('start', `${this.start}Z`);
      data.append('end', this.end);
      data.append('image', this.image, this.image.name);

      if (this.id) {
        // If the event already exists or is new
        data.append('_id', this.id);
      }

      axios
        .post(`/api/editevent`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          this.notice = 'Event saved!';
        });
    },
    updateImage(e) {
      let files = e.target.files;
      if (!files.length) return;
      let file = files[0];

      this.image = file;
    },
  },
};
</script>

<style lang="scss" scoped>
.disclamer {
  margin: 1rem 0 0 0;
  padding: 0;
  text-align: center;
}

h1 {
  margin: 0 0 0 0;
  text-align: center;
}

textarea {
  resize: vertical;
  min-height: 1.3rem;
}

input {
  appearance: none;
  border-radius: 0;
}

.event-form {
  padding: 2rem 1rem 0;
}

.input {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  padding-top: 1.5rem;
  & + .input {
    margin-top: 1.5rem;
  }
}

.input-label {
  color: #8597a3;
  position: absolute;
  top: 1.5rem;
  transition: 0.25s ease;
}

.input-field {
  border: 0;
  z-index: 1;
  background-color: transparent;
  border-bottom: 2px solid #eee;
  font: inherit;
  font-size: 1.125rem;
  padding: 0.25rem 0;
  &:focus,
  &:valid {
    outline: 0;
    border-bottom-color: #000000;
    & + .input-label {
      color: #000000;
      transform: translateY(-1.5rem);
    }
  }
}

.cta-row {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.cta {
  border: 0;
  font-size: 1rem;
}
</style>
