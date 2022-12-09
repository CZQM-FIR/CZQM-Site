const { Router } = require("express");
const User = require('../../models/User');

const router = Router();

router.get('/', async (req, res) => {
    let controllers = await User.find()

    controllers = controllers.filter(c => c.role.id > 0)

    const controllerList = []

    controllers.forEach(c => {
        controllerList.push({
            name: c.personal.name_full,
            cid: c.cid,
            rating: c.vatsim.rating.short,
            roster: c.roster,
            role: c.role,
        });
    })

    controllerList.sort((a, b) => { 
        const nameA = a.personal.name_last
        const nameB = b.personal.name_last

        if (nameA < nameB) {
            return -1
        }

        if (nameA > nameB) {
            return 1
        }

        return 0
    })

    res.status(200).send(controllerList)
});

router.all('/*', async (req, res) => {
    res 
        .status(400)
        .json({ message: 'Invalid request. Are you looking for api/user?' });
});

module.exports = router