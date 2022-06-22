<template>
    <div>
        <div v-if="id">
            <h2 class="disclaimer">Are you sure you want to delete the event? This is permanent!</h2>
            <br>
            <div class="cta-row">
                <button class="cta" @click="deleteEvent()">Delete Event</button>
            </div>
        </div>
        <div v-else>
            <h1>There is no event to delete here...</h1>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import router from "../../router";
    import axios from "axios";

    export default {
        setup: async () => {
            let id = ref('');
            let deleted = ref(false);

            id.value = router.currentRoute.value.query._id

            return {
                id,
                deleted
            }
        },
        methods: {
            deleteEvent: async () => {
                let response = await axios.delete(`/api/event/${router.currentRoute.value.query._id}`);
                router.push({ path: 'staff-portal', query: { page: 'events' } });
            }
        }
    }
</script>

<style lang="scss" scoped>

.disclaimer {
    margin: 1rem 0 0 0;
    padding: 0;
    text-align: center;
}

h1 {
    margin: 0 0 0 0;
    text-align: center;
}

textarea {
    resize: vertical;
    min-height: 1.3rem;
}

input {
    appearance: none;
    border-radius: 0;
}

.event-form {
    padding: 2rem 1rem 0;
}

.input {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    padding-top: 1.5rem;

    &+.input {
        margin-top: 1.5rem;
    }
}

.input-label {
    color: #8597a3;
    position: absolute;
    top: 1.5rem;
    transition: .25s ease;
}

.input-field {
    border: 0;
    z-index: 1;
    background-color: transparent;
    border-bottom: 2px solid #eee;
    font: inherit;
    font-size: 1.125rem;
    padding: .25rem 0;

    &:focus,
    &:valid {
        outline: 0;
        border-bottom-color: #000000;

        &+.input-label {
            color: #000000;
            transform: translateY(-1.5rem);
        }
    }
}

.cta-row {
    margin-top: .5rem;
    margin-bottom: 1rem;
    justify-content: center;
}

.cta {
    border: 0;
    font-size: 1rem;
}
</style>