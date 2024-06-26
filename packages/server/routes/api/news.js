const { Router } = require('express')
const News = require('../../models/News')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const newsData = await News.find()

    if (newsData.length < 1) { return res.status(404).json({ message: 'No articles found' }) }

    return res.status(200).json(newsData.sort((a, b) => {
      const dateA = a.date
      const dateB = b.date

      if (dateA < dateB) {
        return 1
      }

      if (dateA > dateB) {
        return -1
      }

      return 0
    }))
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get('/:newsID', async (req, res) => {
  try {
    const newsData = await News.findOne({ _id: req.params.newsID })

    if (!newsData) { return res.status(404).json({ message: 'No article found' }) }

    return res.status(200).json(newsData)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.delete('/:newsID', async (req, res) => {
  try {
    await News.deleteOne({ _id: req.params.newsID })
    res.status(200).json({ message: 'Article deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
