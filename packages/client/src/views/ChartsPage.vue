<template>
  <div class="container mt-3">
    <h3>Charts</h3>
    <p>
      Unfortunatly CZQM is unable to provide charts for the airports within our
      FIR. All charts within our FIR can be found with a free account on
      <a target="_blank" href="https://fltplan.com">FLTPlan.com</a> or with a
      subsrciption with
      <a target="_blank" href="https://navigraph.com">Navigraph</a>.
      <a target="_blank" href="https://chartfox.org">ChartFox</a> also offers
      charts however they do not have charts for all of our airports and they do
      not support moving maps.
    </p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.title = "CZQM/QX | Charts";
});
</script>

<style lang="scss" scoped></style>
