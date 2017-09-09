'use strict'

function corsMiddleware(req, res, next) {
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  res.append('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PATCH, DELETE')
  res.append('Access-Control-Allow-Credentials', 'true')
  next()
}

module.exports = corsMiddleware
