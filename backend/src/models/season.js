'use strict'
const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
  start: Date,
  end: Date,
})

const Season = mongoose.model('Season', seasonSchema)

module.exports = Season
