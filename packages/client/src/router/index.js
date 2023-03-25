import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import Auth from '../views/Auth.vue';
import Logout from '../views/Logout.vue';
import ControllerPortal from '../views/ControllerPortal.vue';
import getCookie from '../scripts/getCookie';
import NotAuthorised from '../views/NotAuthorised.vue';
import NotFound from '../views/NotFound.vue';
import StaffPortal from '../views/StaffPortal.vue';
import News from '../views/News.vue';
import Roster from '../views/Roster.vue';
import Staff from '../views/StaffList.vue';
import ControllerResources from '../views/ControllerResources.vue';
import ContactUs from '../views/ContactUs.vue';
import JoinUs from '../views/JoinUs.vue';
import Preferences from '../views/Preferences.vue';

import getUser from '../scripts/getUser';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/portal',
    name: 'Controller Portal',
    component: ControllerPortal,
    beforeEnter: (to, from) => {
      if (!getCookie('jwt')) {
        return { path: '/noauth' };
      }
    },
  },
  {
    path: '/staff-portal',
    name: 'Staff Portal',
    component: StaffPortal,
    beforeEnter: async (to, from) => {
    //   if (!getCookie('jwt')) {
    //     return { path: '/noauth' };
    //   }

    //   try {
    //     const user = await getUser(getCookie('jwt'));
    //     if (user.flags.some((flag) => flag.startsWith('staff'))) throw 401;
    //   } catch (error) {
    //     return { path: '/noauth' };
    //   }
    },
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Auth,
    beforeEnter: (to, from) => {
      if (getCookie('jwt')) {
        return { path: '/' };
      }
    },
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: (to, from) => {
      if (!getCookie('jwt')) {
        return { path: '/' };
      }
    },
  },
  {
    path: '/preferences',
    name: 'User Preferences',
    component: Preferences,
    beforeEnter: (to, from) => {
      if (!getCookie('jwt')) {
        return { path: '/' };
      }
    },
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/roster',
    name: 'Roster',
    component: Roster,
  },
  {
    path: '/staff',
    name: 'Staff',
    component: Staff,
  },
  {
    path: '/resources',
    name: 'Controller Resources',
    component: ControllerResources,
    // beforeEnter: (to, from) => {
    //   if (!getCookie('jwt')) {
    //     return { path: '/noauth' };
    //   }
    // },
  },
  {
    path: '/contact',
    name: 'Contact Us',
    component: ContactUs,
  },
  {
    path: '/join',
    name: 'Join Us',
    component: JoinUs,
  },
  // Keep these last just for organisation
  {
    path: '/noauth',
    name: 'Not Authorized',
    component: NotAuthorised,
  },
  {
    path: '/notfound',
    name: 'Page Not Found',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notfound',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to the top left when navigating to a new page
    return { top: 0, left: 0 };
  },
});

export default router;
