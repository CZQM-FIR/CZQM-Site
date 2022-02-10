<template>
<main class="home-page">
    <h1 class="main-header">Welcome to the Moncton FIR.</h1>
    <p>The Moncton/Gander FIR provides professional, courteous and realistic Air Traffic Control services for the Virtual Moncton & Gander Flight Information Region on the VATSIM Network.</p>
    <p>Our airspace includes all of New Brunswick, Nova Scotia, Prince Edward Island, Newfoundland and Labrador, as well as Eastern Québec.</p>
    <p>All virtual pilots are invited to fly the friendly skies of Moncton/Gander FIR!</p>
    <img src="src\assets\images\CZQM.png" alt="CZQM Logo" class="CZQM_Main_logo">
</main>
</template>

<script>
    export default {
    name: "Home",
}
</script>

<style scoped>
.home-page {
    font-size: 1.5rem;
}

.main-header {
    text-transform: uppercase;
}

.CZQM_Main_logo {
    width: 25%;
}

</style>