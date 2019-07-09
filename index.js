var request = require('request')
var cheerio = require('cheerio')
var find = require('cheerio-eq');

const Crawlers = require('./Component/Crawlers')


let crawler = new Crawlers();

crawler.getLinks('http://www.electrolux.com.co','.site-links .col:eq(0) ul li')


