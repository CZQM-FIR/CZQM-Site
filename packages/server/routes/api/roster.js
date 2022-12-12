const { Router } = require("express");
const User = require('../../models/User');

const router = Router();

const roles = [
    'Guest',
    'Visiting Controller',
    'Home Controller',
    'Mentor',
    'Instructor',
    'Events',
    'Sector Engineer',
    'Webmaster',
    'Chief Instructor',
    'Deputy Chief',
    'FIR Chief',
]

router.get('/', async (req, res) => {
    let controllers = await User.find()

    controllers = controllers.filter(c => c.role.id > 0)

    const controllerList = []

    controllers.forEach(c => {

        c.role.name = roles[c.role.id]  // eslint-disable-line no-param-reassign
        c.save()
        
        controllerList.push({
            name: c.personal.name_full,
            cid: c.cid,
            rating: c.vatsim.rating.short,
            roster: c.roster,
            role: c.role,
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