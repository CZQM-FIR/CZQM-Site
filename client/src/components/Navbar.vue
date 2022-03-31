<template>
    <div class="navbar-wrapper container">
        <nav class="navbar content">
            <ul class="navitems">
                <!-- CZQM Logo Element -->
                <li class="navitem czqm-logo">
                    <router-link to="/">
                        <img src="../assets/images/CZQM-White.png" alt="CZQM Logo" class="logo" />
                    </router-link>
                </li>

                <!-- Normal Nav Elements -->

                <li class="navitem">
                    <router-link to="/">
                        <span class="navitem-text">Home</span>
                    </router-link>
                </li>

                <li class="navitem">
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
                            Staff
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <i class="fa-solid fa-rectangle-list"></i>
                            </div>
                            Roster
                        </li>
                        <div v-if="user.loggedIn">
                            <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <i class="fa-solid fa-file-lines"></i>
                            </div>
                            Resources
                        </li>
                        </div>
                    </ul>
                </div>
            </li>

                <li class="navitem">
                    <span class="navitem-text">Pilots</span>
                </li>

                <li class="navitem">
                    <a href="https://forums.vatcan.ca/">
                        <span class="navitem-text">Forums</span>
                    </a>
                </li>

                <!-- Login MUST BE LAST!!! -->

                <li class="navitem">
                    <div v-if="user.loggedIn">

                    <div class="dropdown">
                    <span class="navitem-text">{{user.personal.name_full}} (<span class="navitem-number">{{user.cid}}</span>)</span>

                    <ul class="dropdown-content">
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <i class="fa-solid fa-cloud"></i>
                            </div>
                            <router-link to="/portal">Portal</router-link>
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            </div>
                            <router-link to="/logout">Logout</router-link>
                        </li>
                    </ul>
                </div>
                    </div>
                    <div v-else>
                        <a :href="connectEndpoint">
                        <span class="navitem-text">Login</span>
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, unref } from 'vue';
import getUser from '../scripts/getUser'

export default {
    name: 'Navbar',
    computed: {
        connectEndpoint() {
            return `https://auth-dev.vatsim.net/oauth/authorize?client_id=316&redirect_uri=http://localhost:3000/auth&response_type=code&scope=full_name+email+vatsim_details+country`
        },
    },
    setup: async () => {
       let user = ref(await getUser())

        return {
            user
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global.scss";

.navbar-wrapper {
    width: 100vw;
    height: var(--nav-size);
    top: 0;
    left: 0;
    position: fixed;
    background: var(--nav-colour);
    z-index: 100;
}

.navitems {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;
    gap: 1rem;
}

.navitem {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
}

.navitem a {
    text-decoration: none;
}

.navitem:last-child {
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
    font-family: "Raleway", sans-serif;
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
    font-family: "Raleway", sans-serif;
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
</style>