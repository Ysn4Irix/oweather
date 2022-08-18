module.exports = ({
  $axios
}, inject) => {
  const mapBoxApi = $axios.create({
    baseURL: process.env.NUXT_ENV_MAPBOX_BASE_URL
  })
  const openWeatherApi = $axios.create({
    baseURL: process.env.NUXT_ENV_OPENWEATHER_BASE_URL
  })

  mapBoxApi.onResponse((response) => {
    if (response.status === 404) {
      console.log('Oh no oh shit 😮‍💨 it returned a 404')
    }
  })

  openWeatherApi.onResponse((response) => {
    if (response.status === 404) {
      console.log('Oh no oh shit 😮‍💨 it returned a 404')
    }
  })

  inject('mapBoxApi', mapBoxApi)
  inject('openWeatherApi', openWeatherApi)
}
