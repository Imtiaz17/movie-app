<template>
  <v-container>
    <section v-if="enableMediaType">
      <media-type :media="mediaList" />
    </section>
    <section class="mt-5" v-else>
      <h2>What's Popular</h2>
      <v-row class="mt-2">
        <v-col
          v-for="item in mediaList"
          :key="item.id"
          class="d-flex child-flex"
          cols="3"
        >
          <router-link
            :to="{
              name: 'Details',
              params: {
                mediaType: item.media_type,
                mediaId: item.id,
              },
            }"
          >
            <media-item :media="item" />
          </router-link>
        </v-col>
      </v-row>
    </section>
    <section v-if="isLoading" class="mt-10">
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-progress-linear
            color="primary accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </section>
    <section v-if="!isLoading && dataState === 'noData'" class="mt-10">
      <no-data />
    </section>
    <section v-if="!isLoading && dataState === 'error'" class="mt-10">
      <data-error />
    </section>
  </v-container>
</template>

<script>
import api from "@/api/api";
export default {
  components: {
    mediaType: () => import("@/components/media/mediaType"),
    mediaItem: () => import("@/components/media/mediaItem"),
    noData: () => import("@/components/messages/noData"),
    dataError: () => import("@/components/messages/dataError"),
  },

  name: "media-list",
  async created() {
    this.fetchMediaList("trending/all/week");
  },
  data() {
    return {
      mediaList: [],
    };
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
    searchInput() {
      return this.$store.state.searchInput;
    },
    enableMediaType() {
      return this.$store.state.enableMediaType;
    },
    dataState() {
      return this.$store.state.dataState;
    },
  },
  watch: {
    searchInput: function (val) {
      this.fetchMediaList("search/multi", `&query=${val}`);
    },
  },
  methods: {
    async fetchMediaList(searchPath, additionalParams = "") {
      this.isLoading = true;
      this.mediaList = [];
      try {
        this.mediaList = await api.fetchData(searchPath, additionalParams);

        if (this.mediaList && this.mediaList.length) {
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

