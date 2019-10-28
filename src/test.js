const ne_scraper = require('./services/newegg-scraper')
const cc_scraper = require('./services/cancomp-scraper')
const bb_scraper = require('./services/bestbuy-scraper')



const testSearch = "27 inch monitor 2ms"

ne_scraper.scrape(testSearch, 15).then(data => {
    console.log('NEWEGG RESULTS')
    console.log(data)
});

cc_scraper.scrape(testSearch, 15).then(data => {
    console.log('\nCANADA COMPUTER RESULTS')
    console.log(data)
});

bb_scraper.scrape(testSearch, 15).then(data => {
    console.log('\nBEST BUY RESULTS')
    console.log(data)
})