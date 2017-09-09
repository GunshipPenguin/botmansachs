'use strict'
const Bot = require('../../models/bot')

function registerController(req, res) {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    res.status(400).json({error: 'Username and password are required'})
    return
  }

  if (username.length < 3) {
    res.status(400).json({error: 'Username is too short'})
    return
  }
  
  if (/[^\d\w]/.test(username)) {
    res.status(400).json({error: 'Username must be alphanumeric'})
    return
  }
  
  if (password.length < 8) {
    res.status(400).json({error: 'Password is too short'})
    return
  }

  Bot.findOne({name: new RegExp('^' + username + '$', 'i')}, (err, bot) => {
    if (bot) {
      res.status(409).json({error: 'Username is already taken, use another'})
      return
    }
    new Bot({name: username, password: password}).save((err, bot) => {
      if (err) {
        res.status(500).json({error: 'Internal server error'})
        return
      }
      res.status(201).send()
    })
  })
}

module.exports = registerController
