'use strict'
const express = require('express')
const config = require('../config')

const botsController = require('./controllers/frontend/bots')
const specificBotController = require('./controllers/frontend/specificbot')
const getMyBotController = require('./controllers/frontend/bots')
const loginController = require('./controllers/frontend/bots')
const patchMyBotController = require('./controllers/frontend/bots')
const registerController = require('./controllers/frontend/bots')
const seasonController = require('./controllers/frontend/season')

const frontendApi = {
  start: function () {
    return new Promise((resolve, reject) => {
      const app = express()

      app.get('/frontend_api/bots/:bot', specificBotController)

      app.get('/frontend_api/bots', botsController)

      app.get('/frontend_api/season', seasonController)

      app.patch('/frontend_api/mybot', patchMyBotController)

      app.get('/frontend_api/mybot', getMyBotController)

      app.post('/frontend_api/login', loginController)

      app.post('/frontend_api/register', registerController)

      app.listen(config.frontendApiPort, () => {
        resolve()
      })
    })
  }
}

module.exports = frontendApi
