'use strict'
const Bot = require('../../models/bot')

const patchPersistController = function (req, res) {
  if (!req.query.bot_name) {
    status(400).json({error: 'bot name must be specified'})
    return
  }

  Bot.findOne({name: bot_name}, {persist: data} (err, doc) => {
    if (err) {
      status(500).json({error: 'Internal server error while getting data'})
    }
    status(200).json({data: doc})
  }).select({persist: 1})
}

module.exports = patchPersistController
