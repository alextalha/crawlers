

const Crawlers = require('./Component/Crawlers')
require('dotenv').config();


let crawler = new Crawlers();

let url = `${process.env.ENDPOINT}/Productos`
crawler.getLinks(url,'.categories a')


