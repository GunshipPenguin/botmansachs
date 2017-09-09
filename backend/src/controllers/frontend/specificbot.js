'use strict'
const Bot = require('../../models/bot')
const request = require('request')

function specificBotController(req, res) {
  let botName = req.params.name

  Bot.findOne({name: botName}, (err, bot) => {
    if (err) {
      res.status(500).send('Internal error while retreiving bot information')
    } else {
      if (bot == null) {
        res.status(404).json({error: 'Bot not found'})
      } else {
        fillStockPrices(bot.stocks, stocks => {
          let objBot = bot.toObject()
          objBot.stocks = stocks
          res.json(objBot)
        })
      }
    }
  }).select({_id: 0, __v: 0})
}

function fillStockPrices(stocks, cb) {
  let url = 'http://finance.yahoo.com/d/quotes.csv?f=a&s='
  stocks.forEach(stock => {
    url += stock.symbol + '+'
  })
  url.slice(0, -1)

  request(url, function (error, response, body) {
    const priceArray = body.split('\n').slice(0, -1)

    let newStocks = stocks.map((stock, index) => {
      return {
        symbol: stock.symbol,
        name: stock.name,
        shares: stock.shares,
        price: parseFloat(priceArray[index])
      }
    })
    cb(newStocks)
  })
}

module.exports = specificBotController
