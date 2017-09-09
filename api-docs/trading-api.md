# Botman Sachs Trading API

- Tiny wrapper around the Blackrock and NewsAPI.org APIs
- Actual calls to the HTTP API are made from the Botman Sachs Python module which bots must import

## Summary

| Method | Endpoint     | Description                                           |
|--------|--------------|-------------------------------------------------------|
| GET    | /blackrock   | Query the Blackrock Aladdin API                       |
| GET    | /news        | Query the News Api                                    |
| GET    | /buy         | Buy a stock/security                                  |
| GET    | /sell        | Sell a stock/security                                 |
| PATCH  | /persist     | Store data persistently                               |
| GET    | /persist     | Get persistentely stored data                         |

## GET /blackrock
Query the Blackrock Aladdin API for financial information

Parameters:

| Name         | Type   | Description                                                                                     |
|--------------|--------|-------------------------------------------------------------------------------------------------|
| api          | string | Blackrock api to query (performance-data, portfolio-analysis, search-securities, security-data) |
| query_string | string | String to query the selected Blackrock API with                                                 |

Response: Same as Blackrock API.

Example request:

```
GET https://botmansachs.com/trading_api/blackrock?api=security_data&query=identifiers%3DMSFT%257CAAPL
```

Example response:

```
{

    @type :  "ToolsResultBeans",
    allDataReturned :  true,
    bmsRequestTime :  298,
    debugData : {
        missing : [
             {
                identifier :  "MSFT|AAPL",
                identifierType :  "ALADDIN_TICKER"
            }
        ]
    },
    requestId :  "DTTS-time-20170909_06-35-43_515_env-BLKDMZ_hkey-bzbw03_count-4658",
    requestTime :  84,
    requests : [
         {
            @type :  "_bws.request.SecurityDataRequest",
            collapseField :  "securityId",
            collapseFieldMax :  "asOfDate",
            collection :  "PORT_BUILDER

  ... + >2 KB of information on MSFT and AAPL
```

## GET /news
Query the News API for news related to a search keyword

Parameters:

| Name         | Type   | Description                                                                                     |
|--------------|--------|-------------------------------------------------------------------------------------------------|
| search_term  | string | Term to search for news from                                                                    |

Response: Same as News API.

Example request:

```
GET https://botmansachs.com/trading_api/news?search_term=Microsoft
```

Example response:

```
{
  "articles": [
    {
      "author": "Some tech reporter",
      "title": "Microsoft does something important",
      "description": "Microsoft did something really important today that will probably impact its stock price",
      "url": "https://cnn.com/somearticle",
      "urlToImage": "https://cnn.com/someimage.png",
      "publishedAt": "2017-09-09T08:00:26Z"
    }
  ]
```

## GET /buy
Buy a stock or security.

Parameters:

| Name         | Type   | Description                                                   |
|--------------|--------|---------------------------------------------------------------|
| bot_name     | string | Name of bot to buy for                                        |
| symbol       | string | Symbol of stock to buy                                        |
| quantity     | number | Quantity to buy                                               |

Example request:

```
GET https://botmansachs.com/trading_api/buy?symbol=AAPL&quantity=20
```

## GET /sell
Sell a stock or security.

Parameters:

| Name         | Type   | Description                                                   |
|--------------|--------|---------------------------------------------------------------|
| bot_name     | string | Name of bot to buy for                                        |
| symbol       | string | Symbol of stock to sell                                       |
| quantity     | number | Quantity to buy                                               |

Example request:

```
GET https://botmansachs.com/trading_api/sell?symbol=AAPL&quantity=20
```

## PATCH /persist
Store data persistently.

Parameters:

| Name         | Type   | Description                                                   |
|--------------|--------|---------------------------------------------------------------|
| bot_name     | string | Name of bot to buy for                                        |

Example request:

```
PATCH https://botmansachs.com/trading_api/persist
```

## GET /persist

Parameters:

| Name         | Type   | Description                                                   |
|--------------|--------|---------------------------------------------------------------|
| bot_name     | string | Name of bot to buy for                                        |

Example request:

```
GET https://botmansachs.com/trading_api/persist
```
