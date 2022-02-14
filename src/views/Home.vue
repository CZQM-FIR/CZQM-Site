<template>
<main class="home-page">
<div class="grid">
    <div class="welcome tile">
    <span class="header">Moncton / Gander FIR</span>
    <br>
    <span class="text">
        The Moncton/Gander FIR provides professional, courteous and realistic Air Traffic Control services for the Virtual Moncton & Gander Flight Information Region on the VATSIM Network.
        <br><br>
        Our airspace includes all of New Brunswick, Nova Scotia, Prince Edward Island, Newfoundland and Labrador, as well as Eastern Québec.
        <br><br>
        All virtual pilots are invited to fly the friendly skies of Moncton/Gander FIR!
    </span>
    <br><br>
    <img src="../assets/images/CZQM.png" alt="CZQM Logo" class="czqmLogo">
    </div>
</div>
</main>
</template>

<script>
    export default {
    name: "Home",
    data: () => {
        
    }
}
</script>

<style scoped>
.home-page {
    font-size: 1rem;
    font-family: 'Raleway', sans-serif;
}

.tile {
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 5px;
    font-size: 1rem;
    text-align: justify;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.grid {
    display: grid;
    text-align: justify;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, 22.5rem);
    grid-auto-rows: minmax(22.5rem, 1fr);
}

.header {
    font-size: 1.5rem;
    text-align: center;
}

.text {
    font-size: .9rem;
}

.czqmLogo {
    width: 10rem;
    height: auto;
    padding: 0;
    margin: 0;
    margin-top: -2rem;
}

</style>