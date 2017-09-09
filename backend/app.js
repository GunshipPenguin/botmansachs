'use strict'
const tradingApi = require('./src/trading-api')
const frontendApi = require('./src/frontend-api')
const mongoose = require('mongoose')
const config = require('./config')

tradingApi.start().then(() => {
  console.log('Trading API started')
})

frontendApi.start().then(() => {
  console.log('Frontend API started')
})

connectToMongo().then(() => {
  console.log('Successfully connected to MongoDB server ' + config.dbAddress)
})

function connectToMongo () {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://' + config.dbAddress + '/' + config.dbName)

    const db = mongoose.connection

    db.on('error', console.error)

    db.once('open', () => {
      resolve()
    })
  })
}
