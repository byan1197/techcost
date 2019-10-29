const bcrypt = require('bcrypt')
const User = require('../models/User')
const db = require('./db-executor')
const mongoose = require('mongoose')
const MONGO_URL = 'mongodb+srv://bond:PASSWORDHERE@cluster0-1ed4o.mongodb.net/test?retryWrites=true&w=majority'

module.exports.saveScrapedData = (result, user_id) => {
    // db.exec()
}

module.exports.createUser = async userData => {

    let isUsernameAvailable = await db
        .exec(MONGO_URL,
            () => User.find({ username: userData.username })
                .then(users => users.length === 0))

    let userSaveResult = false;

    if (isUsernameAvailable) {

        let encryptedPassword = await bcrypt.hash(userData.password, 10)

        let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: userData.username,
            password: encryptedPassword
        })

        return db
            .exec(MONGO_URL,
                () => newUser.save()
                .then(user => user._id))
    }

}
