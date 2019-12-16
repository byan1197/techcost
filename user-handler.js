const db = require('./src/services/db-user-functions')
const Response = require('@bonyaa/techcost-commons/common-util/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async event => {
    let body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body

    if (!body.username)
        return Response.createErrorResponse(404, 'Item not supplied')

    if (!body.password)
        return Response.createErrorResponse(404, 'Item not supplied')
    let result = null
    try {
        result = await db.createUser(body)
    }
    catch (e) {
        console.error(e)
        return Response.createErrorResponse(500, "Unknown error occurred")
    }

    return result ?
        Response.createSuccessResponse(201, "Successfully created user", result) :
        Response.createErrorResponse(500, 'Item not supplied')
}

module.exports.login = async event => {
    let user = null;
    let body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body

    if (!body.username)
        return Response.createErrorResponse(400, 'Username not supplied')

    if (!body.password)
        return Response.createErrorResponse(400, 'Password not supplied')

    try {
        user = await db.findUserByUsername(body.username)
        if (!user)
            return Response.createErrorResponse(401, 'Authentication Failed')
        else {
            let bycryptResult = await bcrypt.compare(body.password, user.password);

            if (!bycryptResult)
                return Response.createErrorResponse(401, 'Authentication Failed');

            const token = jwt.sign(
                {
                    uid: user._id,
                    username: user.username
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            console.log('User ' + user.username + ' logged in')
            return Response.createSuccessResponse(201, "Successfully logged in", { token: token })
        }
    }
    catch (e) {
        return Response.createErrorResponse(500, e.message)
    }

}