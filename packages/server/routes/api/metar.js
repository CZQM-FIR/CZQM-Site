const axios = require("axios");
const { Router } = require("express");

const router = Router();

// Array of objects: {icao: "", metar: "", time: unix timestamp}
const metarCache = [];

router.get("/:icao", async (req, res) => {
  const { icao } = req.params;

  try {
    if (icao.length !== 4) {
      return res
        .status(400)
        .json({ message: "ICAO code must be 4 characters long" });
    }

    let metar

    const date = new Date(Date.now())
    const time = date.getTime()

    const setExpiration = (array, element, delay) => {
      setTimeout(() => {
        const index = array.indexOf(element)
      if (index > -1) {
        array.splice(index, 1)
      }
      }, delay)
    }

    if (metarCache.some((element) => element.icao.toLowerCase() === icao.toLowerCase() && (Number(time) - Number(element.time)) < 30*1000)) {
      metar = await metarCache.find((element) => element.icao === icao)
    } else {
      metar = await axios.get(`https://metar.vatsim.net/?id=${icao}`);
      const element = metarCache.push({ icao, data: metar.data, time: Number(time) });
      setExpiration(metarCache, element, 1)
    }

    if (metar.data.length === 0) {
      return res
        .status(404)
        .json({ message: "ICAO code not found or no METAR" });
    }

    return res.status(200).json(metar.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.all("/", async (req, res) => {
  try {
    const message = "You must provide an ICAO code";

    res.status(404).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
