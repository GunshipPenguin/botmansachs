'use strict'
const parseString = require('xml2js').parseString
const request = require('request')

const baseUrl = 'http://finance.yahoo.com/rss/headline?s='

const newsController = function (req, res) {
  if (!req.query.symbol) {
    res.status(400).json({error: 'no stock symbol specified'})
    return
  }
  const url = baseUrl + req.query.symbol

  request(url, (err, response, body) => {
    if (err) {
      res.status(500).json({error: 'internal server error while fetching stock news'})
      return
    }

    parseString(body, function (err, result) {
      if (err) {
        res.status(500).json({error: 'Error while parsing XML'})
        return
      }
      res.status(200).json(result)
    })
  })
}

module.exports = newsController
