const { default: axios } = require("axios");
const { Router } = require("express");

const router = Router();

router.get('/:icao', async (req, res) => {
    const { icao } = req.params;

    try {
        if (icao.length !== 4) {
            return res.status(400).json({ message: 'ICAO code must be 4 characters long' });
        }

        const metar = await axios.get(`https://metar.vatsim.net/?id=${icao}`);

        if (metar.data.length === 0) {
            return res.status(404).json({ message: 'ICAO code not found or no METAR' });
        }

        res.status(200).json({
            status: 200,
            data: metar.data
        });
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