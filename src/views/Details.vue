<template>
  <section>
    <show-details />
  </section>
</template>

<script>
export default {
  components: {  showDetails: () => import('@/components/showDetails') },
  name: "media-details",
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>