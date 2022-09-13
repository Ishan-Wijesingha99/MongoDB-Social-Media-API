const mongoose = require('mongoose')

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
        // validate: {
        //     // need to validate every email address, regex?
        // }
    },
    thoughts: {
        type: [String]
    },
    friends: {
        type: [String]
    }
})

module.exports = mongoose.model('User', userSchema)