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
    await sendEmail(req.body.staff, `Contact Form Submission: ${req.body.subject}`, `
    <h1>Contact Form Submission</h1>
    <span><b>From:</b> ${req.body.name} - ${req.body.email}</span><br>
    <span><b>Subject:</b> ${req.body.subject}</span><br>
    <span><b>To:</b> ${req.body.staff}</span><br>
    <span><b>Sent At:</b> ${date.toUTCString()}</span><br><br>
    <span><b>Message:</b></span>
    <p>${req.body.message}</p><br>
    `)

    res.status(200).json({
        message: 'Email Sent',
    }).send()
    return true
})

module.exports = router
