const { Router } = require('express')
const Event = require('../../models/Event')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const eventData = await Event.find()

        if (eventData.length < 1)
            return res.status(404).json({ message: 'No events found' })

        return res.status(200).json(eventData)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/:eventID', async (req, res) => {
    try {
        const eventData = await Event.findOne({ _id: req.params.eventID })

        if (!eventData)
            return res.status(404).json({ message: 'No event found' })

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
