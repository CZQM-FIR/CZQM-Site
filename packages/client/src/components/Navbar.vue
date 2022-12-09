<template>
  <div class="navbar-wrapper container" :class="{ active: showMobileMenu }" >
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
          <div class="hamburger" :class="{ active: showMobileMenu }" @click="showMobileMenu = !showMobileMenu">
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
            <span class="navitem-text">Controllers</span>
            <ul class="dropdown-content">
              <li class="dropdown-text">
                <div class="dropdown-icon">
                  <i class="fa-solid fa-clipboard-user"></i>
                </div>
                <router-link to="/staff" @click="showMobileMenu = false"> Staff </router-link>
              </li>
              <li class="dropdown-text">
                <div class="dropdown-icon">
                  <i class="fa-solid fa-rectangle-list"></i>
                </div>
                <router-link to="/roster" @click="showMobileMenu = false"> Roster </router-link>
              </li>
              <div v-if="user.loggedIn == false || user.role.id < 1 || user.role.id >= 5">
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-user-plus"></i>
                  </div>
                  <router-link to="/join" @click="showMobileMenu = false"> Join Us </router-link>
                </li>
              </div>
              <div v-if="user.loggedIn && user.role.id >= 1">
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-file-lines"></i>
                  </div>
                  <router-link to="/resources" @click="showMobileMenu = false">Resources</router-link>
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

        <!-- Login MUST BE LAST!!! -->

        <li class="navitem login">
          <div v-if="user.loggedIn">
            <div class="dropdown">
              <span class="navitem-text"
                >{{ user.personal.name_full }} (<span class="navitem-number">{{
                  user.cid
                }}</span
                >)</span
              >

              <ul class="dropdown-content">
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-cloud"></i>
                  </div>
                  <router-link to="/portal" @click="showMobileMenu = false">Portal</router-link>
                </li>
                <li
                  class="dropdown-text"
                  v-if="user.loggedIn && user.role.id >= 5"
                >
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-bars-progress"></i>
                  </div>
                  <router-link to="/staff-portal" @click="showMobileMenu = false">Staff Portal</router-link>
                </li>
                <li class="dropdown-text">
                  <div class="dropdown-icon">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  </div>
                  <router-link to="/logout" @click="showMobileMenu = false">Logout</router-link>
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
      return `https://auth.vatsim.net/oauth/authorize?client_id=1184&redirect_uri=http://dev.czqm.ca/auth&response_type=code&scope=full_name+email+vatsim_details+country`;
    },
  },
  setup: async () => {
    const userData = await getUser();

    let user = ref(userData);

    return {
      user,
    };
  },
  data: () => {
    return {
      showMobileMenu: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.navbar-wrapper {
  width: 100vw;
  height: var(--nav-size);
  top: 0;
  left: 0;
  position: fixed;
  background: var(--nav-colour);
  z-index: 100;
}

.navbar {
  margin: 0;
  padding: 0;
  width: var(--width-ideal);
  max-width: var(--width-max);
  height: 100%;
}

.navitems {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  height: var(--nav-size);
  gap: 1rem;
}

.navitem {
  width: auto;
  height: var(--nav-size);
  display: flex;
  align-items: center;
}

.navitem a {
  text-decoration: none;
}

.login {
  margin-left: auto;
  margin-right: 1rem;
}

.navitem svg {
  width: 3rem;
  max-height: calc(var(--nav-size) * 0.9);
  color: white;
}

.navitem-text {
  color: #c9c1c1;
  font-size: 1rem;
  margin-left: 1rem;
  font-family: 'Raleway', sans-serif;
  transition: 0.1s ease;
  text-transform: uppercase;
}

.navitem-number {
  font-family: 'Arimo', sans-serif;
}

.navitem-text:hover {
  color: white;
}

.logo {
  max-height: calc(var(--nav-size) * 0.9);
}

/* Dropdowns */

.dropdown {
  position: relative;
  display: inline-block;
  transition: 1s ease;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 7rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  padding-left: 0;
  margin-left: 0;
  list-style-type: none;
  /* opacity: 0; */
  visibility: hidden;
}

.dropdown-icon svg {
  color: var(--nav-colour);
  height: 1rem;
  margin: 0;
  padding: 0;
}

.dropdown-text {
  font-family: 'Raleway', sans-serif;
  display: flex;
  text-transform: capitalize;
}

.dropdown:hover .dropdown-content {
  /* opacity: 1; */
  visibility: visible;
  transition: 1s ease;
}

.dropdown a {
  color: black;
}

.hamburger {
  display: none;
  cursor: pointer;
  transition: all ease-in-out 0.25s;

}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3 ease-in-out;
  transition: all 0.3 ease-in-out;
  background-color: white;
}

.czqm-logo {
  display: block;
}

@media only screen and (max-width: 950px) {
  .navitems {
    flex-direction: column;
    // opacity: 0;
  }

  .navitem-text {
    font-size: 1.25rem;
  }

  .login {
    margin: unset;
    padding-left: 0;
  }
  
  .hamburger {
    display: block !important;
    margin-left: auto;
  }

  .czqm-logo {
    opacity: unset !important;
    display: flex !important;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .logo {
    margin-right: auto;
  }

  .hamburger {
    margin-left: auto;
    padding-left: auto;
  }

  .hamburger.active .bar:nth-child(2){
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(1){
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active .bar:nth-child(3){
    transform: translateY(-8px) rotate(-45deg);
  }

  .navbar-wrapper.active {
    background-color: var(--nav-colour);
    height: 100%;
  }

  .navbar-wrapper > .navbar > .navitems > :not(.czqm-logo) {
    display: none;
  }

  .navbar-wrapper.active > .navbar > .navitems > :not(.czqm-logo) {
    display: block;
  }
}
</style>
