const mongoose = require('mongoose')

const RequiredString = {
  type: String,
  required: true
}

const resourceSchema = new mongoose.Schema({
  type: RequiredString, // Name of the section (e.g. "instructors", "controllers")
  value: String // String Pseudocode that represents the resource page
})

module.exports = mongoose.model('Resource', resourceSchema)
