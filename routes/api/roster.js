const { Router } = require("express");
const User = require('../../models/User');

const router = Router();

router.get('/', async (req, res) => {
    let controllers = await User.find()

    controllers = controllers.filter(c => c.role.id > 0)

    let controllerList = []

    controllers.forEach(c => {
        controllerList.push({
            name: c.personal.name_full,
            cid: c.cid,
            rating: c.vatsim.rating.short,
            roster: c.roster,
            role: c.role,
        });
    })

    res.status(200).send(controllerList)
});

router.all('/*', async (req, res) => {
    res 
        .status(400)
        .json({ message: 'Invalid request. Are you looking for api/user?' });
});

module.exports = router