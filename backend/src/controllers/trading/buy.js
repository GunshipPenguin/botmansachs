'use strict'
const Bot = require('../../models/bot')
const request = require('request')
const yahooFinance = require('../../apis/yahoofinance')

const buyController = function (req, res) {
  if (!req.query.bot_name) {
    status(400).json({error: 'bot name must be specified'})
    return
  }
  if (!req.query.symbol) {
    status(400).json({error: 'no stock symbol provided'})
    return
  }
  if (!req.query.quantity || isNaN(parseInt(req.query.quantity))) {
    status(400).json({error: 'no quantity specified or quantity invalid'})
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
        status(500).json({error: 'Internal server error while storing data'})
        return
      }

      if (bot.cash >= totalCost) {
        bot.addStock(symbol, quantity)
        bot.adjustCash(-totalCost)
        res.status(200).send()
      } else {
        res.status(400).json({error: 'Insufficent funds'})
      }
    })
  })
}

function getStockPrice(symbol, cb) {
  let url = 'http://finance.yahoo.com/d/quotes.csv?f=a&s=' + req.params.symbol

  request(url, function (err, response, body) {
    if (err) {
      console.error("internal error while fetching stock price info from yahoo")
      return
    }

    cb(parseFloat(body, 10))
  })
}

module.exports = buyController
