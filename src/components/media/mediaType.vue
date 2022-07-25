<template>
  <div>
    <h2>Search Result</h2>
    <v-tabs v-model="currentItem" fixed-tabs>
      <v-tab v-for="item in items" :key="item" :href="'#tab-' + item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentItem">
      <v-tab-item v-for="item in items" :key="item" :value="'tab-' + item">
        <v-row class="mt-5 mb-5">
          <v-col
            v-for="item in filteredMediaList"
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
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  components: { mediaItem: () => import("@/components/media/mediaItem") },
  name: "media-type",
  props: ["media"],
  data() {
    return {
      tab: null,
      currentItem: "tab-movie",
      items: ["movie", "person", "tv"],
    };
  },
  computed: {
    filteredMediaList() {
      return this.media.filter(
        (mediaItem) =>
          mediaItem.media_type ===
          this.currentItem.slice(this.currentItem.lastIndexOf("-") + 1)
      );
    },
  },
  watch: {
    filteredMediaList: function () {
      if (!this.filteredMediaList.length) {
        this.$store.dispatch("setDataState", "noData");
      } else {
        this.$store.dispatch("setDataState", "success");
      }
    },
  },
};
</script>

<style>
</style>