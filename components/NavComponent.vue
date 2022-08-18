<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="
        container
        flex flex-col
        sm:flex-row
        text-white
        items-center
        gap-4
        py-6
        rounded-b-lg
      "
    >
      <nuxt-link :to="{ name: 'index' }">
        <div class="flex items-center gap-3">
          <img class="w-10" src="~/assets/icons/sun.svg" alt="sun" />
          <p class="text-white text-xl font-bold">OWeather</p>
        </div>
      </nuxt-link>
      <div class="flex gap-3 flex-1 justify-end">
        <img
          class="w-8 hover:opacity-80 duration-150 cursor-pointer"
          src="~/assets/icons/info.svg"
          alt="info"
          @click="showModal"
        />
      </div>
      <ModalComponent :modalActive="modalActive" @close-modal="showModal">
        <div class="text-white">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The OWeather app allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
          </ol>
        </div>
      </ModalComponent>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      modalActive: null,
    };
  },
  methods: {
    showModal() {
      this.modalActive = !this.modalActive;
    },
  },
};
</script>