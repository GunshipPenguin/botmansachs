'use strict'
const request = require('request')

const yahooFinance = {
  getStockInfo: function(symbol, cb) {
    const url = 'http://finance.yahoo.com/d/quotes.csv?f=an&s=' + symbol
    request(url, function (err, response, body) {
      if (err) {
        console.error('Internal server error while fetching stock quote')
        return
      }
      // ask,name
      const bodySplit = body.split(',')

      const price = parseFloat(bodySplit[0], 10)
      const name = bodySplit[1]

      cb({
        price: price,
        name: name.trim()
      })
    })
  }
}

module.exports = yahooFinance
