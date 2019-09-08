const osmosis = require('osmosis')
const _ = require('lodash')
const UrlUtils = require('../util/url-util');

const Scraper = {};

Scraper.scrape = (item, limit) => {

    return new Promise((resolve, reject) => {
        const url = 'https://www.newegg.ca/p/pl?d=' + UrlUtils.replaceSpaces(item);
        let resultLimit = limit || 10;
        let results = [];
        osmosis
            .get(url)
            .find(".items-view .item-container .price-current")
            .set({ dollars: "strong", cents: "sup" })
            .find('.items-view .item-container .item-info')
            .set({
                itemName: 'a.item-title',
                itemLink: 'a.item-title @href'
            })
            .data(i => {
                if (resultLimit-- <= 0)
                    resolve(results);
                results.push(i)
                results = _.uniqBy(results, result => result.itemName.substring(0, 50))
            })
            .done(() => {
                resolve(results)
            })
    })

}


module.exports = Scraper;