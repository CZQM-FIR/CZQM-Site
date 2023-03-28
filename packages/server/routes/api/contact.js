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
    await sendEmail(req.body.staff, `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

    <div class="container">
        // create an unordered list of the form data using bootstrap
        <ul class="list-group">
            <li class="list-group-item">From: ${req.body.name} - ${req.body.email}</li>
            <li class="list-group-item">Subject: ${req.body.subject}</li>
            <li class="list-group-item">To: ${req.body.staff}</li>
            <li class="list-group-item">Sent At: ${date.toUTCString()}</li>
            <li class="list-group-item">Message: <br>${req.body.message}</li>
        </ul>
    </div>`, `${req.body.name} <${req.body.email}>`)

    res.status(200).json({
        message: 'Email Sent',
    }).send()
    return true
})

module.exports = router
