#!/usr/bin/python3
import requests
from urllib.parse import quote, urlencode

PROXY_SERVER = "localhost"


def query_blackrock_api(api_name, query):
    '''(str, str) -> JSON string
    Query a Blackrock API for financial information. Blocks until the request is
    complete.
    '''
    r = requests.get(PROXY_SERVER + "/blackrock?" + "api_name=" + api_name +
        "&query_string=" + quote(urlencode(query)))
    return r.text


def query_news_api(search_term):
    r = requests.get(PROXY_SERVER + "/news?search_term=" + quote(search_term))
