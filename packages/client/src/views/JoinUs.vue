<template>
  <div class="container text-formatting">
    <div class="content">
      <JoinUsCard
        title="New Controllers"
        :text="[
          `Are you looking to join an energetic and friendly controlling environment? Moncton/Gander FIR The Gateway to Canada's East Coast is part of the learning environment of VATCANs National Training Program (NTU) and is a great ATC and pilot community.`,
          `At Moncton/Gander FIR, we strive to provide you with the best training as a virtual air traffic controller in order for virtual pilots that fly in airspace, to receive the high level of ATC they have come to expect. Sign up with CZQM/QX FIR today and start your virtual air traffic control career.`,
        ]"
        :button="{
          text: 'Learn More',
          link: 'https://vatcan.ca/division/controlling',
        }"
      />
      <JoinUsCard
        titlle="Join Us"
        :text="[
          'Controllers wishing to transfer clikc here']"
        :button="{
          text:'Transfer',
          link: 'https://vatcan.ca/',
        }"
      />
      <JoinUsCard
        title="Visitor"
        :text="[
          `The Moncton Gander FIR is a great place to control as a visitor. We accept visitors from all over the world and are always looking for new people to join our community. If you are interested in controlling with us, please feel free to aply!`,
        ]"
        :button="{
          text: 'Apply to Visit',
          link: 'https://vatcan.ca/my/visit',
        }"
      />
    </div>
  </div>
</template>

<script>
import JoinUsCard from '../components/JoinUs/JoinUsCard.vue';

export default { components: { JoinUsCard } };
</script>

<style lang="scss" scoped>
.container {
  height: unset;
}

.content {
  display: flex;
  flex-direction: row;
  height: unset;
}

.card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1rem;
  padding: 1rem;

  margin: 1rem 1rem auto 1rem;
  height: unset;
  width: var(--width-ideal);
  max-width: var(--width-max);
}

.title {
  font-size: 2rem;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
