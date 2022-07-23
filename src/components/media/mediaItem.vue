<template>
  <v-card>
    <v-img
      :src="posterUrl"
      :lazy-src="posterUrl"
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
        {{ mediaTitle }}
    </v-card-title>
    <v-card-subtitle>
      {{ media.release_date }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "MediaItem",
  props: {
    media: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posterUrl() {
      if (this.media.poster_path) {
        return `https://image.tmdb.org/t/p/original/${this.media.poster_path}`;
      } else if (this.media.profile_path) {
        return `https://image.tmdb.org/t/p/original/${this.media.profile_path}`;
      }

      return "";
    },
    mediaTitle() {
      return this.media.title || this.media.name;
    },
    mediaOverview() {
      return this.media.overview || "";
    },
  },
};
</script>

<style>
</style>