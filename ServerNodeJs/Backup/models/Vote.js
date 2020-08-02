const mongoose = require('mongoose')

const Vote = mongoose.Schema({
    userID: { type: String, required: true },
    period: { type: String, required: true },
    vote: { type: String, required: true },
  })

  module.exports = mongoose.model('Vote', Vote)