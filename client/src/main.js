import { createApp } from 'vue'
import VueApp from './App.vue'
import router from './router'

const app = createApp(VueApp)
    .use(router)
    .mount('#app');