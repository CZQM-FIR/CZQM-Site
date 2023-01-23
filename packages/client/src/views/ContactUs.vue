<template>
  <div>
    <h1 class="text-formatting title">Contact Us</h1>
    <div class="container">
      <form
        v-if="sent == false"
        class="content text-formatting"
        @submit.prevent
      >
        <div class="form-content">
          <div class="form-item">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" v-model="name" required />
          </div>
          <div class="form-item">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-item">
            <label for="staff">Category:</label>
            <select name="staff" id="staff" v-model="staff" required>
              <option
                v-for="recipient in recipients"
                :key="recipient.id"
                :value="recipient['email']"
              >
                {{ recipient['name'] }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label for="subject">Subject:</label>
            <input
              type="text"
              name="subject"
              id="subject"
              v-model="subject"
              required
            />
          </div>
          <div class="form-item">
            <label for="message">Message:</label>
            <textarea
              name="message"
              id="message"
              v-model="message"
              required
            ></textarea>
          </div>
          <div class="form-item">
            <button class="cta" @click="submit()">Submit</button>
          </div>
        </div>
      </form>
      <h3 v-else class="content text-formatting message-sent">Message Sent!</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  setup: () => {},
  data: () => {
    return {
      recipients: [
        {
          name: 'Staff',
          email: 'admin@czqm.ca'
        },
        {
          name: 'Events',
          email: 'eventsrequest@czqm.ca'
        },
        {
          name: 'Training',
          email: 'training@czqm.ca'
        },
        {
          name: 'Feedback',
          email: 'feedback@czqm.ca'
        },
        {
          name: 'Other',
          email: 'admin@czqm.ca'
        }
      ],
      name: '',
      email: '',
      staff: '',
      subject: '',
      message: '',
      sent: false,
    };
  },
  methods: {
    submit() {
      let { name, email, staff: recipient, subject, message } = this;

      if (
        this.name == '' ||
        this.email == '' ||
        this.staff == '' ||
        this.subject == '' ||
        this.message == '' ||
        this.sent == true
      )
        return;

      let data = new FormData();

      data.append('name', name);
      data.append('email', email);
      data.append('staff', recipient);
      data.append('subject', subject);
      data.append('message', message);

      axios
        .post(`/api/contact`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          this.sent = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.cta {
  border: none;
  font: inherit;
  cursor: pointer;
  width: 10rem;
  margin: 0 auto 0 auto;
}

.form-content {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1rem;
  padding: 1rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.text-formatting {
  font-size: 1.25rem;
}

.content {
  max-width: 30rem;
}
.title {
  text-align: center;
  font-size: 3rem;
  margin: 5rem 0 2rem 0;
}

.message-sent {
  text-align: center;
  font-size: 1.75rem;
}

.form-content .form-item:not(:first-child) {
  margin-top: 1.5rem;
}
</style>
