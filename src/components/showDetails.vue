<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" v-if="isLoading">
      <v-col cols="6">
        <v-progress-linear
          color="primary accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <section v-if="!isLoading && dataState === 'noData'" class="mt-10">
      <no-data />
    </section>
    <section v-else-if="!isLoading && dataState === 'error'" class="mt-10">
      <data-error />
    </section>
    <media-details v-else :details="details" />
  </v-container>
</template>

<script>
import api from "@/api/api";
export default {
  components: {
    mediaDetails: () => import("@/components/media/mediaDetails"),
    noData: () => import("@/components/messages/noData"),
    dataError: () => import("@/components/messages/dataError"),
  },
  name: "showDetails",
  data() {
    return {
      mediaId: this.$route.params.mediaId,
      mediaType: this.$route.params.mediaType,
      details: {},
    };
  },
  async created() {
    this.fetchDetails();
  },
  computed: {
    isLoading: {
      get: function () {
        return this.$store.state.isLoading;
      },
      set: function (newValue) {
        this.$store.dispatch("setIsLoading", newValue);
      },
    },
    dataState() {
      return this.$store.state.dataState;
    },
  },
  methods: {
    async fetchDetails() {
      this.isLoading = true;
      try {
        this.details = await api.fetchDetailData(this.mediaType, this.mediaId);
        this.isLoading = false;
        if (this.details) {
          this.$store.dispatch("setDataState", "success");
        } else {
          this.$store.dispatch("setDataState", "noData");
        }
      } catch (error) {
        this.$store.dispatch("setDataState", "error");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
</style>