<template>
    <div class="container">
        <div class="text-formatting content ">
            <div class="grid-container">
                <div class="grid-column">
                    <ControllerInformation class="grid-item" />
                </div>
                <div class="grid-column">
                    <Events class="grid-item" />
                    <div class="grid-item">
                        <h2>
                            <!-- TODO Add News -->
                            <i class="fa-solid fa-newspaper"></i> News
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ControllerInformation from '../components/ControllerPortal/ControllerInformation.vue'
    import Events from '../components/ControllerPortal/Events.vue'

    export default {
        components: {
    ControllerInformation,
    Events
}
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

    .grid-column {
        flex: 1
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