<script setup></script>

<template>
  <section id="footer" class="bg-dark text-light py-4">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm">
          <h5>Moncton / Gander FIR</h5>
          <p>
            Not to be used for real world navigation. Flight simulation only.
          </p>
          <p>Copyright © 2023 Moncton / Gander FIR. All rights reserved</p>
          <p>
            Moncton / Gander (CZQM/QX) FIR is an FIR (Flight Information Region)
            of VATSIM Canada (VATCAN). CZQM/QX FIR is responsible for providing
            ATC services for New Brunswick, Nova Scotia, Prince Edward Island,
            Newfoundland and Labrador, as well as Eastern Québec.
          </p>
        </div>
        <div class="col-6 col-sm-4">
          <h5>All Are Welcome</h5>
          <p class="fst-italic">
            "This world would be a whole lot better if we just made an effort to
            be less horrible to one another." - Elliot Page
          </p>
          <p>
            The Moncton / Gander FIR stands with the LGBTQIA+ community on
            VATSIM.
          </p>
        </div>
        <div class="col col-sm-2">
          <h5>Connect With Us</h5>
          <ul class="list-group links">
            <li>
              <a
                target="_blank"
                href="https://twitter.com/czqm_fir"
                class="link-light"
                >Twitter</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/CZQMFIR/"
                class="link-light"
                >FaceBook</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCS5H_U3h6edXWashMjQpuAg"
                class="link-light"
                >Youtube</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://forums.vatcan.ca/"
                class="link-light"
                >Forums</a
              >
            </li>
          </ul>
        </div>
        <div class="col col-sm-2">
          <h5>Quick Links</h5>
          <ul class="list-group links">
            <li>
              <a target="_blank" href="https://vatcan.ca" class="link-light"
                >VATCAN</a
              >
            </li>
            <li>
              <a target="_blank" href="https://vatsim.net" class="link-light"
                >VATSIM</a
              >
            </li>
            <li>
              <router-link to="/join" class="link-light">Join Us</router-link>
            </li>
            <li>
              <a
                target="_blank"
                href="https://api.czqm.ca/files/docs/privacy-policy.pdf"
                class="link-light"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                target="_blank"
                href="https://api.czqm.ca/files/docs/branding.pdf"
                class="link-light"
                >Branding</a
              >
            </li>
            <li>
              <router-link to="/contact" class="link-light"
                >Contact Us</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.links {
  list-style: none;
}

.section {
  padding: 60px 0;
}
</style>
