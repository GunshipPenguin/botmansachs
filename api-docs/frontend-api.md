# Botman Sachs API Reference

## Summary

| Method | Endpoint     | Authed    | Description                                                                        |
|--------|--------------|-----------|------------------------------------------------------------------------------------|
| GET    | /allbots     | No        | Get all bots participating in the current season and info associated with each one |
| GET    | /bot/{name}  | No        | Get in depth financial data for a specific bot                                     |
| POST   | /uploadbot   | Yes       | Upload a new bot                                                                   |
| POST   | /login       | No        | Login                                                                              |
| POST   | /register    | No        | Register                                                                           |

## GET /allbots
Get all bots in the current season

Response:

| Name        | Type    | Description                                                                        |
|-------------|---------|------------------------------------------------------------------------------------|
| bots        | array   | Get all bots participating in the current season and info associated with each one |
| rank        | number  | Get in depth financial data for a specific bot                                     |
| holdings    | number  | Holdings of current bot (stocks + cash ) in USD                                    |

Example request:
```
GET https://botmansachs.com/allbots
```

Example response:
```
{
  "bots": [
    {
      "name": "pennbot",
      "rank": 1,
      "holdings": 15212
    },
    {
      "name": "traderbot6",
      "rank": 2,
      "holdings": 12444
    },
    {
      "name": "asdfbot",
      "rank": 3,
      "holdings": 2222
    }
  ]

}
```

## GET /bot/<name>
Get information about a specific bot

Example request:
```
GET https://botmansachs.com/bot/pennbot
```

Example response:
```
{
  "rank": 2,
  "name": "pennbot",
  "holdings": 15212,
  "cash": "212",
  "stocks": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "shares": 200
    },
    {
      "symbol": "MSFT",
      "name": "Microsoft Corporation",
      "shares": 125
    }
  ]
}
```

## POST /uploadbot
Upload new bot (auth required)

## POST /login
Login

## POST /register
Register
