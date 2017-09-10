'use strict'
const Bot = require('../../models/bot')

function getMyBotController(req, res) {
  const username = req.params.user

  Bot.findOne({name: username}, (err, bot) => {
    if (err) {
      res.status(500).json({error: 'Internal server error'})
      return;
    }
    res.status(200).json({ source: bot.source });
  })
}

module.exports = getMyBotController
