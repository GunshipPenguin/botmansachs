'use strict'
const Bot = require('../../models/bot')
const request = require('request')

const buyController = function (req, res) {
  if (!req.query.bot_name) {
    status(400).json({error: 'bot name must be specified'})
    return
  }
  if (!req.query.symbol) {
    status(400).json({error: 'no stock symbol provided'})
    return
  }
  if (!req.query.quantity) {
    status(400).json({error: 'no quantity specified'})
  }

  // Get ask price from Yahoo API
  getStockPrice(req.query.symbol, price => {

  })

  Bot.updateOne({name: bot_name}, {persist: data} (err, doc) => {
    if (err) {
      status(500).json({error: 'Internal server error while storing data'})
    }
    status(204).send()
  })
}

function getStockPrice(symbol, cb) {
  request('')
}

module.exports = patchPersistController
