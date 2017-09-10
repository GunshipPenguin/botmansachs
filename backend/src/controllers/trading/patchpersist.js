'use strict'
const Bot = require('../../models/bot')

const patchPersistController = function (req, res) {
  if (!req.query.bot_name) {
    status(400).json({error: 'bot name must be specified'})
    return
  }

  if (!req.query.data) {
    status(400).json({error: 'no data provided'})
    return
  }

  Bot.updateOne({name: bot_name}, {persist: data} (err, doc) => {
    if (err) {
      status(500).json({error: 'Internal server error while storing data'})
    }
    status(204).send()
  })
}

module.exports = patchPersistController
