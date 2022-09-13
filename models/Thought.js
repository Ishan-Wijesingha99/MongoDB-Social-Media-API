const mongoose = require('mongoose')

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // getter method to format the timestamp on query???
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        type: [String]
    }
})

module.exports = mongoose.model('Thought', thoughtSchema)