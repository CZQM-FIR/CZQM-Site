const { default: axios } = require("axios");
const { Router } = require("express");

const avwx_token = 'MkzJZ67U9lJorvexGqfWjOmBLFE22UCMmqgBkRl60A8'

const router = Router();

let stations = [];

router.get('/:icao', async (req, res) => {
    const { icao } = req.params;

    try {
        if (icao.length !== 4) {
            return res.status(400).json({ message: 'ICAO code must be 4 characters long' });
        }

        if (stations.filter(s => s.icao.toLowerCase() === icao.toLowerCase()).length > 0) { // If stations array contains the station with the given icao code
            const station = stations.filter(s => s.icao.toLowerCase() === icao.toLowerCase())[0]; // Get the station with the given icao code

            if (station.time + 86400000 > Date.now()) { // If the station is less than a day old
                return res.status(200).json(station); // Return the station
            } else {
                let stationData = (await axios.get(`https://avwx.rest/api/station/${icao}?options=&token=${avwx_token}`)).data
                console.info(`Fetching new airport data for ${icao}`)

                let stationTime = Date.now();
                let stationICAO = stationData.icao
                let stationName = stationData.name

                let index = stations.indexOf(station)
                if (index > -1) {
                    stations.splice(index, 1);
                }

                stations.push({
                    icao: stationICAO.toUpperCase(),
                    name: stationName,
                    time: stationTime
                })

                const newStation = stations.filter(s => s.icao.toLowerCase() === icao.toLowerCase())[0];

                return res.status(200).json(newStation);
            }
        } else {
            let stationData = (await axios.get(`https://avwx.rest/api/station/${icao}?options=&token=${avwx_token}`)).data
            console.info(`Fetching new airport data for ${icao}`)

            let stationTime = Date.now();
            let stationICAO = stationData.icao
            let stationName = stationData.name

            stations.push({
                icao: stationICAO.toUpperCase(),
                name: stationName,
                time: stationTime
            })

            return res.status(200).json({
                icao: stationICAO,
                name: stationName,
                time: stationTime
            });


        }



    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.all('/', async (req, res) => {
    try {
        const message = 'You must provide an ICAO code';

        res.status(404).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router