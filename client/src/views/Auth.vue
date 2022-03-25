<template>
    <div class="container">
        <h1 class="text-formatting content">Authenticating...</h1>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        setup: () => {
            let urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');

            axios.post(`/api/auth/${code}`, { withCredentials: true }).then((res, err) => {
                window.location.href = '/';

            })
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: calc(100vh - var(--nav-size));
    }
</style>