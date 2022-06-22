<template>
    <div class="container">
        <div class="text-formatting content">
            <div class="grid-container">
                <div class="grid-column">
                    <Navigation class="grid-item"/>
                </div>
                <div class="grid-column">
                    <Events v-if="page == 'events'" class="grid-item"/>
                    <EditEvent v-else-if="page == 'events-edit'" class="grid-item"/>
                    <DeleteEvent v-else-if="page == 'events-delete'" class="grid-item"/>
                    <News v-else-if="page == 'news'" class="grid-item"/>
                    <EditNews v-else-if="page == 'news-edit'" class="grid-item"/>
                    <DeleteNews v-else-if="page == 'news-delete'" class="grid-item"/>
                    <span v-else class="grid-item">Select a function using the buttons to the left</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router"
import Navigation from "../components/StaffPortal/Navigation.vue";
import Events from "../components/StaffPortal/Events.vue";
import EditEvent from "../components/StaffPortal/EditEvent.vue";
import News from "../components/StaffPortal/News.vue";
import EditNews from "../components/StaffPortal/EditNews.vue";
import DeleteEvent from "../components/StaffPortal/DeleteEvent.vue";
import DeleteNews from "../components/StaffPortal/DeleteNews.vue";

    export default {
        computed: {
            page() {
                return router.currentRoute.value.query.page;
            }
        },
        components: { Navigation, Events, EditEvent, News, EditNews, DeleteEvent, DeleteNews }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: calc(100vh - var(--nav-size));
    }

    .grid-container {
        display: flex;

        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .grid-column:first-child {
        flex: 1
    }

    .grid-column:last-child {
        flex: 2
    }

    .grid-column:not(:first-child) {
        margin-left: 1rem;
    }

    .grid-column:not(:last-child) {
        margin-left: 1rem;
    }

    .grid-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 1rem;
        padding: 1rem;
    }

    .grid-item:not(:last-child) {
        margin-bottom: 1rem;
    }
    
    .grid-item:not(:first-child) {
        margin-top: 1rem;
    }
</style>