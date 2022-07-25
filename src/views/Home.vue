<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h4>Movie App</h4>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <search-filter />
      <media-list />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    searchFilter: () => import("@/components/searchFilter"),
    mediaList: () => import("@/components/mediaList"),
  },

  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch("setSearchInput", "");
    this.$store.dispatch("setEnaleMediaType", false);
  },
};
</script>
