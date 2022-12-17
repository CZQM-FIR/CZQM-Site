const mongoose = require('mongoose')

const RequiredString = {
    type: String,
    required: true,
}

const flagSchema = new mongoose.Schema({
    name: RequiredString,                      // Name of the flag (e.g. "staff")
    description: RequiredString,               // Description of the flag (e.g. "Any staff member")
    subFlags: [                                // Array of IDs of any subflags (e.g. ["chief", "admin"])
        String
    ]
})

module.exports = mongoose.model('Flag', flagSchema)
