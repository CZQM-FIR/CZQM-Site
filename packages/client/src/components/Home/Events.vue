<template>
    <div>
        <ul class="event-list">
            <div v-if="events.length == 0">
                <li>No Events Scheduled</li>
            </div>
            <div v-else>
                <li v-for="event in events.slice(0, 5)" :key="event">
                    <div class="event">
                        <span class="event-name">{{event.name}}</span>
                        <span class="event-time">{{getEventTime(event)}}</span>
                        <span class="event-learn-more"><router-link :to="{ path: '/events', query: { _id: event._id}}">Learn More <i class="fa-solid fa-chevron-right"></i></router-link></span>
                    </div>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
    import { ref } from "vue";
    import getEvent from '../../scripts/getEvent'

    export default {
        setup: async () => {
            let events = ref(await getEvent());

            return {
                events
            };
        },
        methods: {
            getEventTime: (event) => {
                const start = new Date(event.start);
                const end = new Date(event.end);

                // Format the time/date in DD/MM HHMMz format
                const startTime = `${start.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2})}/${(start.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2})} ${start.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}${start.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}z`;
                const endTime = `${end.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2})}/${(end.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})} ${end.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}${end.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}z`;

                return startTime + ' - ' + endTime;

                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .event {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }

    .event-learn-more {
        margin-left: auto;
    }

    .event-time {
        color: grey
    }
    ul.event-list {
        list-style: none;
        font-family: 'Arimo', sans-serif;
        padding: 0;
    }

    li:not(:last-child) { 
        margin-bottom: .5rem;  
    }

    h1 {
        align-self: center;
    }

    h2 {
        margin: .5rem 0 0 0;
    }

    li.subtitle {
        font-size: .85rem;
        color: gray;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>