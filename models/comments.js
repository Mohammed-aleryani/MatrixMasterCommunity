const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    owner:{
        type:String,
    }
})

module.exports = mongoose.model('comments', commentsSchema)