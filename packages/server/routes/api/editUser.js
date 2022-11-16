const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.get('/', async (req, res) => {

    const user = await User.findOne({ jwt: req.cookies.jwt })

    if (!user || user.role.id < 4) {
        return res.status(401).json({ msg: 'Not authorized' })
    }

    const userParam = JSON.parse(req.query.user)
    if (!userParam) {
        res.status(400).json({
            message: 'Unknown User',
        })
    }

    try {
        const editUser = await User.findOne({ cid: userParam.cid })
        editUser.personal.name_first = userParam.personal
        editUser.role = userParam.role
        editUser.roster = userParam.roster

        await editUser.save()

        return res.status(200)
    } catch (error) {
        return res.status(500)
    }
})

module.exports = router
