const scrapeFunctions = require('./src/util/scrape-functions')
const db = require('./src/services/db-functions')
const Response = require('./src/util/response')

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
}

module.exports.scrapeAndSave = async event => {
  if (!event.body.item_name)
    return Response.createErrorResponse(404, 'Item not supplied')

  if (!event.body.user_id)
    return Response.createErrorResponse(404, 'User not specified')

  if (!event.body.scrape_type)
    return Response.createErrorResponse(404, 'Site to scrape not specified')

  let scrapeResult = await scrapeFunctions(eavent.body.scrape_type, event.body.item_name)
  let saveResult = null

  if (!scrapeResult)
    return Response.createErrorResponse(500, "Could not gather data")
  else {
    saveResult = db.saveScrapedData(result, user_id)
  }


  if (!saveResult)
    return Response.createErrorResponse(500, "Could not gather data")
  else {
    return Response.createSuccessResponse(201, "Saved scraped data")
  }

}


module.exports.oneTimeScrape = async event => {
  if (!event.body.item_name)
    return Response.createErrorResponse(404, 'Item not supplied')

  if (!event.body.user_id)
    return Response.createErrorResponse(404, 'User not specified')

  if (!event.body.scrape_type)
    return Response.createErrorResponse(404, 'Site to scrape not specified')

  let result = await scrapeFunctions(eavent.body.scrape_type, event.body.item_name)

  return result
}

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

module.exports.updateUser = async event => {

}

module.exports.createCronRequest = async event => {

}

module.exports.updateCronRequest = async event => {

}


