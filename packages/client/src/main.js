import { createApp } from 'vue'
import VueApp from './App.vue'
import router from './router'

// Font Awesome Icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

createApp(VueApp)
    .use(router)
    .mount('#app')