<template>
  <div class="navbar-wrapper container" :class="{ active: showMobileMenu }">
    <nav class="navbar">
      <ul class="navitems">
        <!-- CZQM Logo Element -->
        <li class="czqm-logo">
          <router-link to="/">
            <img
              src="../assets/images/CZQM-White.png"
              alt="CZQM Logo"
              class="logo"
            />
          </router-link>
          <div
            class="hamburger"
            :class="{ active: showMobileMenu }"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"> </span>
          </div>
        </li>

        <!-- Nav Elements -->

        <li class="navitem" @click="showMobileMenu = false">
          <router-link to="/">
            <span class="navitem-text">Home</span>
          </router-link>
        </li>

        <li class="navitem" @click="showMobileMenu = false">
          <router-link to="/events">
            <span class="navitem-text">Events</span>
          </router-link>
        </li>

        <li class="navitem">
          <div class="dropdown">
            <span
              class="navitem-text"
              v-on:click="showDropdownControllers = !showDropdownControllers"
              >Controllers</span
            >
            <ul
              :class="{
                'dropdown-content': true,
                'dropdown-hover': showDropdownControllers && showMobileMenu,
              }"
            >
              <li class="dropdown-text">
                <div class="dropdown-icon">
                  <i class="fa-solid fa-clipboard-user"></i>
                </div>
                <router-link to="/staff" @click="showMobileMenu = false">
                  Staff
                </router-link>
              </li>
              <li class="dropdown-text">
                <div class="dropdown-icon">
                  <i class="fa-solid fa-rectangle-list"></i>
                </div>
                <router-link to="/roster" @click="showMobileMenu = false">
                  Roster
                </router-link>
              </li>
              <div
                v-if="
                  user.loggedIn == false ||
                  user.flags.some(
                    (flag) => flag === 'guest' || flag === 'staff'
                  )
                "
              >
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-user-plus"></i>
                  </div>
                  <router-link to="/join" @click="showMobileMenu = false">
                    Join Us
                  </router-link>
                </li>
              </div>
              <div
                v-if="
                  user.loggedIn && !user.flags.some((flag) => flag === 'guest')
                "
              >
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-file-lines"></i>
                  </div>
                  <router-link to="/resources" @click="showMobileMenu = false"
                    >Resources</router-link
                  >
                </li>
              </div>
            </ul>
          </div>
        </li>

        <li class="navitem" @click="showMobileMenu = false">
          <router-link to="/contact">
            <span class="navitem-text">Contact Us</span>
          </router-link>
        </li>

        <li class="navitem" @click="showMobileMenu = false">
          <a href="https://forums.vatcan.ca/forum/176-monctongander-czqm/">
            <span class="navitem-text">Forums</span>
          </a>
        </li>

        <li class="navitem login">
          <div v-if="user.loggedIn">
            <div
              class="dropdown"
              v-on:click="showDropdownLogin = !showDropdownLogin"
            >
              <span class="navitem-text"
                >{{ user.personal.name_full }} (<span class="navitem-number">{{
                  user.cid
                }}</span
                >)</span
              >

              <ul
                :class="{
                  'dropdown-content': true,
                  'dropdown-hover': showDropdownLogin && showMobileMenu,
                }"
              >
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-cloud"></i>
                  </div>
                  <router-link to="/portal" @click="showMobileMenu = false"
                    >Portal</router-link
                  >
                </li>
                <li
                  class="dropdown-text"
                  v-if="
                    user.loggedIn &&
                    user.flags.some((flag) => flag.startsWith('staff'))
                  "
                >
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-bars-progress"></i>
                  </div>
                  <router-link
                    to="/staff-portal"
                    @click="showMobileMenu = false"
                    >Staff Portal</router-link
                  >
                </li>
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  </div>
                  <router-link to="/logout" @click="showMobileMenu = false"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <a :href="connectEndpoint" @click="showMobileMenu = false">
              <span class="navitem-text">Login</span>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import getUser from '../scripts/getUser';

export default {
  name: 'Navbar',
  computed: {
    connectEndpoint() {
      return `https://auth.vatsim.net/oauth/authorize?client_id=1191&redirect_uri=https://czqm.ca/auth&response_type=code&scope=full_name+email+vatsim_details+country`;
    },
  },
  setup: async () => {
    const userData = await getUser();

    let user = ref(userData);

    console.log(user.value);

    return {
      user,
    };
  },
  data: () => {
    return {
      showMobileMenu: false,
      showDropdownControllers: false,
      showDropdownLogin: false,
    };
  },
};
</script>

<style scoped></style>
