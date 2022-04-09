const { default: axios } = require("axios");
const { Router } = require("express");
const User = require('../../models/User');

const router = Router();

router.get('/:jwt', async (req, res) => {
    let user = await User.findOne({ jwt: req.params.jwt });

    switch (user.role.id) {
        case 0:
            if (user.role.name !== 'Guest') {
                user.role.name = 'Guest';
                user.save();
            }
            break;

        case 1:
            if (user.role.name !== 'Visiting Controller') {
                user.role.name = 'Visiting Controller';
                user.save();
            }
            break;

        case 2:
            if (user.role.name !== 'Home Controller') {
                user.role.name = 'Home Controller';
                user.save();
            }
            break;

        case 3:
            if (user.role.name !== 'Mentor') {
                user.role.name = 'Mentor';
                user.save();
            }
            break;

        case 4:
            if (user.role.name !== 'Instructor') {
                user.role.name = 'Instructor';
                user.save();
            }
            break;

        case 5:
            if (user.role.name !== 'FIR Staff') {
                user.role.name = 'FIR Staff';
                user.save();
            }
            break;

        default:
            user.role.id = 0;
            user.role.name = 'Guest';
            user.save();
            break;
    }

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.status(200).json({
        personal: user.personal,
        vatsim: user.vatsim,
        cid: user.cid,
        role: user.role,
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