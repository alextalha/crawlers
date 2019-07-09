"use strict"

var request = require('request')
var cheerio = require('cheerio')
var find = require('cheerio-eq');

class Crawlers {

    contructor(){

    }

    getLinks(url, selector){
        
        //request('http://www.electrolux.com.co', (error,response,html) => {

        request(url, (error,response,html) => {
    
            if(!error && response.statusCode == 200 ){

                const $ = cheerio.load(html)

                //let links = find($,'.site-links .col:eq(0) ul li')
                let links = find($,selector)
                let json = []
                let second_level = ""
                links.each( async (i,elem) => {
                    
                    console.log('nível 1 :' + $(elem).find('a').attr('href'))
                   
                    var second_level =  await this.getLinksSecondLevel(url + $(elem).find('a').attr('href'),'.productMenu')
                    console.log('second_level',second_level)
                  
                })

            }else{
            }

        })
    }

    getLinksSecondLevel(url,selector){
         
        request(url, (error,response,html) => {
    
            if(!error && response.statusCode == 200 ){

                let $ = cheerio.load(html)

                //let links = find($,'.site-links .col:eq(0) ul li')
                let links = find($,selector)
                
                let json = []
                links.each( async (i,elem) => { 
                    json.push($(elem).find('a').attr('href'))
                  
                })
                    console.log('json',json)
                return json

            }else{
            }

        })
    }
}


module.exports = Crawlers