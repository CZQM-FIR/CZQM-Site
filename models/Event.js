const mongoose = require('mongoose')

const RequiredString = {
    type: String,
    required: true,
}

const RequiredNumber = {
    type: Number,
    required: true,
}

const RequiredObject = {
    type: Object,
    required: true,
}

const eventSchema = new mongoose.Schema({
    name: RequiredString,
    description: String,
    start: RequiredNumber,
    end: RequiredNumber,
})

module.exports = mongoose.model('Event', eventSchema)