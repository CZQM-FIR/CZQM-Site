const { default: axios } = require("axios");
const { Router } = require("express");

const router = Router();

router.get('/', async (req, res) => {
    try {

        let controllers = await (await axios.get('https://data.vatsim.net/v3/vatsim-data.json')).data.controllers

        let data = [];
        let callsigns = ['CZQM', 'CYQM', 'CYHZ', 'TOR', 'CYYZ'];

        callsigns.forEach(callsign => {
            let filteredControllers = controllers.filter(c => c.callsign.startsWith(callsign));

            data.push(...filteredControllers);
        });

        res.status(200).json({
            status: 200,
            data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router