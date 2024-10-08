const axios = require('axios')
const { Router } = require('express')
const path = require('path')
const multer = require('multer')
const User = require('../../models/User')

const Event = require('../../models/Event')
const { sendEmailToAll } = require('../../utils/emailBroadcast')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename(req, file, cb) {
    const extArray = file.mimetype.split('/')
    const extension = extArray[extArray.length - 1]

    const origName = file.originalname.split('.')[0]
    cb(null, `${origName}-${Date.now()}.${extension}`)
  }
})
const upload = multer({ storage })

const router = Router()

router.post('/', upload.single('image'), async (req, res) => {
  // const user = await User.findOne({ jwt: req.cookies.jwt })

  // if (!user || user.role.id < 4) {
  //     return res.status(401).json({ msg: 'Not authorized' }).send()
  // }

  let event

  if (req.body._id) {
    event = await Event.findOne({
      _id: req.body._id
    })
    event.name = req.body.name
    event.description = req.body.description
    event.start = new Date(req.body.start).getTime()
    event.end = new Date(req.body.end).getTime()
    event.image = req.file?.filename ? req.file.filename : event.image
    event.save()
    res.status(200).json({
      message: 'Event Edited Successfully',
      _id: event._id
    }).send()
  } else {
    event = await new Event({
      name: req.body.name,
      description: req.body.description,
      start: new Date(req.body.start).getTime(),
      end: new Date(req.body.end).getTime(),
      image: req.file.filename
    })
    await event.save()

    try {
      await axios.post(
        `${process.env.EVENTS_DISCORD_WEBHOOK_URI}`,
        {
          embeds: [
            {
              title: `New Event: ${req.body.name}`,
              description: `${req.body.description.substring(
                0,
                50
              )}... [Read More](https://czqm.ca/events/${event._id
                })`,
              timestamp: `${new Date(Date.now()).toISOString()}`,
              author: {
                name: 'CZQM FIR Event Feed',
                url: 'https://czqm.ca/events'
              }
            }
          ]
        }, {
        withCredentials: true
      }
      )

      // Send email to all users who have an email address and who are visitors or above
      const emailableUsers = await User.find({
        'personal.email': { $ne: null },
        flags: { $and: [{ $in: ['controller', 'visitor'] }, { $not: { $in: ['no-email'] } }] }
      })
      await sendEmailToAll([emailableUsers.map(userObject => userObject.personal.email)], `New Event: ${req.body.name}`, `
                There was a new event posted! Here are the details:
                Name: ${req.body.name}
                Start: ${new Date(req.body.start).toLocaleString(undefined, { hour12: false, timeStyle: 'short', dateStyle: 'full' })}z
                End: ${new Date(req.body.end).toLocaleString(undefined, { hour12: false, timeStyle: 'short', dateStyle: 'full' })}z
                Description: ${req.body.description}

                You can find the full details availible here: https://czqm.ca/events?_id=${event._id}

                <img src="https://api.czqm.ca/files/${req.file.filename}" alt="${req.body.name} Banner" />`)
    } catch (error) {
      console.error(`[ERROR] ${error}`)
    }

    res.status(200).json({
      message: 'Event Created Successfully',
      _id: event._id
    }).send()
  }
  return true
})
module.exports = router
