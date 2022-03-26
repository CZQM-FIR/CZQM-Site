import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import Privacy from '../views/Privacy.vue';
import Branding from '../views/Branding.vue';
import Staff from '../views/Staff.vue';
import Auth from '../views/Auth.vue';
import Logout from '../views/Logout.vue';
import ControllerPortal from '../views/ControllerPortal.vue';
import getCookie from '../scripts/getCookie';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: (to, from) => {
            if (getCookie('jwt')) {
                return { path: '/portal' };
            }
        }
    },
    {
        path: '/portal',
        name: 'Controller Portal',
        component: ControllerPortal,
        beforeEnter: (to, from) => {
            if (!getCookie('jwt')) {
                return { path: '/' };
            }
        }
    },
    {
        path: '/auth',
        name: 'Authentication',
        component: Auth,
    },
    {
        path: '/events',
        name: 'Events',
        component: Events,
    },
    {
        path: '/privacy',
        name: 'Privacy Policy',
        component: Privacy,
    },
    {
        path: '/branding',
        name: 'Branding Guidelines',
        component: Branding,
    },
    {
        path: '/staff',
        name: 'Staff',
        component: Staff,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
        beforeEnter: (to, from) => {
            if (!getCookie('jwt')) {
                return { path: '/' };
            }
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;