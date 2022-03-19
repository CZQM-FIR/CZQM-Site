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

            axios.get(`/api/auth/${code}`).then((res, err) => {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                localStorage.setItem('expire', res.data.expires_in + Date.now());

                window.location.href = 'http://localhost:3000';
            })
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: calc(100vh - var(--nav-size));
    }
</style>