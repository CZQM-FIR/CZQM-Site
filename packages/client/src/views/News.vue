<template>
    <div class="container text-formatting">
        <div class="content fit-height">
            <div v-if="_id">
                <News />
            </div>
            <div v-else>
                <NewsList />
            </div>
        </div>
    </div>
</template>

<script>
    import router from "../router"
    import NewsList from "../components/News/NewsList.vue";
    import News from "../components/News/News.vue";

    export default {
    computed: {
        _id() {
            return router.currentRoute.value.query._id;
        }
    },
    components: { News, NewsList }
}
</script>

<style lang="scss" scoped>

</style>