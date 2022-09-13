const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.SchemaTypes.ObjectId
        // need to make the default value a NEW objectId, how???
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
        // getter method to format the timestamp on query???
    }
})

module.exports = mongoose.model('Reaction', reactionSchema)