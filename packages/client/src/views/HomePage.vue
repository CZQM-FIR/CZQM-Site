<script setup>
import HomePageControllers from "../components/Home/HomePageControllers.vue";
import HomePageEvents from "../components/Home/HomePageEvents.vue";
import HomePageNews from "../components/Home/HomePageNews.vue";
import HomePageWeather from "../components/Home/HomePageWeather.vue";
import HomePageSolos from "../components/Home/HomePageSolos.vue";
import { onMounted } from "vue";

onMounted(() => {
  document.title = "CZQM/QX";
});
</script>

<template>
  <div>
    <section id="hero" class="text-light d-flex align-items-center">
      <div class="container">
        <h1>
          <div class="text-center text-md-start">
            Canada's Gateway to the East Coast
          </div>
          <div class="row">
            <div class="col-12 col-md-10 lead text-center text-md-start">
              Providing realistic ATC services across the maritime provinces on
              the VATSIM newtwork.
            </div>
          </div>
          <div class="mt-3 text-center text-md-start">
            <div class="fw-lighter fs-6">Image copyright Nav Canada</div>
          </div>
          <div
            class="d-flex justify-content-center justify-content-md-start mt-3"
          >
            <!-- <a href="#info" class="btn btn-outline-light">See More</a> -->
            <a href="#" class="btn btn-outline-light">Join Us</a>
          </div>
        </h1>
      </div>
    </section>
    <section
      id="info"
      class="my-5 d-flex flex-row container gap-4 align-center justify-content-center flex-wrap"
      style="scroll-padding-top: 56px"
    >
      <div class="info-card card">
        <div class="card-body">
          <h5 class="card-title">Online Controllers</h5>
          <h6 class="card-subtitle text-muted mb-2">
            All controllers currently connected in the CZQM/QX FIR
          </h6>
          <div>
            <HomePageControllers />
          </div>
        </div>
      </div>
      <div class="info-card card">
        <div class="card-body">
          <h5 class="card-title">About Us</h5>
          <p class="card-text">
            The Moncton Flight Information Region (CZQM) is a virtual
            controlling region on the VATSIM network. The Moncton FIR controls
            over 700,000sq miles of airspace.
          </p>
          <p class="card-text">
            CZQM currently has seven (7) controlled airports and three (3)
            Flight service specialist (FSS) operated aerodromes.
          </p>
          CZQM is governed by the leadership and Code of Conduct (CoC) of VATCAN
          and VATSIM. The FIR provides regulated training to those who are
          active members so they can provide realistic Air Traffic services to
          other VATSIM users.
          <p class="card-text"></p>
        </div>
      </div>
      <div class="info-card card">
        <div class="card-body">
          <h5 class="card-title">Weather</h5>
          <h6 class="card-subtitle text-muted mb-2">
            METAR Reports for our major airports
          </h6>
          <div>
            <HomePageWeather />
          </div>
        </div>
      </div>
      <div class="info-card card">
        <div class="card-body">
          <h5 class="card-title">News</h5>
          <div>
            <HomePageNews />
          </div>
        </div>
      </div>
      <div class="info-card card">
        <div class="card-body">
          <h5 class="card-title">Solo Controllers</h5>
          <h6 class="card-subtitle text-muted mb-2">
            Student who can control without supervision
          </h6>
          <div>
            <HomePageSolos />
          </div>
        </div>
      </div>
      <div class="info-card card">
        <div class="card-body">
          <h5 class="card-title">Events</h5>
          <div>
            <HomePageEvents />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.section {
  padding: 60px 0;
}

#hero {
  min-height: calc(100vh - 56px);
  background: linear-gradient(rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0.473)),
    url("../assets/images/hero-bg.jpg") no-repeat center / cover;
}

.info-card {
  width: 20rem;
}
</style>
