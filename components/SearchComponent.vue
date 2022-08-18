<template>
  <main class="container text-white">
    <div class="pt-6 mb-8 relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a city or a state..."
        class="
          py-4
          px-3
          w-full
          border-b border-modal-primary
          rounded-t-lg
          bg-weather-primary
          focus:shadow-md focus:outline-none
        "
        @input="getSearchResults"
      />
      <ul
        v-show="mapboxSearchResults"
        class="
          absolute
          bg-weather-primary
          text-white
          w-full
          shadow-md
          py-1
          px-3
          top-[66px]
          rounded-b-xl
          z-10
        "
      >
        <p v-if="searchError" class="py-1">
          Sorry, something went wrong, please try again later.
        </p>
        <p
          v-else-if="!searchError && mapboxSearchResults?.length === 0"
          class="py-1"
        >
          No results match your query, try a different term.
        </p>
        <div v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </div>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      searchError: false,
      searchQuery: "",
      mapboxSearchResults: null,
    };
  },
  async fetch() {
    await this.getSearchResults();
  },
  fetchDelay: 2000,
  methods: {
    async getSearchResults() {
      if (this.searchQuery !== "") {
        try {
          const data = (
            await this.$mapBoxApi.get(
              `/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=${process.env.NUXT_ENV_MAPBOX_ACCESS_TOKEN}&types=place`
            )
          ).data;
          this.mapboxSearchResults = data.features;
        } catch {
          this.searchError = true;
        }
        return;
      }
      this.mapboxSearchResults = null;
    },
    previewCity(searchResult) {
      const [city, state] = searchResult.place_name.split(",");
      this.$router.push({
        name: "CityViewer",
        params: {
          state: state ? state.replaceAll(" ", "") : "",
          city,
          lat: searchResult.geometry.coordinates[1],
          lng: searchResult.geometry.coordinates[0],
        },
      });
    },
  },
};
</script>