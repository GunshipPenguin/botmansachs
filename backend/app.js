'use strict'
const tradingApi = require('./src/trading-api')

tradingApi.start().then(() => {
  console.log('Trading API started')
})
