<template>
    <div class="container">
        <div class="content text-formatting">
            <h1 class="">Page Not Found</h1>
            <h3 class="">This page could not be found.</h3>
            <p class=" ">Redirecting in {{count}}</p>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import router from '../router'

    export default {
        setup: () => {
            
            const count = ref(5);

            setInterval(() => {
                if (count.value == 0) {
                    router.push({path: '/'});
                } else {
                    count.value--;
                }
            }, 1000);

            return {
                count
            }
        }
    }
    
</script>

<style lang="scss" scoped>
    .content {
        min-height: calc(100vh - var(--nav-size));
    }
</style>