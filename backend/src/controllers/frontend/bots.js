'use strict'
const Bot = require('../../models/bot')
const flatMap = require('lodash.flatmap')
const yahooFinance = require('../../apis/yahoofinance')

function botsController(req, res) {
  let after
  let limit
  if (!req.query.after || isNaN(parseInt(req.query.after, 10))) {
    res.status(400).send('Required after parameter not specified or invalid')
    return
  }
  if (!req.query.limit || isNaN(parseInt(req.query.limit, 10))) {
    res.status(400).send('Required limit parameter not specified or invalid')
    return
  }
  after = parseInt(req.query.after, 10)
  limit = parseInt(req.query.limit, 10)

  // Build mongo query based on whether or not searchterm is set
  let query
  let sortParams
  if (req.query.search_term) {
    query = {name: {$regex : '.*' + req.query.search_term + '.*'}}
    sortParams = {}
  } else {
    query = {rank: {$gt: after}}
    sortParams = {rank: 1}
  }

  Bot.find(query, (err, bots) => {
   if (err) {
     res.status(500).send('Internal error while retreiving bot information')
   } else {
     let stockSymbols = flatMap(bots, bot => {
       return bot.stocks.map(stock => stock.symbol)
     })
     yahooFinance.getMultiStockPrice(stockSymbols, priceMap => {
       const newBots = bots.map(bot => {
         const newStocks = bot.stocks.map(stock => {
           return Object.assign(stock.toObject(), {price: priceMap[stock.symbol]})
         })
         return Object.assign(bot.toObject(), {stocks: newStocks})
       })
       res.status(200).json({bots: newBots})
     })
   }
 }).sort(sortParams).limit(limit).select({_id: 0, __v: 0, password: 0, source: 0})
}

module.exports = botsController
