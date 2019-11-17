const db = require('./src/services/db-user-functions')
const Response = require('./src/util/response')

module.exports.createUser = async event => {
    if (!event.body.username)
        return Response.createErrorResponse(404, 'Item not supplied')

    if (!event.body.password)
        return Response.createErrorResponse(404, 'Item not supplied')
    let result = null
    try {
        result = await db.createUser(event.body)
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
    if (!event.body.username)
        return Response.createErrorResponse(404, 'Item not supplied')

    if (!event.body.password)
        return Response.createErrorResponse(404, 'Item not supplied')

    let result = null;
    try {
        result = db.login(event.body)
    }
    catch (e) {
        return Response.createErrorResponse(500, e.message)
    }

    console.log('User ' + result.username + ' logged in')
    return Response.createSuccessResponse(201, "Successfully logged in", { token: result.token })
}