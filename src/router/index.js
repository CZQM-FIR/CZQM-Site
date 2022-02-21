import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import Login from '../views/Login.vue';
import Privacy from '../views/Privacy.vue';
import Branding from '../views/Branding.vue';
import Staff from '../views/Staff.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/events',
        name: 'Events',
        component: Events,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
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