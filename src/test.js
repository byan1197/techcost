const scraper = require('./services/newegg-scraper')
scraper.scrape("akg 240", 15).then(data => {
    console.log(data)
    console.log(data.length)
});