<template>
  <section>
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
    <media-details v-else :details="details" />
  </section>
</template>

<script>
import api from "@/api/api";
import mediaDetails from "../components/media/mediaDetails.vue";
export default {
  components: { mediaDetails },
  name: "showDetails",
  data() {
    return {
      mediaId: this.$route.params.mediaId,
      mediaType: this.$route.params.mediaType,
      isLoading: false,
      details: {},
    };
  },
  async created() {
    this.fetchDetails()
  },
  methods: {

    async fetchDetails() {
      this.isLoading = true;
      try {
        this.details = await api.fetchDetailData(this.mediaType, this.mediaId);
        this.isLoading = false;
         
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