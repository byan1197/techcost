const osmosis = require('osmosis')
const _ = require('lodash')
const UrlUtils = require('../util/url-util');

const NEScraper = {};

NEScraper.scrape = (item, limit) => {

    return new Promise((resolve, reject) => {
        const url = 'https://www.newegg.ca/p/pl?d=' + UrlUtils.replaceSpaces(item);
        let resultLimit = limit || 10;
        let results = [];
        osmosis
            .get(url)
            .find(':not(.search-suggestions)>.items-view .item-container .item-info')
            .set({
                dollars: ".price-current > strong",
                cents: ".price-current > sup",
                name: 'a.item-title',
                link: 'a.item-title @href',
                web_id: '.item-compare-box > .form-checkbox > input @neg-itemnumber'
            })
            .log(console.log)
            .data(result => results.push(result))
            .done(() => {
                results = _.chain(results)
                    .map(res => {
                        return {
                            price: parseFloat(res.dollars + res.cents),
                            name: res.name,
                            link: res.link,
                            web_id: res.web_id
                        }
                    })
                    .value()
                resolve(results)
            })
    })

}


module.exports = NEScraper;