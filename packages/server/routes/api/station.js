const axios = require('axios')
const { Router } = require('express')

const avwxToken = process.env.AVWX_TOKEN

const router = Router()

const stations = []

router.get('/:icao', async (req, res) => {
    const { icao } = req.params

    try {
        if (icao.length !== 4) {
            return res
                .status(400)
                .json({ message: 'ICAO code must be 4 characters long' })
        }

        if (
            stations.filter((s) => s.icao.toLowerCase() === icao.toLowerCase())
                .length > 0
        ) {
            // If stations array contains the station with the given icao code
            const station = stations.filter(
                (s) => s.icao.toLowerCase() === icao.toLowerCase()
            )[0] // Get the station with the given icao code

            if (station.time + 86400000 > Date.now()) {
                // If the station is less than a day old
                return res.status(200).json(station).send() // Return the station
            }
            const stationData = (
                await axios.get(
                    `https://avwx.rest/api/station/${icao}?options=&token=${avwxToken}`
                )
            ).data

            const stationTime = Date.now()
            const stationICAO = stationData.icao
            const stationName = stationData.name

            const index = stations.indexOf(station)
            if (index > -1) {
                stations.splice(index, 1)
            }

            stations.push({
                icao: stationICAO.toUpperCase(),
                name: stationName,
                time: stationTime,
            })

            const newStation = stations.filter(
                (s) => s.icao.toLowerCase() === icao.toLowerCase()
            )[0]

            return res.status(200).json(newStation).send()
        }
        const stationData = (
            await axios.get(
                `https://avwx.rest/api/station/${icao}?options=&token=${avwxToken}`
            )
        ).data

        const stationTime = Date.now()
        const stationICAO = stationData.icao
        const stationName = stationData.name

        stations.push({
            icao: stationICAO.toUpperCase(),
            name: stationName,
            time: stationTime,
        })

        return res.status(200).json({
            icao: stationICAO,
            name: stationName,
            time: stationTime,
        }).send()
    } catch (error) {
        return res.status(500).json({ message: error.message }).send()
    }
})

router.all('/', async (req, res) => {
    try {
        const message = 'You must provide an ICAO code'

        res.status(404).json(message).send()
    } catch (error) {
        res.status(500).json({ message: error.message }).send()
    }
})

module.exports = router
