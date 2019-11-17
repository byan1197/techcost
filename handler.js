const scrapeFunctions = require('./src/util/scrape-functions')
const dbFunctions = require('./src/services/db-functions')
const Response = require('./src/util/response')
const CronRequest = require('./src/models/CronRequest')

module.exports.scrapeAndSave = async event => {
  if (!event.body.item_name)
    return Response.createErrorResponse(404, 'Item not supplied')

  if (!event.body.user_id)
    return Response.createErrorResponse(404, 'User not specified')

  if (!event.body.scrape_type)
    return Response.createErrorResponse(404, 'Site to scrape not specified')

  let scrapeResultArr = await scrapeFunctions(eavent.body.scrape_type, event.body.item_name)
  let saveResult = null

  if (!scrapeResultArr)
    return Response.createErrorResponse(500, "Could not gather data")
  else {
    saveResult = dbFunctions.saveScrapedData(scrapeResultArr, user_id, event.body.scrape_type)
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

module.exports.createCronRequest = async event => {
  if (!event.header['Authorization'])
    return Response.createErrorResponse(404, 'Could not identify user')

  if (!event.body)
    return Response.createErrorResponse(404, 'Insufficient information to create Cron Request')

  if (!dbFunctions.checkFields(event.body, CronRequest))
    return Response.createErrorResponse(404, 'Insufficient information to create Cron Request')

  try {
    let result = await dbFunctions.createCronRequest(event.body, user_id)
    return Response.createSuccessResponse(201, "Successfully created cron request", result)
  }
  catch (e) {
    return Response.createErrorResponse(500, 'Error while creating cron request')
  }
}

module.exports.updateCronRequest = async event => {
  if (!event.header['Authorization'])
    return Response.createErrorResponse(404, 'Could not identify user')

  if (!event.body)
    return Response.createErrorResponse(404, 'Insufficient information to create Cron Request')

  try {
    let result = await dbFunctions.createCronRequest(event.body, user_id)
    return Response.createSuccessResponse(201, "Successfully created cron request", result)
  }
  catch (e) {
    return Response.createErrorResponse(500, 'Error while creating cron request')
  }
}


