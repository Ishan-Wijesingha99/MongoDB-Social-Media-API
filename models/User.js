// require mongoose module
const mongoose = require('mongoose')

// create userSchema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    thoughts: {
        type: [String]
    },
    friends: {
        type: [String]
    }
})

// export userSchema as a model
module.exports = mongoose.model('User', userSchema)