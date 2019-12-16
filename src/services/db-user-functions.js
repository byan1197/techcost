const bcrypt = require('bcrypt')
const User = require('@bonyaa/techcost-commons/models/User')
const db = require('@bonyaa/techcost-commons/services/db-executor')
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL


module.exports.createUser = async userData => {

    let isUsernameAvailable = await db
        .exec(MONGO_URL,
            () => User.find({ username: userData.username })
                .then(users => users.length === 0))

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

module.exports.findUserByUsername = async username => {
    let user = await db.exec(MONGO_URL, () => User.find({ username: username }))
        .catch(e => {
            console.error(e)
            return []
        })

    return user[0] || false
}

module.exports.checkFields = db.check;