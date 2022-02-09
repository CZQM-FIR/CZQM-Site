<template>
    <nav class="navbar">
        <ul class="navitems">
            <!-- CZQM Logo Element -->
            <li class="navitem czqm-logo">
                <img src="../../assets/images/CZQM - White.png" alt="CZQM Logo" class="logo">
            </li>

            <!-- Normal Nav Elements -->

            <li class="navitem">
                <router-link to="/">
                <span class="navitem-text">HOME</span>
                </router-link>
            </li>

            <li class="navitem">
                <router-link to="/about">
                <span class="navitem-text">ABOUT</span>
                </router-link>
            </li>

            <!-- Login MUST BE LAST!!! -->

            <li class="navitem">
                <router-link to="/login">
                <span class="navitem-text">LOGIN</span>
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
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

.navbar {
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    height: 5rem;
    width: 100vw;
    position: fixed;
    background: #292929;
}

.navitems {
    list-style: none;
    padding: 0;
    padding-left: 3rem;
    padding-right: 3rem;
    margin: 0;
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
    color: white;
}

.navitem-text {
    color: #8b8b8b;
    font-size: 1.5rem;
    margin-left: 1rem;
    font-family: 'Raleway', sans-serif;
}

.logo {
    height: 4rem;
}

.czqm-logo {
    justify-self: flex-start;
}
</style>