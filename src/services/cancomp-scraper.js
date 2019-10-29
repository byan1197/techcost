const osmosis = require('osmosis')
const _ = require('lodash')
const UrlUtils = require('../util/url-util');

const CCScraper = {};

CCScraper.scrape = (item, limit) => {

    return new Promise((resolve, reject) => {
        const url = 'https://www.canadacomputers.com/search/results_details.php?language=en&keywords=' + UrlUtils.replaceSpaces(item);
        let resultLimit = limit || 10;
        let results = [];
        osmosis
            .get(url)
            .find('#results > #product-list > .toggleBox > .productTemplate ')
            .set({
                price: '.productInfoSearch > span > strong',
                name: '.productTemplate_title a',
                link: '.productTemplate_title a@href',
                // web_id: '.item-compare-box > .form-checkbox > input @neg-itemnumber'
            })
            .log(console.log)
            .data(result => results.push(result))
            .done(() => {
                console.log('results', results)
                results = _.chain(results).filter(obj => Object.keys(obj).length > 0).uniqBy(result => result.name)
                    .map(result => {
                        return {
                            ...result,
                            price: Number(result.price.replace(/[^0-9.-]+/g, ""))
                        }
                    })
                    .filter(res => Object.keys(res).length > 0)
                    .value()
                    .splice(0, limit)
                    
                resolve(results)
            })
    })

}


module.exports = CCScraper;