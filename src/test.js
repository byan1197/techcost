const ne_scraper = require('./services/newegg-scraper')
const cc_scraper = require('./services/cancomp-scraper')



const testSearch = "nzxt h500 white"



ne_scraper.scrape(testSearch, 15).then(data => {
    console.log(data)
    console.log(data.length)
});

cc_scraper.scrape(testSearch, 15).then(data => {
    console.log(data)
    console.log(data.length)
});