'use strict'
const config = {
  // Address of the MongoDB server
  dbAddress: 'localhost',

  // Database name in mongo
  dbName: 'botmansachs',

  // Port on which the trading API listens
  tradingApiPort: 8080,

  // Port on which the frontend API listens
  frontendApiPort: 8081,

  // Base URL for the Blackrock Aladdin API
  blackrockApiBaseUrl: 'https://www.blackrock.com/tools/hackathon'
}

module.exports = config
