'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  quantity: Number,
}, {_id: false})

const historySchema = new mongoose.Schema({
  timestamp: Number,
  holdings: Number,
}, {_id: false})

const botSchema = new mongoose.Schema({
  name: String,
  password: String,
  source: { type: String, default: '' },
  rank: { type: Number, default: Number.MAX_SAFE_INTEGER },
  cash: { type: Number, default: 1000000 },
  stocks: { type: [stockSchema], default: [] },
  history: { type: [historySchema], default: [] }
})

botSchema.methods.verifyPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) {
        return reject(err)
      }
      resolve(valid)
    })
  })
}

// Hashing Password
function hashPassword (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }

      this.password = hash
      next()
    })
  })
}

botSchema.pre('save', hashPassword)

const Bot = mongoose.model('Bot', botSchema)

module.exports = Bot
