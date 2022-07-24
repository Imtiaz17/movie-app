<template>
  <section>
    <show-details />
  </section>
</template>

<script>
import showDetails from "@/components/showDetails.vue";
export default {
  components: { showDetails },
  name: "media-details",
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>