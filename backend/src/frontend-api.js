'use strict'
const express = require('express')
const passport = require('passport')
const config = require('../config')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyparser = require('body-parser')
const Bot = require('./models/bot')

const verifySessionMiddleware = require('./middleware/verify-session-middleware')
const corsMiddleware = require('./middleware/cors-middleware')

const LocalStrategy = require('passport-local').Strategy;

const botsController = require('./controllers/frontend/bots')
const specificBotController = require('./controllers/frontend/specificbot')
const getMyBotController = require('./controllers/frontend/getmybot')
const loginController = require('./controllers/frontend/login')
const patchMyBotController = require('./controllers/frontend/patchmybot')
const registerController = require('./controllers/frontend/register')
const seasonController = require('./controllers/frontend/season')

const store = new MongoStore({
  url: `mongodb://${config.dbAddress}/${config.dbName}`
})

// Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    Bot.findOne({ name: username }, function(err, bot) {
      if (err) {
        return done(err)
      }
      if (!bot) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      bot.verifyPassword(password)
        .then((isValid) => {
          if (!isValid) {
            done(null, false, { message: 'Incorrect password.' })
          } else {
            done(null, bot)
          }
        })
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const frontendApi = {
  start: function () {
    return new Promise((resolve, reject) => {
      const app = express()

      app.use(bodyparser.json())
      app.use(corsMiddleware)

      app.use(passport.initialize())
      app.use(passport.session())

      app.use(session({
        secret: config.apiSecret,
        cookie: {
          maxAge: 24 * 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false,
        store,
      }))

      app.get('/frontend_api/bots/:bot', specificBotController)

      app.get('/frontend_api/bots', botsController)

      app.get('/frontend_api/season', seasonController)

      app.patch('/frontend_api/mybot/:user', verifySessionMiddleware, patchMyBotController)

      app.get('/frontend_api/mybot/:user', verifySessionMiddleware, getMyBotController)

      app.post('/frontend_api/login', loginController)

      app.post('/frontend_api/register', registerController)

      app.listen(config.frontendApiPort, () => {
        resolve()
      })
    })
  }
}

module.exports = frontendApi
