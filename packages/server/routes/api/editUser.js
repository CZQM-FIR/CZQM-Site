const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.get('/', async (req, res) => {
    console.info(req.query.user)

    const userParam = JSON.parse(req.query.user)
    if (!userParam) {
        res.status(400).json({
            message: 'Unknown User',
        })
    }

    try {
        let user = await User.findOne({ cid: userParam.cid })
        user.personal.name_first = userParam.personal
        user.role = userParam.role
        user.roster = userParam.roster

        await user.save()

        console.info('save success')

        return res.status(200)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router
