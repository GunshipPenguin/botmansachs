'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const yahooFinance = require('../apis/yahoofinance')

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
  history: { type: [historySchema], default: [] },
  persist: { type: String, default: '' }
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

botSchema.methods.adjustCash = function(amount) {
  this.cash += amount
  this.save()
}

botSchema.methods.addStock = function (symbol, quantity) {
  // See if this bot already owns the requested stock
  const index = this.stocks.findIndex(stock => {
    return stock.symbol == symbol
  })

  // Create new stock
  if (index == -1) {
    yahooFinance.getStockInfo(symbol, (err, stockInfo) => {
      this.stocks.push(
        {
          symbol: symbol,
          name: stockInfo.name,
          quantity: quantity
        }
      )
      this.save()
    })
  } else { // Update existing stock
    this.stocks[index].quantity += quantity
    this.save()
  }
}

botSchema.methods.getStock = function (symbol) {
  const index = this.stocks.findIndex(stock => {
    return stock.symbol == symbol
  })

  return index == -1 ? null : this.stocks[index]
}

botSchema.methods.removeStock = function (symbol, quantity) {
  const index = this.stocks.findIndex(stock => {
    return stock.symbol == symbol
  })

  if (index != -1) {
    this.stocks[index].quantity -= quantity
    if (this.stocks[index].quantity == 0) {
      this.stocks.splice(index, 1)
    }
  }
}

botSchema.methods.addHistory = function (timestamp, holdings) {
  this.history.push({
    timestamp,
    holdings,
  })
  this.save()
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
