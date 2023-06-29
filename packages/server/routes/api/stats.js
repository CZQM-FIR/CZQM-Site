const { Router } = require('express')
const Session = require('../../models/Session')

const router = Router()

router.get('/:filter', async (req, res) => {
  const { filter } = req.params
  let sessions = await Session.find({})
  sessions = sessions.filter(sesh => String(sesh.cid) === filter || sesh.callsign === filter)

  if (sessions.length > 0) {
    res.status(200).json({ sessions })
  } else {
    res.status(404).json({ message: 'No sessions found' })
  }
})

router.get('/', async (req, res) => {
  const sessions = await Session.find({})

  if (sessions.length > 0) {
    res.status(200).json({ sessions })
  } else {
    res.status(404).json({ message: 'No sessions found' })
  }
})

module.exports = router
