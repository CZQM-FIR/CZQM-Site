<template>
    <div>
        <h1>{{greeting}} {{user.personal.name_first}}!</h1>
        <ul class="info-list">
            <li>{{user.personal.name_full}} {{user.cid}}</li>
            <li class="subtitle">{{user.vatsim.rating.long}} ({{user.vatsim.rating.short}})</li><br>
            <li>Role: {{user.role.name}}</li>
        </ul>
        <ul class="info-list">
            <li><i class="fa-solid fa-chevron-right"></i> Preferences</li>
            <li><i class="fa-solid fa-chevron-right"></i> <router-link to="/logout">Logout</router-link></li>
        </ul>
    </div>
</template>

<script>
    import getUser from "../scripts/getUser";
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
    ul.info-list {
        list-style: none;
        font-family: 'Arimo', sans-serif;
    }

    li:not(:last-child) { 
        margin-bottom: .5rem;  
    }

    h1 {
        align-self: center;
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