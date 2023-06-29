import { createRouter, createWebHistory } from "vue-router";
import getUser from "../scripts/getUser";
import HomePage from "../views/HomePage.vue";
import EventsPage from "../views/EventsPage.vue";
import NewsPage from "../views/NewsPage.vue";
import EventsPageDetails from "../components/Events/EventsPageDetails.vue";
import EventsPageList from "../components/Events/EventsPageList.vue";
import NewsPageList from "../components/News/NewsPageList.vue";
import NewsPageDetails from "../components/News/NewsPageDetails.vue";
import PortalPage from "../views/PortalPage.vue";
import getCookie from "../scripts/getCookie";
import AuthPage from "../views/AuthPage.vue";
import LogoutPage from "../views/LogoutPage.vue";
import ContactUsPage from "../views/ContactUsPage.vue";
import JoinUsPage from "../views/JoinUsPage.vue";
import RosterPage from "../views/RosterPage.vue";
import AdminUsersPage from "../components/Portal/Admin/AdminUsers.vue";
import AdminPage from "../components/Portal/Admin/AdminPage.vue";
import AdminUserSubpage from "../components/Portal/Admin/AdminUserSubpage.vue";
import AdminEvents from "../components/Portal/Admin/AdminEvents.vue";
import AdminEventsSubpage from "../components/Portal/Admin/AdminEventsSubpage.vue";
import AdminNews from "../components/Portal/Admin/AdminNews.vue";
import AdminNewsSubpage from "../components/Portal/Admin/AdminNewsSubpage.vue";
import PortalPageProfile from "../components/Portal/PortalPageProfile.vue";
import PortalPagePreferences from "../components/Portal/PortalPagePreferences.vue";
import AdminControllerResources from "../components/Portal/Admin/AdminControllerResources.vue";
import AdminPilotResources from "../components/Portal/Admin/AdminPilotResources.vue";
import Resources from "../views/ResourcesPage.vue";
import AdminFilesPage from "../components/Portal/Admin/AdminFilesPage.vue";
import CBTPage from "../components/Portal/Admin/AdminCBTPage.vue";
import AdminInstructorResources from "../components/Portal/Admin/AdminInstructorResources.vue";
import StaffPage from "../views/StaffPage.vue";
import ChartsPage from "../views/ChartsPage.vue";
import ControllerPage from "../views/ControllerPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/controller-resources",
      component: Resources,
      name: "Controller",
    },
    {
      path: "/pilot-resources",
      component: Resources,
      name: "Pilot",
    },
    {
      path: "/controller/:cid",
      component: ControllerPage,
    },
    {
      path: "/cbt",
      component: Resources,
      name: "CBT",
    },
    {
      path: "/charts",
      component: ChartsPage,
    },
    {
      path: "/staff",
      component: StaffPage,
    },
    {
      path: "/events",
      component: EventsPage,
      children: [
        {
          path: "",
          component: EventsPageList,
        },
        {
          path: ":id",
          component: EventsPageDetails,
        },
      ],
    },
    {
      path: "/news",
      component: NewsPage,
      children: [
        {
          path: "",
          component: NewsPageList,
        },
        {
          path: ":id",
          component: NewsPageDetails,
        },
      ],
    },
    {
      path: "/portal",
      component: PortalPage,
      beforeEnter: () => {
        if (!getCookie("jwt")) {
          return { path: "/" };
        }
      },
      children: [
        {
          path: "",
          component: PortalPageProfile,
        },
        {
          path: "preferences",
          component: PortalPagePreferences,
        },
        {
          path: "admin",
          beforeEnter: async () => {
            if (!getCookie("jwt")) {
              return { path: "/" };
            }
            try {
              const user = await getUser(getCookie("jwt"));
              if (
                !user.flags.some(
                  (flag) => flag.startsWith("staff") || flag === "admin"
                )
              ) {
                return { path: "/" };
              }
            } catch (error) {
              return { path: "/" };
            }
          },
          component: AdminPage,
          children: [
            {
              path: "users/:cid",
              component: AdminUserSubpage,
            },
            {
              path: "users",
              component: AdminUsersPage,
            },
            {
              path: "events/:id",
              component: AdminEventsSubpage,
            },
            {
              path: "events",
              component: AdminEvents,
            },
            {
              path: "news/:id",
              component: AdminNewsSubpage,
            },
            {
              path: "news",
              component: AdminNews,
            },
            {
              path: "controller-resources",
              component: AdminControllerResources,
            },
            {
              path: "pilot-resources",
              component: AdminPilotResources,
            },
            {
              path: "instructor-resources",
              component: AdminInstructorResources,
            },
            {
              path: "instructors",
              component: Resources,
              name: "Trainer",
            },
            {
              path: "cbt",
              component: CBTPage,
            },
            {
              path: "files",
              component: AdminFilesPage,
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      name: "Authentication",
      component: AuthPage,
      beforeEnter: () => {
        if (getCookie("jwt")) {
          return { path: "/" };
        }
      },
    },
    {
      path: "/logout",
      component: LogoutPage,
      beforeEnter: () => {
        if (!getCookie("jwt")) {
          return { path: "/" };
        }
      },
    },
    {
      path: "/contact",
      component: ContactUsPage,
    },
    {
      path: "/join",
      component: JoinUsPage,
    },
    {
      path: "/roster",
      component: RosterPage,
    },
  ],
});

export default router;
