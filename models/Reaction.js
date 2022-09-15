// require mongoose module
const mongoose = require('mongoose')

// create reactionSchema
const reactionSchema = new mongoose.Schema({
    thoughtReactionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Thought'
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// export reactionSchema as a model
module.exports = mongoose.model('Reaction', reactionSchema)