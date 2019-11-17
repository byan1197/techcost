const bcrypt = require('bcrypt')
const User = require('../models/User')
const db = require('./db-executor')
const mongoose = require('mongoose')
const MONGO_URL = 'mongodb+srv://bond:PASSWORDHERE@cluster0-1ed4o.mongodb.net/test?retryWrites=true&w=majority'


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

module.exports.login = async loginInfo => {

    let user = await db.exec(dbUrl, () => User.find({ username: loginInfo.username }));
    if (user.length !== 1)
        return status.createErrorResponse(401, 'Authentication Failed')
    else {
        try {
            let bycryptResult = await bcrypt.compare(loginInfo.password, user[0].password);
            if (!bycryptResult)
                return status.createErrorResponse(401, 'Authentication Failed');
            const token = jwt.sign({
                userId: user[0]._id
            },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            );
            return { ...user, token: token }
        } catch (err) {
            console.error(err)
            throw new Error({ message: "Could not login" })
        }
    }

}

module.exports.checkFields = db.check;