const axios = require("axios");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const controllers = await (
      await axios.get("https://data.vatsim.net/v3/vatsim-data.json")
    ).data.controllers;

    const data = [];
    const callsigns = [
      "CZQM",
      "CZQX",
      "CYHZ",
      "CYYR",
      "CYZX",
      "CYYT",
      "CYQM",
      "CYFC",
      "CYZX",
      "LFVP",
      "CYSJ",
    ];

    callsigns.forEach((callsign) => {
      const filteredControllers = controllers.filter((c) =>
        c.callsign.startsWith(callsign)
      );

      data.push(...filteredControllers);
    });

    data.forEach((c) => {
      // eslint-disable-next-line no-param-reassign
      c.frequency = String(Number(c.frequency).toFixed(3));
    });

    res.status(200).json(data).send()
  } catch (error) {
    res.status(500).json({ message: error.message }).send()
  }
});

module.exports = router;
