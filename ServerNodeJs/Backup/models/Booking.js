const mongoose = require('mongoose')

const Booking = mongoose.Schema({
    userID: { type: String, required: true },
    period: { type: String, required: true },
  })

  module.exports = mongoose.model('Booking', Booking)