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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM192 192c35.35 0 64 28.65 64 64s-28.65 64-64 64S128 291.3 128 256S156.7 192 192 192zM288 448H96c-8.836 0-16-7.164-16-16C80 387.8 115.8 352 160 352h64c44.18 0 80 35.82 80 80C304 440.8 296.8 448 288 448z"/></svg>
                            </div>
                            Staff
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.65 28.65 32 64 32H512C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96zM160 256C160 238.3 145.7 224 128 224C110.3 224 96 238.3 96 256C96 273.7 110.3 288 128 288C145.7 288 160 273.7 160 256zM160 160C160 142.3 145.7 128 128 128C110.3 128 96 142.3 96 160C96 177.7 110.3 192 128 192C145.7 192 160 177.7 160 160zM160 352C160 334.3 145.7 320 128 320C110.3 320 96 334.3 96 352C96 369.7 110.3 384 128 384C145.7 384 160 369.7 160 352zM224 136C210.7 136 200 146.7 200 160C200 173.3 210.7 184 224 184H448C461.3 184 472 173.3 472 160C472 146.7 461.3 136 448 136H224zM224 232C210.7 232 200 242.7 200 256C200 269.3 210.7 280 224 280H448C461.3 280 472 269.3 472 256C472 242.7 461.3 232 448 232H224zM224 328C210.7 328 200 338.7 200 352C200 365.3 210.7 376 224 376H448C461.3 376 472 365.3 472 352C472 338.7 461.3 328 448 328H224z"/></svg>
                            </div>
                            Roster
                        </li>
                        <div v-if="user.loggedIn">
                            <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1z"/></svg>
                            </div>
                            <router-link to="/portal">Portal</router-link>
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg>
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