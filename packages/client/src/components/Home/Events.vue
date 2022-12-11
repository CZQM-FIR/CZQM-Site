<template>
    <div>
        <ul class="event-list">
            <div v-if="events.length == 0">
                <li>No Events Scheduled</li>
            </div>
            <div v-else>
                <li v-for="event in events.slice(0, 5)" :key="event">
                    <div class="event">
                        <span class="event-name"><router-link :to="{ path: '/events', query: { _id: event._id}}">{{event.name}}</router-link></span>
                        <span class="event-time">{{getEventTime(event)}}</span>
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
                const startUTC = new Date(start.getTime() + start.getTimezoneOffset() * 60000)
                const endUTC = new Date(end.getTime() + end.getTimezoneOffset() * 60000)

                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];

                return `${monthNames[startUTC.getMonth()]}. ${startUTC.getDate()}`
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

    .event-name:hover {
        text-decoration: underline;
    }

    .event-learn-more {
        margin-left: auto;
    }

    .event-time {
        color: grey;
        text-align: right;
        margin-left: auto;
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