const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    am: {
        type: Number,
        required: true
    },
    pm: {
        type: Number,
        required: true
    },
    like: {
        type: Number,
        required: true
    },
    dislike: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('User', PostSchema)