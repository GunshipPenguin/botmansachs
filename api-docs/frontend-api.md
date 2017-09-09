# Botman Sachs API Reference

## Summary

| Method | Endpoint     | Authed    | Description                                                                        |
|--------|--------------|-----------|------------------------------------------------------------------------------------|
| GET    | /bots        | No        | Get all bots participating in the current season and info associated with each one |
| GET    | /bots/{name} | No        | Get in depth financial data for a specific bot                                     |
| GET    | /season      | No        | Get information relating to the current season                                     |
| PATCH  | /mybot       | Yes       | Upload a new bot                                                                   |
| GET    | /mybot       | Yes       | Upload a new bot                                                                   |
| POST   | /login       | No        | Login                                                                              |
| POST   | /register    | No        | Register                                                                           |

## GET /bots
Get all bots in the current season

Parameters:

| Name        | Type   | Description                                                             |
|-------------|--------|-------------------------------------------------------------------------|
| before      | number | Return all bots before this rank                                        |
| after       | number | Return all bots after this rank                                         |
| limit       | number | Number of bots to return                                                |
| searchterm  | string | Search term to match bot names on, if omitted all bots will be returned |

Response:

| Name                 | Type    | Description                                                                        |
|----------------------|---------|------------------------------------------------------------------------------------|
| bots                 | array   | All bots participating in the current season and info associated with each one     |
| bots[i].name         | string  | Bot name                                                                           |
| bots[i].rank         | number  | Get in depth financial data for a specific bot                                     |
| bots[i].holdings     | number  | Holdings of current bot (stocks + cash ) in USD                                    |

Example request:
```
GET https://botmansachs.com/bots
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

## GET /bots/{name}
Get information about a specific bot

Response:

| Name                 | Type    | Description                                                                        |
|----------------------|---------|------------------------------------------------------------------------------------|
| rank                 | array   | All bots participating in the current season and info associated with each one     |
| name                 | string  | Bot name                                                                           |
| holdings             | number  | Get in depth financial data for a specific bot                                     |
| cash                 | number  | Holdings of current bot (stocks + cash ) in USD                                    |
| history              | array   | Array containing historical holdings of this bot                                   |
| history[i].timestamp | number  | Unix time stamp in seconds                                                         |
| history[i].holdings  | number  | Holdings of bot at the given timestamp                                             |
| stocks               | array   | Array containing information on all of the bot's stock holdings                    |
| stocks[i].symbol     | string  | Stock symbol                                                                       |
| stocks[i].name       | string  | Stock name                                                                         |
| stocks[i].shares     | number  | Number of shares of this stock held by this bot                                    |


Example request:
```
GET https://botmansachs.com/bots/pennbot
```

Example response:
```
{
  "rank": 2,
  "name": "pennbot",
  "holdings": 15212,
  "cash": "212",
  "history": [
    { "timestamp": 1234453235, "holdings": 12000 },
    { "timestamp": 1234453245, "holdings": 11000 },
    { "timestamp": 1234453255, "holdings": 11500 },
    { "timestamp": 1234453265, "holdings": 11829 },
    { "timestamp": 1234453275, "holdings": 13022 }
  ],
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

## GET /season
Gets information about the current season

Response:

| Name  | Type   | Description                                              |
|-------|--------|----------------------------------------------------------|
| start | number | Unix time stamp (in seconds) of the start of this season |
| end   | number | Unix time stamp (in seconds) of the end of this season   |

Example Request:
```
GET https://botmansachs.com/bots/season
```

Example Response:
```
{
  "start": 1504934098,
  "end": 1504932098
}
```
## PATCH /mybot
Update the current authed user's bot source.

Response:

| Name   | Type   | Description                                              |
|--------|--------|----------------------------------------------------------|
| source | string | Source code of the new bot                               |

Example request:
```
{
  "source": "import ...\n...\n...somecode\n"
}
```

## GET /mybot
Get the current authed user's bot source.

Response:

| Name   | Type   | Description                                              |
|--------|--------|----------------------------------------------------------|
| source | string | Source code of the user's current bot                    |

Example request:
```
GET https://botmansachs.com/mybot
```

Example response:
```
{
  "source": "import ...\n...\n...somecode\n",
}
```

## POST /login
Login to Botman Sachs.

Response:

| Name     | Type   | Description   |
|----------|--------|---------------|
| username | string | Username      |
| password | string | Password      |

Example request:
```
{
  "username": "someuser",
  "password": "somepassword"
}
```

## POST /register
Register for Botman Sachs.

Response:

| Name     | Type   | Description                                              |
|----------|--------|----------------------------------------------------------|
| username | string | Requested username                                       |
| password | string | Requested password                                       |


Example request:
```
{
  "username": "someuser",
  "password": "somepassword"
}
```
