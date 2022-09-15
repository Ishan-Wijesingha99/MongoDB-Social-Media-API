// require mongoose module
const mongoose = require('mongoose')

// create thoughtSchema
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
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        type: [String]
    }
})

// export thoughtSchema as a model
module.exports = mongoose.model('Thought', thoughtSchema)