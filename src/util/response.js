module.exports.createErrorResponse = (code, message) => {
    return {
        statusCode: code,
        message: message || 'An unkonwn error has occurred'
    }
}
module.exports.createSuccessResponse = (code, message, body) => {

    let successBody = typeof (body) === 'object' ? body : {}

    return {
        statusCode: code,
        message: message || 'Success',
        body: JSON.stringify(successBody)
    }
}