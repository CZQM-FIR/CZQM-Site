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
              the VATSIM network.
            </div>
          </div>
          <div class="mt-3 text-center text-md-start">
            <div class="fw-lighter fs-6">Image copyright Nav Canada</div>
          </div>
          <div
            class="d-flex justify-content-center justify-content-md-start mt-3"
          >
            <router-link to="/join" class="btn btn-outline-light"
              >Join Us</router-link
            >
          </div>
        </h1>
      </div>
    </section>
    <section id="top-controllers" class="bg-primary py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-12">
            <h2 class="text-light">Top Controllers This Month</h2>
            <ul class="list-group mt-2">
              <li v-if="users.length < 1" class="list-group-item">
                <span><i>No controlling data yet this month!</i></span>
              </li>

              <li
                class="list-group-item"
                v-else
                v-for="user in users"
                :key="user.id"
              >
                <router-link
                  :to="`/controller/${user.cid}`"
                  class="text-black text-underline-hover"
                  ><b>{{ user.name }}</b> ({{ user.cid }})</router-link
                >
                -
                <i>{{ user.duration.toFixed(1) }} hours</i>
              </li>
            </ul>
          </div>
          <div class="col">
            <h2 class="text-light">Come Join Our Ranks!</h2>
            <p class="text-light">
              The Moncton / Gander FIR is a great place to call home as a
              controller. From amazing
              <router-link class="text-light" to="/events">events</router-link>
              to a great community, we have it all! Checkout our
              <router-link class="text-light" to="/join">join us</router-link>
              page to learn more about how you can get started controlling or
              visiting in our airspace.
            </p>
          </div>
        </div>
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

<script setup>
import HomePageControllers from "../components/Home/HomePageControllers.vue";
import HomePageEvents from "../components/Home/HomePageEvents.vue";
import HomePageNews from "../components/Home/HomePageNews.vue";
import HomePageWeather from "../components/Home/HomePageWeather.vue";
import HomePageSolos from "../components/Home/HomePageSolos.vue";
import { onMounted, ref } from "vue";
import getSessions from "../scripts/getSessions";
import getUser from "../scripts/getUser";

let sessions = ref([]);
let users = ref([]);
let usersTemp = ref([]);

onMounted(async () => {
  document.title = "CZQM/QX";
  sessions.value = await getSessions();

  for await (const session of sessions.value) {
    if (
      new Date(Number(session.logonTime)).getMonth() !==
      new Date(Date.now()).getMonth() ||
      new Date(Number(session.logonTime)).getFullYear() !==
      new Date(Date.now()).getFullYear()
    ) {
      continue;
    }

    if (usersTemp.value.some((user) => user.cid === session.cid)) {
      usersTemp.value.find((user) => user.cid === session.cid).duration +=
        session.duration / 3_600_000;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 25));
      usersTemp.value.push({
        cid: session.cid,
        duration: session.duration / 3_600_000,
      });
    }
  }

  usersTemp.value.sort((a, b) => b.duration - a.duration);
  usersTemp.value.splice(5);
  for await (const user of usersTemp.value) {
    if (user.name) continue;
    const userData = await getUser(user.cid);
    user.name = userData.personal.name_full;
  }
  users.value = usersTemp.value;
});
</script>

<style scoped>
.section {
  padding: 60px 0;
}

#hero {
  min-height: calc(100vh - 56px);
  background: linear-gradient(rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0.473)),
    url("../assets/images/hero-bg.jpg") no-repeat center / cover;
}

#top-controllers {
  background: linear-gradient(rgba(0, 0, 0, 0.273), rgba(0, 0, 0, 0.273));
}

.info-card {
  width: 20rem;
}
</style>
