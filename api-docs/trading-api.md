# Botman Sachs Trading API

- Wrapper around the Blackrock and Yahoo Finance APIs
-
- Actual calls to the HTTP API are made from the Botman Sachs Python module which bots must import

## Summary

| Method | Endpoint     | Description                                           |
|--------|--------------|-------------------------------------------------------|
| GET    | /blackrock   | Query the Blackrock Aladdin API                       |
| GET    | /news        | Query the News Api                                    |
| GET    | /buy         | Buy a stock/security                                  |
| GET    | /sell        | Sell a stock/security                                 |
| PATCH  | /persist     | Store data persistently                               |
| GET    | /persist     | Get persistently stored data                         |

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
Query the Yahoo finance API for news related to a particular stock

Parameters:

| Name         | Type   | Description                                                                                     |
|--------------|--------|-------------------------------------------------------------------------------------------------|
| quote        | string | Stock quote to get news for                                                                    |

Response: Same as Yahoo Finance API

Example request:

```
GET https://botmansachs.com/trading_api/news?symbol=tsla
```

Example response:

```
{
  "rss": {
    "$": {
      "version": "2.0"
    },
    "channel": [
      {
        "copyright": [
          "Copyright (c) 2017 Yahoo! Inc. All rights reserved."
        ],
        "description": [
          "Latest Financial News for tsla"
        ],
        "image": [
          {
            "height": [
              "45"
            ],
            "link": [
              "http:\/\/finance.yahoo.com\/q\/h?s=tsla"
            ],
            "title": [
              "Yahoo! Finance: tsla News"
            ],
            "url": [
              "http:\/\/l.yimg.com\/a\/i\/brand\/purplelogo\/uh\/us\/fin.gif"
            ],
            "width": [
              "144"
            ]
          }
        ],
        "item": [
          {
            "description": [
              "The electric-car specialist has resisted pressure to do a stock split so far, but its stock price keeps rising."
            ],
            "guid": [
              {
                "$": {
                  "isPermaLink": "false"
                },
                "_": "d50a7a73-5a75-3f8c-b645-05127bfbb54d"
              }
            ],
            "link": [
              "http:\/\/finance.yahoo.com\/r\/d50a7a73-5a75-3f8c-b645-05127bfbb54d\/will-tesla-finally-split-its-stock.aspx?yptr=yahoo&.tsrc=rss"
            ],
            "pubDate": [
              "Sat, 09 Sep 2017 14:34:00 +0000"
            ],
            "title": [
              "Will Tesla Finally Split Its Stock?"
            ]
          },
          {
            "description": [
              "The company&apos;s solar energy ambitions are huge, and despite the hype, they may be a big risk for it."
            ],
            "guid": [
              {
                "$": {
                  "isPermaLink": "false"
                },
                "_": "efc68b39-fed7-3dae-a01d-5970379c2abc"
              }
            ],
            "link": [
              "http:\/\/finance.yahoo.com\/r\/efc68b39-fed7-3dae-a01d-5970379c2abc\/tesla-takes-aim-at-the-worlds-biggest-solar-manufa.aspx?yptr=yahoo&.tsrc=rss"
            ],
            "pubDate": [
              "Sat, 09 Sep 2017 12:15:00 +0000"
            ],
            "title": [
              "Tesla Takes Aim at the World&apos;s Biggest Solar Manufacturers"
            ]
          },
... More news articles on TSLA

```

## GET /stockquote/{stock}
Fetch the current price of a stock by symbol in USD.

Parameters:

| Name         | Type   | Description                                                                                     |
|--------------|--------|-------------------------------------------------------------------------------------------------|
| symbol       | string | Term to search for news from                                                                    |

Example Request:
```
GET https://botmansachs.com/trading_api/stockquote/aapl
```

Example Response:
```
{
  "price": 993.23
}
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
| bot_name     | string | Name of bot to store data for                                 |
| data         | string | Data to store                                                 |

Example request:

```
PATCH https://botmansachs.com/trading_api/persist
```

## GET /persist

Parameters:

| Name         | Type   | Description                                                   |
|--------------|--------|---------------------------------------------------------------|
| bot_name     | string | Name of bot to buy for                                        |

Response:

| Name         | Type   | Description                                                   |
|--------------|--------|---------------------------------------------------------------|
| data         | string | Stored persist data                                           |

Example request:

```
GET https://botmansachs.com/trading_api/persist
```

Example response:

```
{
  "data": "(lp0\nI1\naI2\naI3\na."
}
```
