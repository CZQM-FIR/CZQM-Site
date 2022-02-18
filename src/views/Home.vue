<template>
<main class="home-page">
    <section class="hero container">
        <div class="hero-content content text-formatting">
            <div class="hero-text">
                <h1>Canada's Gateway to the East Coast</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perferendis rerum natus quia, iure ad debitis. Magnam pariatur voluptatibus illo?</p>
                <div class="cta-row">
                    <a href="#" class="cta">See More</a>
                    <a href="#" class="cta-secondary">Join Us</a>
                </div>
            </div>
        </div>
    </section>
</main>
</template>

<script>
    export default {
    name: "Home",
}
</script>

<style scoped>
template {
    height: 100%;
}

.hero {
    /* width: 100%; */
    height: 80vh;
    background: linear-gradient(var(--overlay-colour), var(--overlay-colour)), url('../assets/images/hero-bg.jpg') no-repeat center / cover;
    color: white;
    margin: 0;
    padding: 0;
}

.hero-content {
    height: 100%;
    text-align: left;
}

.hero-text h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-text h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.hero-text p {
    font-size: 1.2rem;
    max-width: 60%;
}
</style>