<template>
  <div class="box">
    <div v-if="article.length < 1">
      <h2><i class="fa-solid fa-newspaper"></i> Event Not Found</h2>
      <ul class="article-info-list">
        <li>There was no article found with that id.</li>
      </ul>
    </div>
    <div v-else>
      <h2><i class="fa-solid fa-newspaper"></i> {{ article.name }}</h2>
      <ul class="article-info-list">
        <li>
          <i>Date: {{ getTime(article) }}</i>
        </li>
        <br />
        <li>{{ article.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import getNews from '../../scripts/getNews';
import router from '../../router';

export default {
  setup: async () => {
    const _id = router.currentRoute.value.query._id;

    let article = ref(await getNews(_id));

    return {
      article,
    };
  },
  methods: {
    getTime: (article) => {
      const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
          month: 'long',
        });
      };

      const time = new Date(article.date);

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      // Format the time/date in DD/MM HHMMz format
      const timeString = `${days[time.getDay()]}, ${time
        .getDate()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })} ${toMonthName(
        time.getMonth() + 1
      )} ${time
        .getHours()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}${time
        .getMinutes()
        .toLocaleString('en-US', { minimumIntegerDigits: 2 })}z`;

      return timeString;
    },
    computed: () => {
      return {
        _id: router.currentRoute.value.query._id,
        imageURL: `/files/${this.event.image}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.article-info-list {
  list-style: none;
  font-family: 'Arimo', sans-serif;
  padding: 0;
}

.article-info-list li:not(:last-child) {
  margin-bottom: 0.5rem;
}

.image {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
</style>
