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

const userSchema = new mongoose.Schema({
    cid: RequiredString,
    access_token: RequiredString,
    refresh_token: RequiredString,
    expire: RequiredNumber,
    jwt: {
        type: String,
    },
    personal: RequiredObject,
    vatsim: RequiredObject,
})

module.exports = mongoose.model('User', userSchema)