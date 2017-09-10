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
      const name = bodySplit[1].trim()

      if (name == 'N/A') {
        cb({error: 'invalid stock symbol'}, null)
      } else {
        cb(null, {
          price: price,
          name: name
        })
      }
    })
  },

  getMultiStockPrice: function(symbols, cb) {
    const url = 'http://finance.yahoo.com/d/quotes.csv?f=as&s=' + symbols.reduce((result, x) => result + ',' + x, '')
    request(url, function (err, response, body) {
      if (err) {
        console.error('Internal server error while fetching stock quote')
        return
      }
      // split on each stock
      const stockSplit = body.split('\n')
      if (stockSplit[-1] == '') {
        stockSplit.pop()
      }
      console.log(stockSplit)
      stockSplit.splice(-1, 1)

      const priceMap = {
        // of form symbol: price
      }
      console.log(stockSplit)
      stockSplit.forEach(csv => {
        const csvSplit = csv.split(',')
        const price = parseFloat(csvSplit[0])
        const symbol = csvSplit[1].slice(1, -1)


        if (symbol !== 'N/A') {
          priceMap[symbol] = price
        }
      })

      cb(priceMap)
    })
  }
}

module.exports = yahooFinance
