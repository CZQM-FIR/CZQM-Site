const { Router } = require('express')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename (req, file, cb) {
    const split = file.originalname.split('.')

    cb(null, req.body.forceName === 'true' ? file.originalname : `${split[0]}-${Date.now()}.${split[1]}`)
  }
})
const upload = multer({ storage })

const router = Router()

router.post('/', upload.single('file'), async (req, res) => {
  res.status(200).json({ data: req.file.filename }).send()

  return true
})
module.exports = router
