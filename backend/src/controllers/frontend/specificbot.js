'use strict'
const Bot = require('../../models/bot')

function specificBotController(req, res) {
  let botName = req.params.name

  Bot.findOne({name: botName}, (err, bot) => {
    if (err) {
      res.status(500).send('Internal error while retreiving bot information')
    } else {
      if (bot == null) {
        res.status(404).json({error: 'Bot not found'})
      } else {
        res.json(bot)
      }
    }
  })
}

module.exports = specificBotController
