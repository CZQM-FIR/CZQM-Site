<template>
    <nav class="navbar">
        <ul class="navitems">
            <!-- CZQM Logo Element -->
            <li class="navitem czqm-logo">
                <router-link to="/">
                    <img src="../../assets/images/CZQM-White.png" alt="CZQM Logo" class="logo">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
                            </div>
                            STAFF
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
                            </div>
                            ROSTER
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
                            </div>
                            RESOURCES
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
                            </div>
                            Non, necessitatibus?
                        </li>
                        <li class="dropdown-text">
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
                            </div>
                            Quos, veniam?
                        </li>
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
                <router-link to="/login">
                <span class="navitem-text">Login</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>
@import "../../assets/styles/global.css";

.navbar {
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    height: var(--nav-size);
    width: 100vw;
    position: fixed;
    background: var(--nav-colour);
}

.navitems {
    list-style: none;
    padding: 0;
    margin: 0 3rem 0 3rem;
    display: flex;
    align-items: center;
    height: 100%;
}


.navitem {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 1rem;
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
    font-family: 'Raleway', sans-serif;
    transition: 0.1s ease;
    text-transform: uppercase;
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
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
}

.dropdown:hover .dropdown-content {
    /* opacity: 1; */
    visibility: visible;
    transition: 1s ease;

}

</style>