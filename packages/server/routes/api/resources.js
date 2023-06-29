const { Router } = require('express')
const Resources = require('../../models/Resources')

const router = Router()

router.post('/', async (req, res) => {
  const resourceType = req.query.type
  const resourceValue = req.query.value

  try {
    await Resources.findOneAndUpdate({
      type: resourceType
    }, {
      type: resourceType,
      value: resourceValue || ''
    }, { upsert: true })
    res.status(200).json({ message: 'Resources updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  const resourceType = req.query.type

  try {
    const resourcesData = await Resources.findOne({
      type: resourceType
    })
    res.status(200).json({ data: resourcesData })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
