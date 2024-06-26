const mongoose = require('mongoose')

const RequiredString = {
  type: String,
  required: true
}

const RequiredObject = {
  type: Object,
  required: true
}

const userSchema = new mongoose.Schema({
  cid: RequiredString,
  access_token: String,
  refresh_token: String,
  expire: String,
  jwt: [
    {
      type: String
    }
  ],
  personal: RequiredObject,
  vatsim: RequiredObject,
  flags: [
    String
  ],
  bio: String
})

module.exports = mongoose.model('User', userSchema)
