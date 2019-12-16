
const CCScraper = require('../services/cancomp-scraper')
const NEScraper = require('../services/newegg-scraper')

module.exports = async (type, item, num_items) => {

    let numResults = num_items || 3

    switch (type) {
        case ('OPC'):
            return await []
        case ('CC'):
            return await CCScraper.scrape(item, numResults)
        case ('NE'):
            return await NEScraper.scrape(item, numResults)
        default:
            return await false
    }

}