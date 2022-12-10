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
        const roleOrder = [
            'Guest',
            'Visitor',
            'Home Controller',
            'Mentor',
            'Instructor',
            'Events',
            'Sector Engineer',
            'Chief Instructor',
            'Webmaster',
            'Deputy Chief',
            'FIR Chief',
        ]

        const nameA = a.name.split(' ')[1]
        const nameB = b.name.split(' ')[1]
        const roleA = roleOrder.indexOf(a.role)
        const roleB = roleOrder.indexOf(b.role)

        // if ((nameA < nameB && roleA < roleB) || (nameA === nameB && roleA < roleB) || (nameA < nameB && roleA === roleB)) {
        //     return -1
        // }

        // if ((nameA > nameB && roleA > roleB) || (nameA === nameB && roleA > roleB) || (nameA > nameB && roleA === roleB)) {
        //     return 1
        // }

        if (roleA < roleB) {
            return -1
        }

        if (roleA > roleB) {
            return 1
        }

        if (nameA < nameB) {
            return -1
        }

        if (nameA > nameB) {
            return 1
        }

        return 0

        // if (nameA < nameB) {

        //     if (roleA > roleB) {
        //         return 1
        //     }

        //     return -1
        // }

        // if (nameA > nameB) {

        //     if (roleA < roleB) {
        //         return -1
        //     }

        //     return 1
        // }
    })

    res.status(200).send(controllerList)
});

router.all('/*', async (req, res) => {
    res 
        .status(400)
        .json({ message: 'Invalid request. Are you looking for api/user?' });
});

module.exports = router