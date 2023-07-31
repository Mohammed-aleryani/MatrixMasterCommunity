const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionsSchema = new mongoose.Schema({
    title: {
        type: String,
        

    },
    description: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ],

    owner:{
        type:String,
        require:true
    }

  
})

module.exports = mongoose.model('question', questionsSchema)