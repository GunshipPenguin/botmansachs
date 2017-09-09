'use strict'
const Season = require('../../models/season')

function seasonController(req, res) {
  // We only have one season at the moment
  Season.findOne({}, (err, season) => {
    res.json(season)
  }).select({_id: 0, __v: 0})
}

module.exports = seasonController
