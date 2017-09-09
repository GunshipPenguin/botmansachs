'use strict'
const request = require('request')
const config = require('../../../config')

const blackrockController = function (req, res) {
  if (!req.query.api || !req.query.query_string) {
    res.status(400).send('Missing required API and/or query_string parameters')
    return
  }

  const requestUrl = config.blackrockApiBaseUrl + '/' + req.query.api + '?' + req.query.query_string
  console.log(requestUrl)

  request(requestUrl, (error, response, body) => {
    if (error) {
      res.status(500).send('Error while trying to access the Blackrock API')
      return
    }
    res.json(body)
  })
}

module.exports = blackrockController
