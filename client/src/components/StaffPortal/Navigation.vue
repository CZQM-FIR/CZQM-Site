<template>
    <div>
        <h1>{{greeting}} {{user.personal.name_first}}!</h1>
        <div class="cta-row">
            <router-link :to="{ query: { page: 'events' }}" class="cta" >Events</router-link>
        </div>
    </div>
</template>

<script>
    import getUser from "../../scripts/getUser";
    import { ref } from "vue";
    
    export default {
        setup: async () => {

            // Get user info
            let user = ref(await getUser());

            // Get current greeting
            let hour = new Date().getHours();
            let greeting = ref(`Good ${hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening"}`);

            return {
                greeting,
                user
            };
        }
    }
</script>

<style lang="scss" scoped>
    h1 {
        align-self: center;
    }

    .cta-row {
        justify-content: center;
    }
</style>