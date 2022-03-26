const { default: axios } = require("axios");
const { Router } = require("express");
const User = require('../../models/User');

const router = Router();

router.post('/', async (req, res) => {
    const user = await User.findOne({ jwt: req.cookies.jwt });

    if (!user) {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    user.jwt = '';
    await user.save();

    res.clearCookie('jwt').status(200).json({ msg: 'Logged out' });

});

module.exports = router