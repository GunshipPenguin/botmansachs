# Botman Sachs Trading API

- Tiny wrapper around the Blackrock and NewsAPI.org APIs
- Actual calls to the HTTP API are made from the Botman Sachs Python module which bots must import

## Summary

| Method | Endpoint     | Description                                           |
|--------|--------------|-------------------------------------------------------|
| GET    | /blackrock   | Query the Blackrock Aladdin API                       |
| GET    | /news        | Query the News Api                                    |

# GET /blackrock
Query the Blackrock Aladdin API for financial information

Parameters:

| Name         | Type   | Description                                                                                     |
|--------------|--------|-------------------------------------------------------------------------------------------------|
| api          | string | Blackrock api to query (performance_data, portfolio_analysis, search_securities, security_data) |
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

# GET /news
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
