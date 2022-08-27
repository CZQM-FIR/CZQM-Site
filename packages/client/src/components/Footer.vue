<template>
  <footer class="footer container">
    <div class="footerContent">
      <div class="footerColumn">
        <h3 class="footerHeader">Moncton / Gander FIR</h3>
        <span class="footerText">
          Not to be used for real world navigation. Flight simulation only.<br />
          Copyright © {{ year }} Moncton / Gander FIR. All rights reserved.
          <br /><br />
          Moncton / Gander (CZQM/QX) FIR is an FIR (Flight Information Region)
          of
          <a href="https://vatcan.ca" class="footerLink"
            >VATSIM Canada (VATCAN)</a
          >. CZQM/QX FIR is responsible for providing ATC services for New
          Brunswick, Nova Scotia, Prince Edward Island, Newfoundland and
          Labrador, as well as Eastern Québec.
        </span>
      </div>
      <div class="footerColumn footerColumnSpacer"></div>
      <div class="footerColumn">
        <span class="footerText">
          <h3 class="footerHeader">All Are Welcome</h3>
          <i>
            "This world would be a whole lot better if we just made an effort to
            be less horrible to one another." <br />- Elliot Page<br /><br />
          </i>
          The Moncton / Gander FIR stands with the LGBTQIA+ community on VATSIM.
        </span>
      </div>
      <div class="footerColumn">
        <span class="footerText">
          <h3 class="footerHeader">Connect Wth Us</h3>
          <ul>
            <li>
              <a href="https://twitter.com/czqm_fir" class="footerLink"
                >Twitter</a
              >
            </li>
            <li>
              <a href="https://www.facebook.com/CZQMFIR/" class="footerLink"
                >FaceBook</a
              >
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCS5H_U3h6edXWashMjQpuAg"
                class="footerLink"
                >Youtube</a
              >
            </li>
            <li>
              <a href="https://forums.vatcan.ca/" class="footerLink">Forums</a>
            </li>
          </ul>
        </span>
      </div>
      <div class="footerColumn">
        <span class="footerText">
          <h3 class="footerHeader">Quick Links</h3>
          <ul>
            <li><a href="https://vatcan.ca" class="footerLink">VATCAN</a></li>
            <li><a href="https://vatsim.net" class="footerLink">VATSIM</a></li>
            <li>
              <a
                href="https://vatcan.ca/division/controlling"
                class="footerLink"
                >Join Us</a
              >
            </li>
            <li>
              <a href="/files/docs/privacy-policy.pdf" class="footerLink"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="/files/docs/branding.pdf" class="footerLink">Branding</a>
            </li>
            <li>
              <router-link to="/contact" class="footerLink"
                >Contact Us</router-link
              >
            </li>
          </ul>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  min-height: var(--footer-min-height);
  width: 100%;
  // position: relative;
  // bottom: 0;
  // left: 0;
  background: var(--nav-colour);
  z-index: 0;
}

.footerContent {
  padding: 1rem 0rem 1rem 0rem;
  display: grid;
  grid-template-columns: 3fr 2fr 1.5fr 1fr 1fr;
  grid-gap: 1rem;

  margin: 0;
  width: var(--width-ideal);
  max-width: var(--width-max);
  height: 100%;
}

.footerHeader {
  color: white;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  text-transform: initial;
  padding: 0 0 1rem 0;
  margin: 0;
}

.footerText {
  color: #c9c1c1;
  font-size: 0.75rem;
  font-family: 'Raleway', sans-serif;
  text-transform: none;
  justify-content: center;
}

.footerColumn {
  list-style: none;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.footerLink {
  color: #c9c1c1;
  text-transform: none;
  text-decoration: underline;
}
</style>
