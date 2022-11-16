const { default: axios } = require('axios')
const { Router } = require('express')
const path = require('path')
const multer = require('multer')
const User = require('../../models/User')


const Event = require('../../models/Event')

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

const router = Router()

router.post('/', upload.single('image'), async (req, res) => {

    const user = await User.findOne({ jwt: req.cookies.jwt })

    if (!user || user.role.id < 4) {
        return res.status(401).json({ msg: 'Not authorized' })
    }

    let event

    if (req.body._id) {
        event = await Event.findOne({
            _id: req.body._id,
        })
        event.name = req.body.name
        event.description = req.body.description
        event.start = new Date(req.body.start).getTime()
        event.end = new Date(req.body.end).getTime()
        event.image = req.file.filename
        event.save()
        res.status(200).json({
            message: 'Event Edited Successfully',
        })
    } else {
        event = await new Event({
            name: req.body.name,
            description: req.body.description,
            start: new Date(req.body.start).getTime(),
            end: new Date(req.body.end).getTime(),
            image: req.file.filename,
        })
        await event.save()

        try {
            await axios.post(
                `${process.env.DISCORD_WEBHOOK_URI}`,
                {
                    embeds: [
                        {
                            title: `New Event: ${req.body.name}`,
                            description: `${req.body.description.substring(
                                0,
                                50
                            )}... [Read More](https://localhost:3000/events?_id=${
                                event._id
                            })`,
                            timestamp: `${new Date(Date.now()).toISOString()}`,
                            author: {
                                name: 'CZQM FIR Event Feed',
                                url: 'https://czqm.ca/events',
                            },
                        },
                    ],
                }
            )
        } catch (err) {
            console.error(err)
        }

        res.status(200).json({
            message: 'Event Created Successfully',
        })
    }
    return true
})
module.exports = router
