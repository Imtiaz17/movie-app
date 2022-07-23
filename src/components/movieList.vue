<template>
  <v-container>
    <section class="mt-5">
      <h2>What's Popular</h2>
      <v-row class="mt-2">
        <v-col
          v-for="item in mediaList"
          :key="item.id"
          class="d-flex child-flex"
          cols="3"
        >
          <v-card>
            <v-img
              :src="`https://image.tmdb.org/t/p/original/${item.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/original/${item.poster_path}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title>
              {{ item.title ? item.title : item.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.release_date }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>
import api from "@/api/api";
export default {
  name: "movie-list",
  async created() {
    this.fetchMediaList("trending/all/week");
  },
  data() {
    return {
      mediaList: [],
    };
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

