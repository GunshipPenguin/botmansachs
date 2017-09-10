'use strict'
const Bot = require('../../models/bot')

function getMyBotController(req, res) {
  const username = req.session.user.name

  Bot.updateOne({name: username}, {source: req.body.source}, (err, bot) => {
    if (err) {
      res.status(500).json({error: 'internal server error'})
      return;
    }
    res.status(200).send(bot.source);
  })
}

module.exports = getMyBotController
