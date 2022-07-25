<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-img
          :src="personUrl"
          :lazy-src="personUrl"
          width="100%"
          height="400px"
          contain
          aspect-ratio="1"
          rounded
          class="grey lighten-2"
        ></v-img>
        <h2 class="text-h6 mt-3 mb-3">Personal Info</h2>
        <div>
          <h4>Known For</h4>
          <p>
            {{ details.known_for_department }}
          </p>
        </div>
        <div>
          <h4>Gender</h4>
          <p>
            {{ details.gender == 1 ? "Female" : "Male" }}
          </p>
        </div>
        <div>
          <h4>Birthday</h4>
          <p>
            {{ details.birthday }}
          </p>
        </div>
        <div>
          <h4>Place of Birth</h4>
          <p>
            {{ details.place_of_birth }}
          </p>
        </div>
        <div>
          <h4>Also Known As</h4>
          <p
            class="mb-0 text-caption"
            v-for="(known, i) in details.also_known_as"
            :key="i"
          >
            {{ known }}
          </p>
        </div>
      </v-col>
      <v-col cols="10">
        <h2 class="text-h4 font-weight-bold">{{ details.name }}</h2>
        <h3 class="pt-4 pb-2">Biography</h3>
        <div>
          {{ details.biography }}
        </div>
        <h3 class="pt-4 pb-2">Acting</h3>
        <v-card max-width="600" tile>
          <v-list v-for="(cast, index) in details.credits.cast" :key="index">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >{{ releaseDate(cast.release_date) }}
                  <b class="ml-3">{{ cast.title }}</b></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "personDetails",
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  computed: {
    personUrl() {
      return `https://image.tmdb.org/t/p/original/${this.details.profile_path}`;
    },
  },
  methods: {
    releaseDate(date) {
      if (date) {
        return new Date(date).getFullYear();
      }
      return "";
    },
  },
};
</script>

<style>
</style>