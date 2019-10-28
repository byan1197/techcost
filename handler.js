'use strict';
import { response } from './src/util/response'
import BBScraper from './src/services/bestbuy-scraper'
import CCScraper from './src/services/cancomp-scraper'
import NEScraper from './src/services/newegg-scraper'

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
}

module.exports.scrapeAndSaveBestBuy = async event => {
  if (!event.body.item)
    return response.createErrorResponse(404, 'Item not supplied')

  if (!event.pathP.user)
    return response.createErrorResponse(404, 'User not specified')

  if (!event.body.scrape_type) return response.createErrorResponse(404, 'Site to scrape not specified')
  
  switch(event.body.scrape_type) {
    case ('BestBuy'):
      BBScraper.scrape(event.body.item, )
  }

}


