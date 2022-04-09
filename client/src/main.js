import { createApp } from 'vue'
import VueApp from './App.vue'
import router from './router'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

const app = createApp(VueApp)
    .use(router)
    .mount('#app')
    .component("font-awesome-icon", FontAwesomeIcon)