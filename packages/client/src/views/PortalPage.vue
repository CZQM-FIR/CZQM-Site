<script setup>
import getUser from "../scripts/getUser";
import getRoleName from "../scripts/getRoleName";
import getGreeting from "../scripts/getGreeting";
import PortalPageLink from "../components/Portal/PortalPageLink.vue";
import { onMounted, ref } from "vue";

let user = ref({
  personal: {
    name_first: "",
  },
  vatsim: {
    rating: {
      long: "",
      short: "",
    },
  },
  flags: [],
});
let role = ref("");

onMounted(async () => {
  document.title = "CZQM/QX | Portal";

  user.value = await getUser();
  role.value = await getRoleName(user.value.flags);
});
</script>

<template>
  <div class="container mt-4">
    <h2>
      <i class="bi bi-list d-md-none pe-3 text-black"></i>{{ getGreeting() }}
      {{ user.personal.name_first }}!
    </h2>
    <div class="mt-3 row">
      <div class="col col-md-3 col-lg-2 list-group">
        <PortalPageLink
          to="/portal"
          name="Profile"
          icon="bi
        bi-person-circle"
        />
        <PortalPageLink
          to="/portal/preferences"
          name="Preferences"
          icon="bi bi-gear"
          :disabled="true"
        />

        <!-- spacer -->
        <div
          v-if="user.flags.some((flag) => flag === 'staff' || flag === 'admin')"
          class="disabled"
          style="height: 5px !important"
        ></div>

        <PortalPageLink
          v-if="user.flags.some((flag) => flag === 'admin')"
          to="/portal/admin/users"
          name="User Management"
          icon="bi bi-person-lines-fill"
        />
        <PortalPageLink
          v-if="
            user.flags.some((flag) => flag === 'events' || flag === 'admin')
          "
          to="/portal/admin/events"
          name="Events"
          icon="bi bi-calendar-event"
        />
        <PortalPageLink
          v-if="user.flags.some((flag) => flag === 'staff')"
          to="/portal/admin/news"
          name="News"
          icon="bi bi-newspaper"
        />
        <PortalPageLink
          v-if="user.flags.some((flag) => flag === 'instructor')"
          to="/portal/admin/instructors"
          name="Training Team"
          icon="bi bi-easel"
        />
        <PortalPageLink
          v-if="
            user.flags.some(
              (flag) =>
                flag === 'admin' ||
                flag === 'sector' ||
                flag === 'chief-instructor'
            )
          "
          to="/portal/admin/files"
          name="File Upload"
          icon="bi bi-file-earmark-text"
        />
        <PortalPageLink
          v-if="
            user.flags.some(
              (flag) => flag === 'chief-instructor' || flag === 'admin'
            )
          "
          to="/portal/admin/cbt"
          name="CBTs"
          icon="bi bi-file-earmark-text"
        />
        <PortalPageLink
          v-if="
            user.flags.some(
              (flag) =>
                flag === 'sector' ||
                flag === 'chief-instructor' ||
                flag === 'admin'
            )
          "
          to="/portal/admin/controller-resources"
          name="Controller Resources"
          icon="bi bi-file-earmark-text"
        />
        <PortalPageLink
          v-if="
            user.flags.some(
              (flag) =>
                flag === 'sector' ||
                flag === 'chief-instructor' ||
                flag === 'admin'
            )
          "
          to="/portal/admin/pilot-resources"
          name="Pilot Resources"
          icon="bi bi-file-earmark-text"
        />
        <PortalPageLink
          v-if="
            user.flags.some(
              (flag) => flag === 'chief-instructor' || flag === 'admin'
            )
          "
          to="/portal/admin/instructor-resources"
          name="Trainer Resources"
          icon="bi bi-file-earmark-text"
        />

        <!-- spacer -->
        <div class="disabled" style="height: 5px !important"></div>
        <PortalPageLink
          to="/logout"
          name="Logout"
          icon="bi bi-box-arrow-right"
        />
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
