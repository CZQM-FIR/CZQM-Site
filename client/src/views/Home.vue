<template>
<main class="home-page">
    <section class="hero container">
        <div class="hero-content content text-formatting">
            <div class="hero-text">
                <h1>Canada's Gateway to the East Coast</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perferendis rerum natus quia, iure ad debitis. Magnam pariatur voluptatibus illo?</p>
                <div class="cta-row">
                    <a href="#info" class="cta">See More</a>
                    <a href="#" class="cta-secondary">Join Us</a>
                </div>
            </div>
        </div>
    </section>
    <section id="info" class="info container">
        <div class="info-wrapper content text-formatting">
            <div class="info-card">
                <span class="info-header">Online Controllers</span>
                <div v-for="controller in controllers" :key="controller.id">
            <div class="controller">
                <div class="controller-info">
                    <span class="callsign">{{controller.callsign}}</span>
                    <span class="name">{{controller.name}}</span>
                </div>
                <span class="controller-time">
                    {{controller.time}}
                </span>
            </div>
                </div>
            </div>
            <div class="info-card">
                <span class="info-header">About</span>
                <span class="info-text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet distinctio optio nam? Molestias voluptatem, animi fugiat nisi iusto aperiam deserunt consequuntur exercitationem illum culpa, excepturi earum ad explicabo impedit autem ipsam totam tempora quos harum quis? Ipsam voluptatibus maxime exercitationem. Ipsam praesentium suscipit minus rerum saepe tenetur, maxime aliquid quia.
                </span>
            </div>
            <div class="info-card">
                <span class="info-header">Weather</span>
            <div v-for="airport in airports" :key="airport.id">
                <h1 class="weather-header text-formatting">{{ airport.icao }} - {{ airport.name }}</h1>
                <span class="weather-text">{{ airport.metar }}</span>
            </div>
            </div>
            <div class="info-card">
                <span class="info-header">News</span>
                <span class="info-text">
                </span>
                <router-link to="/news" class="cta">See More</router-link>
            </div>
            <div class="info-card">
                <span class="info-header">Events</span>
                <span class="info-text">
                </span>
                <router-link to="/events" class="cta">See More</router-link>
            </div>
        </div>
    </section>
</main>
</template>

<script>
    import axios from 'axios';
    import { ref, unref } from 'vue';

    export default {
    name: "Home",
    data: () => {
        return {

    }
    },
    setup: () => {

        // Weather

        const airportList = ['CYHZ', 'CYQM', 'CYQX', 'CYYT']; // You can change the airports here, everything else will update automatically

            let airports = ref([])

            airportList.forEach(async (airport) => {
                let station = (await axios.get(`/api/station/${airport}`)).data.data
                let metar = (await axios.get(`/api/metar/${airport}`)).data.data

                airports.value.push({
                    icao: airport,
                    name: station.name,
                    metar: metar,
                })
            });

            // Online Controllers

            let controllers = ref([]);
            
            const getOnlineControllers = async () => {
            let controllersData = await (await axios.get("/api/controllers")).data.data;

            controllersData.forEach(controller => {
                let timeStamp = new Date(Date.now() - Date.parse(controller.logon_time))
                let time = `${timeStamp.getMinutes()}:${timeStamp.getSeconds()}`

                controllers.value.push({
                    cid: controller.cid,
                    callsign: controller.callsign,
                    name: controller.name,
                    time,
                    rating: controller.rating,
                });
            });

            }

            getOnlineControllers();

            return {
                airports,
                controllers
            }
    },
    }
    components: {

}
</script>

<style lang="scss" scoped>
template {
    height: 100%;
}

.hero {
    /* width: 100%; */
    height: calc(100vh - var(--nav-size));
    background: linear-gradient(var(--overlay-colour), var(--overlay-colour)), url('../assets/images/hero-bg.jpg') no-repeat center / cover;
    color: white;
    margin: 0;
    padding: 0;

    &-content {
        height: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: translate(0, -15%);
    }

    &-text h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    &-text h2 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    &-text p {
        font-size: 1.2rem;
        max-width: 60%;
    }
}

.info {
    padding: 0;
    padding-top: var(--nav-size);
    padding-bottom: calc(var(--nav-size) - 1.5rem);
    margin: 0;
    min-height: calc(100vh - var(--nav-size));

    &-card {
        padding: 1rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        border-radius: 5px;
        font-size: 1rem;
        text-align: justify;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 300px;
        width: 30%;
        margin-bottom: 1.5rem;
    }

    &-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}

.info-header {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: .5rem;
}

.info-text {
    font-size: .9rem;
    margin-bottom: 1rem;
}

#info {
    scroll-margin-top: calc(var(--nav-size));
}

.cta {
    align-self: flex-start;
    margin-top: auto;

    &-weather {
        align-self: flex-start;
        margin-top: 1rem;
    }
}

.weather-header {
    font-size: 1rem;
    margin: .75rem 0 .25rem 0;
    padding: 0;
    font-weight: normal;
    font-family: 'Raleway', sans-serif;
}

.weather-text {
    font-size: 0.9rem;
    align-self: flex-start;
    font-family: 'Roboto Mono', monospace;
    margin: 0;
    padding: 0;
}

.slideshow {
    aspect-ratio: 16 / 9;
}
</style>