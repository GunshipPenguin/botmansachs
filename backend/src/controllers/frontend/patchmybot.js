'use strict'
const Bot = require('../../models/bot')

function patchMyBotController(req, res) {
  const username = req.session.user

  Bots.UpdateOne({name: username}, {source: req.body.source}, (err, bot) => {
    if (err) {
      res.status(500).json({error: 'internal server error'})
      return;
    }
    res.status(204)
  })
}

module.exports = patchMyBotController
