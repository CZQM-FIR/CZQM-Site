const { Router } = require('express')
const Event = require('../../models/Event')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const eventData = await Event.find()

    const includeOldEvents = Boolean(req.query.old) || false

    if (eventData.length < 1) { return res.status(404).json({ message: 'No events found' }) }

    // Delete an event if it is a certain amount of days old
    eventData.forEach(async (event) => {
      if ((Date.now() - event.end) > (86400000 * 7 /* Amount of days */)) {
        await Event.deleteOne({ _id: event._id })
      }
    })

    // Filter out events that have already ended
    let eventDataFiltered
    if (!includeOldEvents) {
      eventDataFiltered = eventData.filter(event => event.end > Date.now())
    } else {
      eventDataFiltered = eventData
    }

    return res.status(200).json(eventDataFiltered.sort((a, b) => {
      const dateA = a.start
      const dateB = b.start

      if (dateA < dateB) {
        return -1
      }

      if (dateA > dateB) {
        return 1
      }

      return 0
    }))
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get('/:eventID', async (req, res) => {
  try {
    const eventData = await Event.findOne({ _id: req.params.eventID })

    if (!eventData) { return res.status(404).json({ message: 'No event found' }) }

    return res.status(200).json(eventData)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.delete('/:eventID', async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.eventID })
    res.status(200).json({ message: 'Event deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
