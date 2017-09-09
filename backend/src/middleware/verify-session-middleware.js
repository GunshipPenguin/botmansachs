'use strict'
var session = require('express-session')

function verifySessionMiddleware (req, res, next) {
  if (!req.session) {
    res.status(401)
    res.json({
      message: 'Forbidden.'
    })
    return
  }

  return next(null)
}

module.exports = verifySessionMiddleware
