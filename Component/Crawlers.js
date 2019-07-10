"use strict"

var request = require('request')
var cheerio = require('cheerio')
var find = require('cheerio-eq');
require('dotenv').config();

class Crawlers {

    contructor(){

    }

    getLinks(url, selector){

        request(url, (error,response,html) => {
    
            if(!error && response.statusCode == 200 ){

                const $ = cheerio.load(html)
                //let links = find($,'.site-links .col:eq(0) ul li')
                let links = find($,selector)
                let elements = []
                links.each( (i,elem) => {
                    elements.push($(elem).attr('href'))
                })

               let getLinksProducts = this.getLinksProducts(elements,'.product a.readmore')

            }else{
            }

        })
    }
    

    async getLinksProducts(elements,selector){

        var productsLinks = []
        for( let url of elements){
                //console.log(`${process.env.ENDPOINT}${url}`)
          request(`${process.env.ENDPOINT}${url}`, (error,response,html) => {

                if(!error && response.statusCode == 200 ){

                    const $ = cheerio.load(html)
                    let sel = find($,selector)
                    sel.each( (i,el) => {
                    productsLinks.push($(el).attr('href'))
                    
                    })
                    
                }
            })

            console.log('teste',productsLinks)
        }

        console.log(productsLinks)
        
        return  productsLinks;
    }



}


module.exports = Crawlers