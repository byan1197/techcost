
const BBScraper = require('../services/newegg-scraper')
const CCScraper = require('../services/cancomp-scraper')
const NEScraper = require('../services/bestbuy-scraper')

module.exports = (type, item) => {

    let result = null;

    switch (type) {
        case ('BESTBUY'):
            result = BBScraper.scrape(item, 10)
            break
        case ('CANADACOMP'):
            result = CCScraper.scrape(item, 10)
            break
        case ('NEWEGG'):
            result = NEScraper.scrape(item, 10)
            break
        default:
            result = false
    }

    return result
}