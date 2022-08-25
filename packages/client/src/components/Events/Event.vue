<template>
  <div class="box">
    <div v-if="event.length < 1">
      <h2><i class="fa-solid fa-calendar-day"></i> Event Not Found</h2>
      <ul class="event-info-list">
        <li>There was no event found with that id.</li>
      </ul>
    </div>
    <div v-else>
      <h2><i class="fa-solid fa-calendar-day"></i> {{ event.name }}</h2>
      <ul class="event-info-list">
        <li>{{ event.description }}</li>
        <br />
        <li>
          <i>Start: {{ getEventStartTime(event) }}</i>
        </li>
        <li>
          <i>End: {{ getEventEndTime(event) }}</i>
        </li>
        <br />
        <div class="image">
          <img :src="imageURL" alt="Event Banner" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import getEvent from '../../scripts/getEvent';
import router from '../../router';

export default {
  setup: async () => {
    const _id = router.currentRoute.value.query._id;

    let event = ref(await getEvent(_id));

    return {
      event,
    };
  },
  methods: {
    getEventStartTime: (event) => {
      const start = new Date(event.start);
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      // Format the time/date in DDDDD DD/MM HHMMz format
      const startTime = `${days[start.getDay()]}, ${start
        .getDate()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${(
        start.getMonth() + 1
      ).toLocaleString('en-US', { minimumIntegerDigits: 2 })} ${start
        .getHours()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}${start
        .getMinutes()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}z`;

      return startTime;
    },
    getEventEndTime: (event) => {
      const end = new Date(event.end);
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      // Format the time/date in DDDDD DD/MM HHMMz format
      const endTime = `${days[end.getDay()]}, ${end
        .getDate()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${(
        end.getMonth() + 1
      ).toLocaleString('en-US', { minimumIntegerDigits: 2 })} ${end
        .getHours()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}${end
        .getMinutes()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}z`;

      return endTime;
    },
  },
  computed: {
    _id() {
      return router.currentRoute.value.query._id;
    },
    imageURL() {
      return `/files/${this.event.image}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.event-info-list {
  list-style: none;
  font-family: 'Arimo', sans-serif;
  padding: 0;
}

.event-info-list li:not(:last-child) {
  margin-bottom: 0.5rem;
}

.image {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
</style>
