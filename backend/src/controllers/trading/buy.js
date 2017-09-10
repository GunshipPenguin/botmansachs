'use strict'
const Bot = require('../../models/bot')
const request = require('request')
const yahooFinance = require('../../apis/yahoofinance')

const buyController = function (req, res) {
  console.log(req.query.bot_name)
  if (!req.query.bot_name) {
    res.status(400).json({error: 'bot name must be specified'})
    return
  }
  if (!req.query.symbol) {
    res.status(400).json({error: 'no stock symbol provided'})
    return
  }
  if (!req.query.quantity || isNaN(parseInt(req.query.quantity))) {
    res.status(400).json({error: 'no quantity specified or quantity invalid'})
    return
  }
  const botName = req.query.bot_name
  const symbol = req.query.symbol
  const quantity = parseInt(req.query.quantity, 10)

  // Get ask price from Yahoo API and update if bot can afford it
  yahooFinance.getStockInfo(req.query.symbol, (err, stockInfo) => {
    if (err) {
      res.status(400).json(err)
      return
    }

    const totalCost = quantity * stockInfo.price

    Bot.findOne({name: botName}, (err, bot) => {
      if (err) {
        res.status(500).json({error: 'Internal server error while storing data'})
        return
      }

      if (bot.cash >= totalCost) {
        bot.addStock(symbol, quantity)
        bot.adjustCash(-totalCost)
        res.status(204).send()
      } else {
        res.status(400).json({error: 'Insufficent funds'})
      }
    })
  })
}

module.exports = buyController
