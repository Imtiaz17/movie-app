<template>
  <v-container>
    <section class="hero">
      <div class="px-10 py-10">
        <h2 class="white--text">Welcome</h2>
        <h3 class="white--text pt-5">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
        <v-row class="pt-10">
          <v-col cols="12">
            <v-text-field
              flat
              v-model="keyword"
              color="primary"
              background-color="white"
              append-icon="mdi-magnify"
              outlined
              dense
              @keyup.enter="search()"
              placeholder="Search for a movie, tv show, person......"
              @click:append="search()"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </section>
  </v-container>
</template>

<script>
export default {
  name: "search-filter",
  data() {
    return {
      keyword: "",
    };
  },
  created() {
    this.keyword = "";
    this.$store.dispatch("setSearchInput", this.keyword);
  },
  methods: {
    search() {
      this.$store.dispatch("setSearchInput", this.keyword);
    },
  },
};
</script>

<style scoped>
.hero {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(1, 9, 24, 0)
    ),
    url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/bcT8CaBIj086WVD7K529h78eujb.jpg");
  background-position: center;
  height: 300px;
}
</style>