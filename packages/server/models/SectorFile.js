const mongoose = require('mongoose')

const RequiredString = {
  type: String,
  required: true
}

const RequiredNumber = {
  type: Number,
  required: true
}

const sectorFileSchema = new mongoose.Schema({
  fileID: RequiredNumber,
  filePath: RequiredString
})

module.exports = mongoose.model('SectorFile', sectorFileSchema)
