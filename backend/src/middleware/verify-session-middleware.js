'use strict'
var session = require('express-session')

function verifySessionMiddleware (req, res, next) {
  const user = req.session && req.session.user
  const endpoint = `${req.method} ${req.route.path}`
  if (
    // session does not exist
    !user ||
    // role does not exist
    !permissions[user.role] ||
    // role is not allowed to access endpoint
    !permissions[user.role].endpoints[endpoint]
  ) {
    res.status(401)
    res.json({
      message: 'Forbidden.'
    })
    return
  }

  return next(null)
}

module.exports = verifySessionMiddleware
