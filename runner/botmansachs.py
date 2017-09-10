#!/usr/bin/python3
import requests
import json
from urllib.parse import quote, urlencode

__API_URL = 'http://localhost:8080'


__bot_name = ''
def __register_bot__(bot_name):
  '''(str) -> None
  Register the bot so that it can be identified by the server.
  Should only be called once. Any subsequent calls have no effect.
  '''
  global __bot_name
  __bot_name = bot_name


def query_blackrock_api(api_name, query):
    '''(str, str) -> JSON string
    Query a Blackrock API for financial information. Blocks until the request is
    complete.
    '''
    r = requests.get(__API_URL + '/trading_api/blackrock?' +
    urlencode({
        'bot_name': __bot_name,
        'api': api_name,
        'query_string': quote(urlencode(query))
    }))
    return r.text


def query_yahoo_finance_api(symbol):
    '''(str, str) -> dictionary
    Query the yahoo finance API for information on a particular stock. Data returned
    is a dictionary of the form {price: int, name: str}. Blocks until the information
    is retrieved.
    '''
    r = requests.get(__API_URL + '/trading_api/stockquote/' + symbol + '?' +
    urlencode({
        'bot_name': __bot_name
    }))
    return r.text


def buy(symbol, quantity):
    '''(str, int) -> str
    Buy the specified quantity of the specified stock, will return an error message if you
    have insufficent funds or specify an invalid stock symbol. Blocks until the buy is complete.
    '''
    r = requests.get(__API_URL + '/trading_api/buy?' +
    urlencode({
        'bot_name': __bot_name,
        'symbol': symbol,
        'quantity': quantity
    }))
    return r.text


def sell(symbol, quantity):
    '''(str, int) -> NoneType
    Sell the specified quantity of the specified stock,  will return an error message if you
    don't have enough stock or specify an invalid stock symbol. Blocks until the sell is complete.
    '''
    r = requests.get(__API_URL + '/trading_api/sell?' +
    urlencode({
        'bot_name': __bot_name,
        'symbol': symbol,
        'quantity': quantity
    }))
