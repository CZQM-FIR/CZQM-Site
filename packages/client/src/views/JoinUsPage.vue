<template>
  <div class="container mt-3">
    <h2>Join Us</h2>
    <div class="row gap-3">
      <div class="col-12 col-lg card">
        <div class="card-body">
          <h5 class="card-title">New Controllers</h5>
          <div class="card-text">
            <p>
              Are you looking to join an energetic and friendly controlling
              environment? Moncton/Gander FIR, The Gateway to Canada's East
              Coast, is an amazing learning environment with some of Canada's
              best Instructors and Mentors as well as an amazing community.
            </p>

            <p>
              At Moncton/Gander FIR, we strive to provide you with the best
              training as a virtual air traffic controller in order for virtual
              pilots that fly in airspace, to receive the high level of ATC they
              have come to expect. Sign up with CZQM/QX FIR today and start your
              virtual air traffic control career.
            </p>
            <a
              target="_blank"
              href="https://vatcan.ca/division/controlling"
              class="btn btn-primary"
              >Learn More</a
            >
          </div>
        </div>
      </div>

      <div class="col-12 col-lg card">
        <div class="card-body">
          <h5 class="card-title">Request a Transfer</h5>
          <div class="card-text">
            <p>
              Already a controller in another division but want to control in
              the Atlantic? We are always looking for controllers to join our
              team. If you are interested in transferring to Moncton/Gander FIR,
              please fill out a transfer request.
            </p>
            <a
              target="_blank"
              href="https://vatcan.ca/my/transfer"
              class="btn btn-primary"
              >Transfer</a
            >
          </div>
        </div>
      </div>

      <div class="col-12 col-lg card">
        <div class="card-body">
          <h5 class="card-title">Visiting</h5>
          <div class="card-text">
            <p>
              The Moncton Gander FIR is a great place to control as a visitor.
              We accept visitors from all over the world and are always looking
              for new people to join our community. If you are interested in
              controlling with us, please feel free to aply!
            </p>
            <a
              target="_blank"
              href="https://vatcan.ca/my/visit"
              class="btn btn-primary"
              >Apply to Visit</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  document.title = "CZQM/QX | Join Us";
});
</script>

<style lang="scss" scoped></style>
