<template>
    <div class="container">
        <h1 class="text-formatting content">Logging out...</h1>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        setup: async () => {
            await axios.post('/api/logout', { withCredentials: true });
            window.location.href = '/';
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: calc(100vh - var(--nav-size));
    }
</style>