<template>
  <div class="row">
    <div class="col-8">
      <h3>Trainer Resources</h3>
      <textarea
        v-model="input"
        style="width: 100%; min-height: 15rem"
      ></textarea>

      <br />
      <button class="btn btn-primary" v-on:click="save()">Save</button>

      <h4 class="mt-4">Preview:</h4>
      <div v-if="input" v-html="pseudoToHTML(input)"></div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import pseudoToHTML from "../../../scripts/pseudoToHTML";

const input = ref("");

const save = async () => {
  await axios.post(`${process.env.VITE_API_ROUTE}/api/resources`, null, {
    params: {
      type: "trainer",
      value: input.value,
    },
  });
};

onMounted(async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/resources?type=trainer`);
  input.value = res.data.data.value;
});
</script>

<style lang="scss" scoped></style>
