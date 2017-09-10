'use strict'
const express = require('express')
const config = require('../config')
const blackrockController = require('./controllers/trading/blackrock')
const newsController = require('./controllers/trading/news')
const stockQuoteController = require('./controllers/trading/stockquote')

const tradingApi = {
  start: function () {
    return new Promise((resolve, reject) => {
      const app = express()

      app.get('/trading_api/blackrock', blackrockController)

      app.get('/trading_api/news', newsController)

      app.get('/trading_api/stockquote/:symbol', stockQuoteController)

      app.listen(config.tradingApiPort, () => {
        resolve()
      })
    })
  }
}

module.exports = tradingApi
