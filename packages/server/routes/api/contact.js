const { Router } = require('express')
const path = require('path')

const router = Router()
const multer = require('multer')
const { sendEmail } = require('../../utils/emailBroadcast')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename(req, file, cb) {
        const extArray = file.mimetype.split('/')
        const extension = extArray[extArray.length - 1]

        const origName = file.originalname.split('.')[0]
        cb(null, `${origName}-${Date.now()}.${extension}`)
    },
})
const upload = multer({ storage })

router.post('/', upload.none(), async (req, res) => {
    const email =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.test(req.body.email) || !email.test(req.body.staff)) {
        return res.status(400).json({
            message: 'Incorrectly formatted email',
        }).send()
    }

    const date = new Date(Date.now())
    await sendEmail(req.body.staff, `CZQM Contact Form: ${req.body.subject}`, `
        A user has submitted a message through the contact form on the CZQM FIR Website. Take a look at the message below and respond to the user if necessary by replying to this email.
        <br><br>
        Name: ${req.body.name}<br>
        Email: ${req.body.email}<br>
        Date: ${date.toDateString()}<br>
        Time: ${date.toTimeString()}<br>
<br>
        Subject: ${req.body.subject}<br>
        Message: ${req.body.message}<br>
    `, `${req.body.name} <${req.body.email}>`)

    res.status(200).json({
        message: 'Email Sent',
    }).send()
    return true
})

module.exports = router
