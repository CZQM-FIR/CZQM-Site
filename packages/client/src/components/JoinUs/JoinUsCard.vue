<template>
  <section class="card text-formatting">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <p v-for="paragraph in text" :key="paragraph.id">
      {{ paragraph }}
    </p>
    <div v-if="button" class="cta-row">
      <a :href="button.link" class="cta">{{ button.text }}</a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: { required: true, type: String },
    text: { required: true, type: Array },
    button: {
      required: false,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
