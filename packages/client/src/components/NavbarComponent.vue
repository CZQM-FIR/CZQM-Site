<script setup>
import getUser from "../scripts/getUser";
import { ref } from "vue";
import getVATSIMConnect from "../scripts/getVATSIMConnect";

let user = ref({
  flags: [],
  loggedIn: false,
  personal: {
    name_full: "",
  },
});

user.value = await getUser();
</script>

<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-md sticky-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img
          src="../assets/images/CZQM-White.png"
          alt="CZQM Logo"
          class="logo"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/events" class="nav-link">Events</router-link>
          <router-link to="/news" class="nav-link">News</router-link>
          <div class="nav-item dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              id="controllersDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Controllers</a
            >
            <ul class="dropdown-menu" aria-labelledby="controllersDropdown">
              <li>
                <router-link to="/staff" class="dropdown-item"
                  >Staff</router-link
                >
              </li>
              <li>
                <router-link to="/roster" class="dropdown-item"
                  >Roster</router-link
                >
              </li>
              <li>
                <router-link
                  v-if="
                    !user.loggedIn ||
                    !user.flags.some(
                      (flag) => flag === 'controller' || flag === 'visitor'
                    ) ||
                    user.flags.some(
                      (flag) => flag === 'staff' || flag === 'admin'
                    )
                  "
                  to="/join"
                  class="dropdown-item"
                  >Join Us</router-link
                >
              </li>
              <li>
                <a
                  v-if="
                    user.loggedIn &&
                    user.flags.some(
                      (flag) => flag === 'controller' || flag === 'visitor'
                    )
                  "
                  href="/controller-resources"
                  class="dropdown-item"
                  >Resources</a
                >
              </li>
              <li>
                <a
                  v-if="
                    user.loggedIn &&
                    user.flags.some(
                      (flag) => flag === 'controller' || flag === 'visitor'
                    )
                  "
                  href="/cbt"
                  class="dropdown-item"
                  >CBT</a
                >
              </li>
            </ul>
          </div>
          <div class="nav-item dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              id="pilotsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Pilots</a
            >
            <ul class="dropdown-menu" aria-labelledby="pilotsDropdown">
              <li>
                <a href="/pilot-resources" class="dropdown-item">Resources</a>
              </li>
              <li>
                <router-link to="/charts" class="dropdown-item">Charts</router-link>
              </li>
            </ul>
          </div>
          <!-- <router-link to="/" class="nav-link">Pilots</router-link> -->
          <router-link to="/contact" class="nav-link">Contact Us</router-link>
        </div>
        <div class="d-flex navbar-nav ms-auto">
          <div v-if="user.loggedIn">
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >{{ user.personal.name_full }}</a
              >
              <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li>
                  <router-link to="/portal" class="dropdown-item"
                    >Portal</router-link
                  >
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <router-link to="/logout" class="dropdown-item"
                    ><i class="bi bi-box-arrow-right"></i> Logout</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <a :href="getVATSIMConnect()" class="btn btn-outline-light"
              >Login</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  padding: 0;
}

.logo {
  height: 40px;
}
</style>
