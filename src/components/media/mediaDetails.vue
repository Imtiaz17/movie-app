<template>
  <v-container>
    <person-details v-if="mediaType == 'person'" :details="details"/>
    <div v-else>
      <div
        class="visual-details-container"
        :style="{ backgroundImage: `url(${backdropUrl})` }"
      >
        <div class="content-wrapper">
          <div class="visual-details">
            <div class="media-poster-container" v-if="posterUrl">
              <img class="media-poster" :src="posterUrl" />
            </div>
            <div class="media-content">
              <div class="media-title">
                {{ details.title ? details.title : details.name }}
                <span class="media-year" v-show="details.release_date"
                  >({{ releaseDate(details.release_date) }})</span
                >
                <span class="media-runtime" v-show="details.runtime">{{
                  runtime(details.runtime)
                }}</span>
              </div>
              <div
                v-show="details.tagline"
                class="white--text text-caption mb-2"
              >
                {{ details.tagline }}
              </div>
              <div v-show="details.genres.length > 0" class="mb-2">
                <v-chip
                  v-for="(genre, i) in details.genres"
                  :key="i"
                  class="ma-1"
                  color="green"
                  small
                  text-color="white"
                >
                  {{ genre.name }}
                </v-chip>
              </div>
              <div class="overview">
                <h4 class="white--text">Overview</h4>
                <p class="white--text">{{ details.overview }}</p>
              </div>
              <div class="other-details">
                <div>
                  <h4 class="white--text">Language</h4>
                  <p class="white--text">
                    {{ details.original_language.toUpperCase() }}
                  </p>
                </div>
                <div>
                  <h4 class="white--text">Everage Vote</h4>
                  <p class="white--text">
                    {{ details.vote_average }}
                  </p>
                </div>
                <div>
                  <h4 class="white--text">Vote Count</h4>
                  <p class="white--text">
                    {{ details.vote_count }}
                  </p>
                </div>
                <div>
                  <h4 class="white--text">Popularity</h4>
                  <p class="white--text">
                    {{ details.popularity }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <h4>Top Billed Cast</h4>
        <div class="cast-list">
          <v-card
            v-for="(castItem, index) in details.credits.cast"
            :key="index"
          >
            <v-img
              :src="castUrl(castItem.profile_path)"
              :lazy-src="castUrl(castItem.profile_path)"
              width="200"
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
              {{ castItem.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ castItem.character }}
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import personDetails from "./personDetails";
export default {
  name: "mediaDetails",
  components: { personDetails },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mediaType: this.$route.params.mediaType,
    };
  },
  computed: {
    backdropUrl() {
      if (this.details.backdrop_path) {
        return `https://image.tmdb.org/t/p/original/${this.details.backdrop_path}`;
      }

      return "";
    },
    posterUrl() {
      if (this.details.poster_path) {
        return `https://image.tmdb.org/t/p/original/${this.details.poster_path}`;
      }

      return "";
    },
  },
  methods: {
    releaseDate(date) {
      return new Date(date).getFullYear();
    },
    castUrl(profile_path) {
      return `https://image.tmdb.org/t/p/original/${profile_path}`;
    },
    runtime(n) {
      var num = n;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + "h " + rminutes + "m";
    },
  },
};
</script>

<style scoped>
.visual-details-container {
  background-position: center;
  background-size: 300px 100px;
  background-size: cover;
  background-repeat: no-repeat;
}
.content-wrapper {
  background-image: linear-gradient(
    to right,
    rgba(38, 38, 38, 0.6) 150px,
    rgba(63, 63, 63, 0.8) 100%
  );
}
.visual-details {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: row;
}

.media-poster-container {
  border-radius: 8px;
  display: flex;
  padding: 40px 0;
}
.media-content {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-start;
}
.media-poster {
  height: 225px;
  width: 150px;
  border-radius: 8px;
}

.media-title {
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.media-year {
  font-size: 20px;
  color: #fff;
}
.media-runtime {
  font-size: 20px;
  color: #fff;
  margin-left: 10px;
}
.cast-list {
  margin-top: 10px;
  display: flex;
  gap: 20px;
  overflow-y: auto;
  padding-bottom: 10px;
}
.other-details {
  display: flex;
  gap: 20px;
}
.summary-container {
  padding: 24px;
}

.summary-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 18px;
}
</style>