const { Router } = require("express");
const User = require('../../models/User');
const getRoleName = require('../../utils/getRoleName')
const getRosterStatus = require('../../utils/getRosterStatus')

const router = Router();

router.get('/', async (req, res) => {
    let controllers = await User.find()

    controllers = controllers.filter(c => c.flags.some((flag) => ['controller', 'visitor'].includes(flag)))

    const controllerList = []

    controllers.forEach(c => {
        
        controllerList.push({
            name: c.personal.name_full,
            cid: c.cid,
            rating: c.vatsim.rating.short,
            flags: c.flags,
            roster: getRosterStatus(c.flags),
            role: getRoleName(c.flags),
        });
    })

    

    res.status(200).send(controllerList.sort((a, b) => { 
        const nameA = (a.name.split(' '))[1]
        const nameB = (b.name.split(' '))[1]

        if (nameA < nameB) {
            return -1
        }

        if (nameA > nameB) {
            return 1
        }
        
        return 0
    }))
});

router.all('/*', async (req, res) => {
    res 
        .status(400)
        .json({ message: 'Invalid request. Are you looking for api/user?' });
});

module.exports = router