<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-md sticky-top">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/" style="padding: 0">
        <img
          src="/images/CZQM-White.png"
          alt="CZQM Logo"
          style="max-height: 40px"
        />
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/news" class="nav-link">News</NuxtLink>
          <NuxtLink to="/events" class="nav-link">Events</NuxtLink>

          <div class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="controllerDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Controllers
            </a>
            <ul class="dropdown-menu" aria-labelledby="controllerDropdown">
              <li>
                <NuxtLink class="dropdown-item" to="/staff">Staff</NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/roster">Roster</NuxtLink>
              </li>
              <li
                v-if="
                    status != 'authenticated' ||
                    !user.flags.some(
                      (flag: string) => flag === 'controller' || flag === 'visitor'
                    ) ||
                    user.flags.some(
                      (flag: string) => flag === 'staff' || flag === 'admin'
                    )
                  "
              >
                <NuxtLink class="dropdown-item" to="/join">Join Us</NuxtLink>
              </li>
              <li
                v-if="
                    status == 'authenticated' &&
                    user.flags.some(
                      (flag: string) => flag === 'controller' || flag === 'visitor'
                    )
                  "
              >
                <NuxtLink class="dropdown-item" to="/controller-resources"
                  >Resources</NuxtLink
                >
              </li>
              <li
                v-if="
                  status == 'authenticated' &&
                  user.flags.some(
                    (flag: string) => flag === 'controller' || flag === 'visitor'
                  )
                "
              >
                <NuxtLink class="dropdown-item" to="/cbt">CBT</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="pilotDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pilots
            </a>
            <ul class="dropdown-menu" aria-labelledby="pilotDropdown">
              <li class="dropdown-item">
                <NuxtLink to="/pilot-resources">Resources</NuxtLink>
              </li>
              <li class="dropdown-item">
                <NuxtLink to="/charts">Charts</NuxtLink>
              </li>
            </ul>
          </div>

          <NuxtLink to="/contact" class="nav-link">Contact Us</NuxtLink>
        </div>

        <div class="navbar-nav ms-auto">
          <button
            v-if="status == 'unauthenticated'"
            @click="signIn('vatsim')"
            class="btn btn-outline-light"
          >
            Login
          </button>

          <div v-else class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >{{ user?.name }}</a
            >
            <ul class="dropdown-menu" aria-labelledby="userDropdown">
              <li>
                <NuxtLink class="dropdown-item" to="/portal">Portal</NuxtLink>
              </li>
              <li class="dropdown-item">
                <a @click="signOut()">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { getSession, signIn, signOut, status, data } = useAuth();
const user: any = data.value?.user;
</script>

<style scoped></style>
