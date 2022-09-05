const router = require("express").Router();
const axios = require("axios");

router.get("/search/:query", async (req, res, next) => {
  const { query } = req.params;
  try {
    const data = (
      await axios.get(
        `${process.env.NUXT_ENV_MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NUXT_ENV_MAPBOX_ACCESS_TOKEN}&types=place`
      )
    ).data;

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
});

router.get("/weatherData/:lat/:lng", async (req, res, next) => {
  const { lat, lng } = req.params;
  try {
    const data = (
      await axios.get(
        `${process.env.NUXT_ENV_OPENWEATHER_BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${process.env.NUXT_ENV_OPENWEATHER_ACCESS_TOKEN}&units=metric`
      )
    ).data;

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
