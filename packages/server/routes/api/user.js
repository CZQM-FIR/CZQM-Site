const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.get('/:jwt', async (req, res) => {
    const user = await User.findOne({ jwt: req.params.jwt })

    if (!user) return res.status(404).clearCookie('jwt')
    if (!user) {
        return res.status(404).send('User not found')
    }

    user.save()

    return res.status(200).json({
        personal: user.personal,
        vatsim: user.vatsim,
        cid: user.cid,
        role: user.role,
        flags: user.flags,
    })
})

router.all('/', async (req, res) => {
    const users = User.find()

    if (!users) return res.status(404)

    // eslint-disable-next-line prefer-const
    let usersReturn = [];

    (await users).forEach((user) => {
    
        usersReturn.push({
            cid: user.cid,
            personal: user.personal,
            role: user.role,
            roster: user.roster,
            vatsim: user.vatsim,
            flags: user.flags,
        })
    })

    return res.status(200).json({
        users:  usersReturn.sort((a, b) => { 
        const nameA = a.personal.name_last
        const nameB = b.personal.name_last

        if (nameA < nameB) {
            return -1
        }

        if (nameA > nameB) {
            return 1
        }
        
        return 0
    }),
    })
})

module.exports = router
