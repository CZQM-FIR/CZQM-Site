const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.post('/', async (req, res) => {
    const user = await User.findOne({ jwt: req.cookies.jwt })

    if (!user) {
        return res.status(401).json({ msg: 'Not authorized' }).send()
    }

    user.jwt.remove(req.cookies.jwt)
    await user.save()

    return res.clearCookie('jwt').status(200).json({ msg: 'Logged out' }).send()
})

module.exports = router
