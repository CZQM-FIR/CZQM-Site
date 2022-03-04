import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import Privacy from '../views/Privacy.vue';
import Branding from '../views/Branding.vue';
import Staff from '../views/Staff.vue';
import Auth from '../views/Auth.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;