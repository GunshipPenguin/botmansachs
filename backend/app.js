'use strict'
const tradingApi = require('./src/trading-api')
const frontendApi = require('./src/frontend-api')

tradingApi.start().then(() => {
  console.log('Trading API started')
})

frontendApi.start().then(() => {
  console.log('Frontend API started')
})
