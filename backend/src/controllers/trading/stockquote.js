'use strict'
const request = require('request')

function stockQuoteController(req, res) {
  if (!req.params.symbol) {
    res.status(400).json({error: 'stock name must be specified'})
    return
  }

  let url = 'http://finance.yahoo.com/d/quotes.csv?f=a&s=' + req.params.symbol

  request(url, function (err, response, body) {
    if (err) {
      res.status(500).json({error: 'internal server error while fetching stock quote'})
      return
    }

    const price = parseFloat(body, 10)
    res.status(200).json({price: price})
  })
}

module.exports = stockQuoteController
