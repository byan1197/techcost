const ScrapeResults = require('@bonyaa/techcost-commons/models/ScrapeResult')
const CronRequest = require('@bonyaa/techcost-commons/models/CronRequest')
const db = require('@bonyaa/techcost-commons/services/db-executor')
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

module.exports.saveScrapedData = (resultsArr, user_id, type) => {

    let bulkDocs = resultsArr
        .filter(res => res.name && res.price).map(res => {
            return new ScrapeResults({
                _id: new mongoose.Types.ObjectId(),
                user: user_id,
                type: type,
                name: res.name,
                link: res.link,
                price: res.price
            })
        })

    console.log(bulkDocs)

    return db.exec(
        MONGO_URL,
        () => ScrapeResults.insertMany(bulkDocs)
            .then(res => {
                console.log('res', res)
                return res;
            })
            .catch(e => {
                console.error(e)
                return false;
            }))

}


module.exports.createCronRequest = (body, user_id) => {
    let cronRequest = new CronRequest({ ...body, user: user_id })

    return db.exec(MONGO_URL, () => cronRequest.save())
        .catch(e => {
            console.error(e)
            throw new Error({
                message: "Could not create cron request"
            })
        })
}

module.exports.updateCronRequest = (body, user_id) => {
    let cronRequest = new CronRequest({ ...body, user: user_id });

    return db.exec(MONGO_URL, () => cronRequest.save())
        .then(d => d)
        .catch(e => {
            console.error(e)
            throw new Error({
                message: "Could not create cron request"
            })
        })
}

module.exports.getScrapeResultsByUser = async userid => {
    return db.exec(MONGO_URL, () => ScrapeResults.find({ user: userid }).sort({ createdAt: 'asc' })).catch(e => {
        console.error(e)
        return false;
    })
}

module.exports.checkFields = db.check;