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

const newsSchema = new mongoose.Schema({
    name: RequiredString,
    date: RequiredNumber,
    text: RequiredString,
})

module.exports = mongoose.model('News', newsSchema)