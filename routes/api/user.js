const { default: axios } = require("axios");
const { Router } = require("express");
const User = require('../../models/User');

const router = Router();

router.get('/:jwt', async (req, res) => {
    let user = await User.findOne({ jwt: req.params.jwt });

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.status(200).json({
        personal: user.personal,
        vatsim: user.vatsim,
        cid: user.cid,
    })
});

router.all('/', async (req, res) => {
    try {
        const message = 'You must provide a JWT';

        res.status(404).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router