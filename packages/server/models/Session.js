const mongoose = require('mongoose')

const RequiredString = {
    type: String,
    required: true,
}

const RequiredNumber = {
    type: Number,
    required: true,
}

const sessionSchema = new mongoose.Schema({
    cid: RequiredNumber,
    logonTime: RequiredString,
    duration: RequiredNumber,
    callsign: RequiredString,
    frequency: RequiredString,
})

module.exports = mongoose.model('Session', sessionSchema)
