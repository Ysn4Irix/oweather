<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="$fetchState.pending"
      class="
        w-24
        h-24
        mt-7
        border-l-4 border-weather-primary
        rounded-full
        animate-spin
      "
    ></div>

    <h1
      v-else-if="$fetchState.error || !weatherData"
      class="py-2 text-white font-bold"
    >
      There is an Error while we fetching weather data
    </h1>
    <!-- Weather Overview -->
    <template v-else>
      <div
        class="
          flex flex-col
          items-center
          text-white
          py-12
          mt-6
          bg-weather-primary
          w-96
          mb-3
          rounded-lg
          shadow-lg
        "
      >
        <h1 class="text-4xl mb-2">{{ $route.params.city }}</h1>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData?.currentTime).toLocaleDateString("en-gb", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(weatherData?.currentTime).toLocaleTimeString("en-gb", {
              timeStyle: "short",
            })
          }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round(weatherData?.current.temp) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round(weatherData?.current.feels_like) }} &deg;
        </p>
        <p class="capitalize">
          {{ weatherData?.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>

      <!-- Hourly Weather -->
      <div
        class="
          max-w-screen-md
          w-full
          py-12
          my-2
          bg-weather-primary
          rounded-lg
          shadow-lg
        "
      >
        <div class="mx-8 text-white">
          <h2 class="mb-4 font-bold">Hourly Weather</h2>
          <div class="flex gap-10 overflow-x-scroll">
            <div
              v-for="hourData in weatherData?.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center py-4"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString("en-gb", {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt="weathericon"
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Weather -->
      <div
        class="
          max-w-screen-md
          w-full
          py-12
          my-3
          bg-weather-primary
          rounded-lg
          shadow-lg
        "
      >
        <div class="mx-8 text-white">
          <h2 class="mb-4 font-bold">7 Day Forecast</h2>
          <div
            v-for="day in weatherData?.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-gb", {
                  weekday: "long",
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>
                <img class="w-5" src="~/assets/icons/up.svg" alt="" />
                {{ Math.round(day.temp.max) }}
              </p>
              <p>
                <img class="w-5" src="~/assets/icons/down.svg" alt="" />
                {{ Math.round(day.temp.min) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ViewerComponent",
  data() {
    return {
      errorMsg: false,
      weatherData: null,
    };
  },
  async fetch() {
    await this.getWeatherData();
  },
  head() {
    return {
      title: `${this.$route.params.city} - ${this.$route.params.state}`,
    };
  },
  methods: {
    async getWeatherData() {
      try {
        const { lat, lng } = this.$route.params;
        const data = (
          await this.$axios.get(`/oweather/api/weatherData/${lat}/${lng}`)
        ).data;

        // cal current date & time
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = data.current.dt * 1000 + localOffset;
        data.currentTime = utc + 1000 * data.timezone_offset;
        // cal hourly weather offset
        data.hourly.forEach((hour) => {
          const utc = hour.dt * 1000 + localOffset;
          hour.currentTime = utc + 1000 * data.timezone_offset;
        });
        this.weatherData = data;
      } catch {
        this.errorMsg = true;
      }
    },
  },
};
</script>