const { default: axios } = require("axios");
const { Router } = require("express");

const router = Router();

router.get('/', async (req, res) => {
    try {

        let controllers = await (await axios.get('https://data.vatsim.net/v3/vatsim-data.json')).data.controllers

        let data = [];
        let callsigns = ['CZQM', 'CZQX', 'CYHZ', 'CYYR', 'CYZX', 'CYYT', 'CYQM', 'CYFC', 'CYZX', 'LFPV', 'CYSJ',];

        callsigns.forEach(callsign => {
            let filteredControllers = controllers.filter(c => c.callsign.startsWith(callsign));

            data.push(...filteredControllers);
        });

        data.forEach(c => {
            c.frequency = String(Number(c.frequency).toFixed(3));
            console.log(c)
        })

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router