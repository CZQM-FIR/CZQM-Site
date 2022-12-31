const { Router } = require('express')
const User = require('../../models/User')
const processFlag = require('../../utils/processFlag')

const router = Router()

router.get('/', async (req, res) => {

    // const user = await User.findOne({ jwt: req.cookies.jwt })

    // if (!user || user.role.id < 4) {
    //     return res.status(401).json({ msg: 'Not authorized' }).send()
    // }

    const userParam = req.query.user
    const flagParam = req.query.flag

    if (!userParam) {
        res.status(400).json({
            message: 'Unknown User',
        }).send()
    }

    try {
        const editUser = await User.findOne({ cid: userParam.cid })
        editUser.personal = userParam.personal || editUser.personal
        editUser.role = userParam.role || editUser.role        
        editUser.flags = processFlag(flagParam, editUser.flags)

        await editUser.save()

        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router
