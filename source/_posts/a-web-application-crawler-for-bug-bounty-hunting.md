---
title: A web application crawler for bug bounty hunting
subtitle: A Python-based web crawler that enables you to execute your payload against all requests in scope
description: Not Your Average Web Crawler is a Python module that crawls all kinds of web applications for requests instead of URLs. It enables you to execute your payload on all requests of a web application.
date: 2017-04-28 22:22:20
---

N.Y.A.W.C ({% customlink "https://github.com/tijme/not-your-average-web-crawler" %}) is a very useful web application crawler for vulnerability scanning. It crawls every GET and POST request in the specified scope and keeps track of the request and response data. I developed N.Y.A.W.C because I needed a good open-source Python crawler that enabled me to modify requests on the go for my AngularJS CSTI scanner ({% customlink "https://github.com/tijme/angularjs-csti-scanner" %}).

### Crawling Flow

The crawler is multi-threaded but you don't have to worry about any of the multi threading yourself. To give you a better idea of the crawling flow I added the diagram below.

1. You can define your startpoint (a request) and the crawling scope and then start the crawler.
2. The crawler repeatedly starts the first request in the queue until `max threads` is reached.
3. The crawler adds all requests found in the response to the end of the queue (except duplicates).
4. The crawler goes back to step #2 to spawn new requests repeatedly until `max threads` is reached.

**Please note that if the queue is empty and all crawler threads are finished, the crawler will stop.**

{% customimage "full-width" "nyawc-flow.svg" "Not Your Average Web Crawler Flow" %}

There are several hooks in the code that you can use to, for example, tamper form data before it is posted. Check the documentation ({% customlink "https://tijme.github.io/not-your-average-web-crawler/latest/options_callbacks.html" %}) for more information about those hooks.

### Installation

First make sure you're on Python 2.7/3.3 or higher. After that install N.Y.A.W.C via PyPi using the command below.
{% customcommand "pip install --upgrade nyawc" %}

The kitchen sink code sample below can be used to get the crawler up and running within a few minutes. If you like it, check out the documentation ({% customlink "https://tijme.github.io/not-your-average-web-crawler/" %}) to get started on implementing your own exploits.

{% highlightcodefromurl python https://raw.githubusercontent.com/tijme/not-your-average-web-crawler/master/example_extensive.py %}
