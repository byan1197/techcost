module.exports.createErrorResponse = (code, message) => {
    return {
        statusCode: code,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ error: message || 'An unkonwn error has occurred' })
    }
}
module.exports.createSuccessResponse = (code, message, body) => {

    let successBody = typeof (body) === 'object' ? body : {}
    
    return {
        statusCode: code,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(successBody)
    }
}