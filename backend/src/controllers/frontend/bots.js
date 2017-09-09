'use strict'
const Bot = require('../../models/bot')

function botsController(req, res) {
  let after
  let limit
  if (!req.query.after || isNaN(parseInt(req.query.after, 10))) {
    res.status(400).send('Required after parameter not specified or invalid')
    return
  }
  if (!req.query.limit || isNaN(parseInt(req.query.limit, 10))) {
    res.status(400).send('Required limit parameter not specified or invalid')
    return
  }
  after = parseInt(req.query.after, 10)
  limit = parseInt(req.query.limit, 10)

  // Build mongo query based on whether or not searchterm is set
  let query
  let sortParams
  if (req.query.search_term) {
    query = {name: {$regex : '.*' + req.query.search_term + '.*'}}
    sortParams = {}
  } else {
    query = {rank: {$gt: after}}
    sortParams = {rank: 1}
  }

  Bot.find(query, (err, bots) => {
   if (err) {
     console.log(err)
     res.status(500).send('Internal error while retreiving bot information')
   } else {
     const resData = {bots: bots}
     res.json(resData)
   }
 }).sort(sortParams).limit(limit)
}

module.exports = botsController
