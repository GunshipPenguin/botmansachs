'use strict'
const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  quantity: Number,
}, {_id: false})

const botSchema = new mongoose.Schema({
  name: String,
  rank: Number,
  cash: Number,
  stocks: [stockSchema],
})

const Bot = mongoose.model('Bot', botSchema)

module.exports = Bot
