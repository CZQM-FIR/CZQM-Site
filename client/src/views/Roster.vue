<template>
    <div class="container">
        <table class="roster">
            <thead>
                <p class="key">Key: <span :style="certificationStyle(-1)">Not Authorised</span> <span
                        :style="certificationStyle(0)">Solo</span> <span :style="certificationStyle(1)">Certified</span>
                </p>

                <tr class="table-header">
                    <th>Name</th>
                    <th>CID</th>
                    <th>Raiting</th>
                    <th>GND</th>
                    <th>TWR</th>
                    <th>APP</th>
                    <th>CTR</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody v-if="controllers.length > 0">

                <tr v-for="controller in controllers" :key="controller.id">
                    <td>{{ controller.name }}</td>
                    <td>{{ controller.cid }}</td>
                    <td>{{ controller.rating }}</td>

                    <td :style="certificationStyle(controller.gnd)">GND</td>
                    <td :style="certificationStyle(controller.twr)">TWR</td>
                    <td :style="certificationStyle(controller.app)">APP</td>
                    <td :style="certificationStyle(controller.ctr)">CTR</td>

                    <td>{{ controller.status }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="8" style="text-align: center">No controllers found</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref } from 'vue'

    export default {
        setup: async () => {
            let controllers = ref([])

            return {
                controllers
            }
        },
        methods: {
            certificationStyle(status) {
                let style = ''

                switch (status) {
                    case -1:
                        style = 'font-weight: bold; color: #ff0000'
                        break;
                    case 0:
                        style = 'font-weight: bold; color: #ffc000'
                        break;
                    case 1:
                        style = 'font-weight: bold; color: #00ff00;'
                        break;
                }

                return style
            }
        }
    }
</script>

<style lang="scss" scoped>

.roster {
    border-collapse: collapse;
    font-size: 1rem;
    min-width: 44rem;
    font-family: 'Raleway', sans-serif;
}

.roster thead tr {
    background-color: #009879;
    color: white;
    text-align: left;
    font-weight: bold;
}

.roster th,
.roster td {
    padding: .75rem .95rem;
}

.roster tbody tr {
    border-bottom: 1px solid #dddddd
}

.roster tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.roster tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.container {
    flex-direction: column;
}

</style>