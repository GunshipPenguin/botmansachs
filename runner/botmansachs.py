#!/usr/bin/python3
import requests
from urllib.parse import quote, urlencode

__bot_name = False
def register_bot(x):
  '''(str) -> None
  Register the bot so that it can be identified by the server.
  Should only be called once. Any subsequent calls have no effect.
  '''
  global __bot_name
  if (__bot_name == False):
    __bot_name = x


def query_blackrock_api(api_name, query):
    '''(str, str) -> JSON string
    Query a Blackrock API for financial information. Blocks until the request is
    complete.
    '''
    r = requests.get("http://api:8081/blackrock?bot=" + __bot_name + "&api_name=" +
        api_name + "&query_string=" + quote(urlencode(query)))
    return r.text


def query_news_api(search_term):
    r = requests.get("http://api:8081/news?bot=" + __bot_name + "search_term=" +
        quote(search_term))

