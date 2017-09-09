'use strict'
var session = require('express-session')

function verifySessionMiddleware (req, res, next) {
  const user = req.session && req.session.user
  if (!user) {
    res.status(401)
    res.json({
      message: 'Forbidden.'
    })
    return
  }

  return next(null)
}

module.exports = verifySessionMiddleware
