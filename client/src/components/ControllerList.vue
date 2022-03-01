<template>
    <div>
        <div v-for="controller in controllers" :key="controller.id">
            <div class="controller">
                <div class="controller-info">
                    <span class="callsign"></span>
                    <span class="name"></span>
                </div>
                <span class="controller-time">

                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

    export default {
        setup: async () => {
            let controllers = ref([]);

            let controllersData = await axios.get("/api/controllers").data;

            console.log(controllersData);

            controllersData.forEach(controller => {
                controllers.value.push({
                    cid: controller.cid,
                    callsign: controller.callsign,
                    name: controller.name,
                    logon_time: controller.logon_time,
                    rating: controller.rating,
                });
            });

            console.log(controllers.value)

            return {
                controllers,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>