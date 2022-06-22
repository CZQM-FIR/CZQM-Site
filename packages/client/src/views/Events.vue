<template>
    <div class="container text-formatting">
        <div class="content fit-height">
            <div v-if="_id">
                <Event />
            </div>
            <div v-else>
                <EventsList />
            </div>
        </div>
    </div>
</template>

<script>
    import router from "../router"
import EventsList from "../components/Events/EventsList.vue";
import Event from "../components/Events/Event.vue";

    export default {
    computed: {
        _id() {
            return router.currentRoute.value.query._id;
        }
    },
    components: { EventsList, Event }
}
</script>

<style lang="scss" scoped>

</style>