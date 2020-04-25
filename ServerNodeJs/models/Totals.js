const mongoose = require('mongoose')

const Totals = mongoose.Schema({
  title: { type: String, required: true },
  amCounter: { type: Number, required: true },
  pmCounter: { type: Number, required: true },
  AMlikeCounter: { type: Number, required: true },
  AMdisLikeCounter: { type: Number, required: true },
  PMlikeCounter: { type: Number, required: true },
  PMdisLikeCounter: { type: Number, required: true }
}) 

module.exports = mongoose.model('Totals', Totals)