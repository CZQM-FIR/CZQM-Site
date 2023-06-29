const { Router } = require('express')
const path = require('path')

const multer = require('multer')

const SectorFile = require('../../models/SectorFile')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename (req, file, cb) {
    // const extArray = file.mimetype.split('/')
    // const extension = extArray[extArray.length - 1]

    const origName = file.originalname.split('.')[0]
    const extention = file.originalname.split('.')[1]
    cb(null, `${origName}.${extention}`)
    // cb(null, origName)
  }
})
const upload = multer({ storage })

const router = Router()

router.post('/', upload.single('file'), async (req, res) => {
  await SectorFile.findOneAndUpdate(
    {
      fileID: Number(req.body.fileID)
    },
    {
      fileID: Number(req.body.fileID),
      filePath: `/files/${req.file.filename}`
    },
    {
      upsert: true
    }
  )
  res.status(200).send()
})

router.get('/', async (req, res) => {
  const file = await SectorFile.findOne({
    fileID: 0
  })

  if (file) {
    res.status(200).send(file.filePath)
  } else {
    res.status(404).send()
  }
})
module.exports = router
