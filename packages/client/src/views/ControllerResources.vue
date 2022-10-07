<template>
  <main class="main">
    <section class="container">
      <div class="text-formatting content">
        <div class="grid-container">
          <div class="grid-column">
            <Navigation class="grid-item" />
          </div>
          <div class="grid-column">
            <div v-if="page == 'sector'">
              <SectorFileInstructions class="grid-item" />
              <SectorFileDownload class="grid-item" />
            </div>
            <span v-else class="grid-item"
              >Select a page using the buttons to the left</span
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import router from '../router';
import Navigation from '../components/ControllerResources/Navigation.vue';
import SectorFileInstructions from '../components/ControllerResources/SectorFileInstructions.vue';
import SectorFileDownload from '../components/ControllerResources/SectorFileDownload.vue';

export default {
  computed: {
    page() {
      return router.currentRoute.value.query.page;
    },
  },
  components: {
    Navigation,
    SectorFileInstructions,
    SectorFileDownload,
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: var(--view-height);
}

.grid-container {
  display: flex;

  padding-top: 1rem;
  padding-bottom: 1rem;
}

.grid-column:first-child {
  flex: 1;
}

.grid-column:last-child {
  flex: 2;
}

.grid-column:not(:first-child) {
  margin-left: 1rem;
}

.grid-column:not(:last-child) {
  margin-left: 1rem;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1rem;
  padding: 1rem;
}

.grid-item:not(:last-child) {
  margin-bottom: 1rem;
}

.grid-item:not(:first-child) {
  margin-top: 1rem;
}

@media only screen and (max-width: 950px) {
  .grid-container {
    flex-direction: column;
  }
}
</style>
