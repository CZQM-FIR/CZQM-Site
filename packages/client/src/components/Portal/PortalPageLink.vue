<template>
  <router-link
    :to="to"
    :class="`list-group-item list-group-action ${active ? 'active' : ''} ${
      disabled ? 'text-secondary' : ''
    }`"
  >
    <i :class="icon"></i> {{ name }}
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
