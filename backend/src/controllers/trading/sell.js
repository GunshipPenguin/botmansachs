'use strict'
const Bot = require('../../models/bot')
const request = require('request')
const yahooFinance = require('../../apis/yahoofinance')

const sellController = function (req, res) {
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

  // Get ask price from Yahoo API and update
  yahooFinance.getStockInfo(req.query.symbol, (err, stockInfo) => {
    if (err) {
      res.status(400).json(err)
      return
    }

    const totalValue = quantity * stockInfo.price

    Bot.findOne({name: botName}, (err, bot) => {
      if (err) {
        res.status(500).json({error: 'Internal server error while storing data'})
        return
      }

      bot.updateStockPrice(symbol, stockInfo.price)

      const botStockInfo = bot.getStock(symbol)
      if (botStockInfo.quantity < quantity) {
        res.status(400).json({error: 'you are attempting to sell more of one stock than you have'})
      } else {
        bot.removeStock(symbol, quantity)
        bot.adjustCash(totalValue)
        res.status(204).send()
      }
    })
  })
}

module.exports = sellController
