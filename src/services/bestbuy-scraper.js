const osmosis = require('osmosis')
const _ = require('lodash')
const UrlUtils = require('../util/url-util');

const BBScraper = {};

BBScraper.scrape = (item, limit) => {

    return new Promise((resolve, reject) => {

        let url = 'https://www.bestbuy.ca/en-ca/search?search=' + UrlUtils.replaceSpaces(item)
        let resultLimit = limit || 10;
        let results = [];

        osmosis
            .get(url)
            .find('div[class*="productLine_"]')
            .set({
                price: 'div[class*="price_"] div[class*="medium_"]',
                name: 'div[class*="productItemName_"]',
                link: 'a[class*="link_"] @href',
            })
            .data(result => results.push(result))
            .done(() => {
                results = _.chain(results).filter(obj => Object.keys(obj).length > 0).uniqBy(result => result.name).map(result => {
                    return {
                        ...result,
                        price: Number(result.price.replace(/[^0-9.-]+/g, ""))
                    }
                }).value()
                resolve(results)
            })
    });
}

module.exports = BBScraper;