'use strict'
const Bot = require('../../models/bot')

function registerController(req, res) {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    res.status(400).json({error: 'username or password not specified'})
    return
  }

  if (/[^\d\w]/.test(username) || username.length < 3) {
    res.status(400).json({error: 'username is not alphanumeric or too short'})
  }
  else if (password.length < 8) {
    res.status(400).json({error: 'passwords must be at least 8 chars in length'})
  }

  Bot.findOne({name: new RegExp('^' + username + '$', 'i')}, (err, bot) => {
    if (bot) {
      res.status(409).json({error: 'username already taken'})
      return
    }
    new Bot({name: username, password: password}).save((err, bot) => {
      if (err) {
        res.status(500).json({error: 'internal server error while registering'})
        return
      }
      res.status(201).send()
    })
  })
}

module.exports = registerController
