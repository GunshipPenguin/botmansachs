'use strict'
const config = {
  // API Secret Key
  apiSecret: '135kjdlsu5ljlsak5jklw35jk',

  // Address of the MongoDB server
  dbAddress: 'mongodb',

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
