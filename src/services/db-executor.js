const mongoose = require('mongoose');
const Promise = require('bluebird')
mongoose.Promise = Promise;

function exec(dbUrl, fn) {
    return mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => fn())
        .then((res, err) => {
            mongoose.disconnect().then(() => console.log('Mongoose connections disconnected.'))
            return res;
        })
}

function checkFields(fieldsArr, MongooseObj) {
    let requiredFields = Object.keys(MongooseObj.schema.paths).filter(k => MongooseObj.schema.paths[k].isRequired)
    requiredFields.forEach(f => {
        if (!fieldsArr.includes(f))
            return false
    })
    return true;
}

module.exports = { exec, checkFields }