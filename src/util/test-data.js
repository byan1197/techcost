const ScrapeResults = require('../models/ScrapeResult')
const CronRequest = require('../models/CronRequest')
const User = require('../models/User')
const db = require('../services/db-executor')
const moment = require('moment')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

const createFakeUser = async () => {
    let hashedPass = await bcrypt.hash('password', 10)
    let fakeUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: 'bondtest',
        password: hashedPass
    });

    let userResult = await db.exec(MONGO_URL,
        () => fakeUser.save().catch(e => {
            console.error(e)
            return null
        })
    )

    return userResult
}

const createCronRequest = async userid => {

    let cronReqArr = [
        new CronRequest({
            _id: new mongoose.Types.ObjectId(),
            item: 'BenQ 27" GW2780 FHD LED Monitor',
            user: userid,
            type: 'NE'
        }),
        new CronRequest({
            _id: new mongoose.Types.ObjectId(),
            item: 'BenQ GW2780 27" Full HD 1920x1080 5ms 60Hz VGA HDMI DisplayPort Built-in Speakers Low Blue Light Flicker-Free Backlit LED IPS Monitor',
            user: userid,
            type: 'CC'
        })
    ]

    return await db.exec(MONGO_URL,
        () => CronRequest.collection.insertMany(cronReqArr)
    ).catch(e => { console.error(e); return false })
}


const create60Results = async userid => {
    let startOfResults = moment().startOf('day').subtract(60, 'days')
    let scrapeResArr = []
    while (startOfResults.isBefore(moment().subtract(10, 'days'))) {
        scrapeResArr.push(new ScrapeResults({
            _id: new mongoose.Types.ObjectId(),
            createdAt: startOfResults.toDate(),
            user: userid,
            type: 'CC',
            name: 'BenQ GW2780 27" Full HD 1920x1080 5ms 60Hz VGA HDMI DisplayPort Built-in Speakers Low Blue Light Flicker-Free Backlit LED IPS Monitor',
            link: 'https://www.newegg.ca/benq-gw2780-27-full-hd/p/1DH-007Y-00003?Description=benq%20GW2780&cm_re=benq_GW2780-_-1DH-007Y-00003-_-Product',
            price: 249.99
        }))
        scrapeResArr.push(new ScrapeResults({
            _id: new mongoose.Types.ObjectId(),
            createdAt: startOfResults.toDate(),
            user: userid,
            type: 'NE',
            name: 'BenQ 27" GW2780 FHD LED Monitor',
            link: 'https://www.canadacomputers.com/product_info.php?cPath=22_700_1104&item_id=121404&sid=rm33q9q7b1ukvcn6pnoopf0mh7',
            price: 249.99

        }))
        startOfResults.add(1, 'day')
    }
    while (startOfResults.isBefore(moment())) {
        scrapeResArr.push(new ScrapeResults({
            _id: new mongoose.Types.ObjectId(),
            user: userid,
            createdAt: startOfResults.toDate(),
            type: 'CC',
            name: 'BenQ GW2780 27" Full HD 1920x1080 5ms 60Hz VGA HDMI DisplayPort Built-in Speakers Low Blue Light Flicker-Free Backlit LED IPS Monitor',
            link: 'https://www.newegg.ca/benq-gw2780-27-full-hd/p/1DH-007Y-00003?Description=benq%20GW2780&cm_re=benq_GW2780-_-1DH-007Y-00003-_-Product',
            price: 216.99
        }))
        scrapeResArr.push(new ScrapeResults({
            _id: new mongoose.Types.ObjectId(),
            user: userid,
            createdAt: startOfResults.toDate(),
            type: 'NE',
            name: 'BenQ 27" GW2780 FHD LED Monitor',
            link: 'https://www.canadacomputers.com/product_info.php?cPath=22_700_1104&item_id=121404&sid=rm33q9q7b1ukvcn6pnoopf0mh7',
            price: 229.99

        }))
        startOfResults.add(1, 'day')
    }

    return db.exec(MONGO_URL,
        () => ScrapeResults.collection.insertMany(scrapeResArr).catch(e => { console.error(e); return false })
    )
}

const seed = async () => {
    const user = await createFakeUser();

    if (!user) {
        console.log('Could not create user')
        return;
    }
    console.log('Created fake user')

    const cronRequestResult = await createCronRequest(user._id);

    if (!cronRequestResult) {
        console.log('Could not create cron request')
        return;
    }

    console.log('Created cron request')

    const scrapeResResults = await create60Results(user._id);

    if (!scrapeResResults) {
        console.log('Could create scrape results')
        return;
    }

    console.log('Created cron request')
    console.log('Successfully created some test data')
}

seed();