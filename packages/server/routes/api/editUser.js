const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.get('/', async (req, res) => {
    const userParam = JSON.parse(req.query.user)
    if (!userParam) {
        res.status(400).json({
            message: 'Unknown User',
        })
    }

    try {
        const user = await User.findOne({ cid: userParam.cid })
        user.personal.name_first = userParam.personal
        user.role = userParam.role
        user.roster = userParam.roster

        await user.save()

        return res.status(200)
    } catch (error) {
        return res.status(500)
    }
})

module.exports = router
