const { Router } = require('express')
const User = require('../../models/User')
const {sendEmailToAll} = require('../../utils/emailBroadcast')

const router = Router()

router.post('/', async (req, res) => {
    const user = await User.findOne({ jwt: req.cookies.jwt })

    if (!user || user.flags.some((flag) => flag === 'staff')) {
        return res.status(401).json({ msg: 'Not authorized' }).send()
    }

    let emails = []

    if (req.body.emails === 'all') {
        const users = await User.find({})
        for (let i = 0; i < users.length; i += 1) {
            const userObject = users[i]
            emails.push(userObject.personal.email)
        }
    } else {
        emails = req.body.emails.split(',')
    }

    if (emails.length < 1) {
        return res.status(400).json({ msg: 'No emails provided' }).send()
    }

    // return status 400 if no subject or body
    if (!req.body.subject || !req.body.body) {
        return res.status(400).json({ msg: 'No subject or no body provided' }).send()
    }

    await sendEmailToAll(emails, req.body.subject, req.body.body)

    return res.status(200).json({ msg: 'Emails sent' }).send()
})

module.exports = router
