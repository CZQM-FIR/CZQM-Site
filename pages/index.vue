<script setup lang="ts">
const { data } = useAuth();
const user = data.value?.user;
</script>

<template>
  <div>
    <section id="hero" class="text-light d-flex align-items-center fill-screen">
      <div class="container">
        <h1>
          <div class="text-center text-md-start">
            Canada's Gateway to the East Coast
          </div>
          <div class="row">
            <div class="col-12 col-md-10 lead text-center text-md-start">
              Providing realistic ATC services across the maritime provinces on
              the VATSIM newtwork.
            </div>
          </div>
          <div class="mt-3 text-center text-md-start">
            <div class="fw-lighter fs-6">Image copyright Nav Canada</div>
          </div>
          <div
            class="d-flex justify-content-center justify-content-md-start mt-3"
          >
            <NuxtLink to="/join" class="btn btn-outline-light"
              >Join Us</NuxtLink
            >
          </div>
        </h1>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fill-screen {
  min-height: calc(100vh - 56px);
}

#hero {
  background: linear-gradient(rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0.473)),
    url('/images/hero-bg.jpg') no-repeat center / cover;
}
</style>
