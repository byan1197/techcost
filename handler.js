const scrapeFunctions = require('./src/util/scrape-functions')
const dbFunctions = require('./src/services/db-functions')
const Response = require('@bonyaa/techcost-commons/common-util/response')
const CronRequest = require('@bonyaa/techcost-commons/models/CronRequest')
const jwt = require('jsonwebtoken')

const SCRAPE_TYPES = {
  OUTLET_PC: 'OPC',
  NEWEGG: 'NE',
  CANADA_COMPUTERS: 'CC',
}

module.exports.scrapeAndSave = async event => {
  if (!event.body.item_name)
    return Response.createErrorResponse(400, 'Item not supplied')

  if (!event.body.user_id)
    return Response.createErrorResponse(400, 'User not specified')

  if (!event.body.scrape_type)
    return Response.createErrorResponse(400, 'Site to scrape not specified')

  let scrapeResultArr = await scrapeFunctions(event.body.scrape_type, event.body.item_name)
  let saveResult = null

  console.log(scrapeResultArr)

  if (scrapeResultArr.length === 0)
    return Response.createErrorResponse(400, "Could not find items")
  if (!scrapeResultArr)
    return Response.createErrorResponse(500, "Could not gather data")
  else {
    saveResult = await dbFunctions.saveScrapedData(scrapeResultArr, event.body.user_id, event.body.scrape_type)
  }

  console.log('saveResult', saveResult)

  if (!saveResult)
    return Response.createErrorResponse(500, "Could not gather data")
  else {
    return Response.createSuccessResponse(201, "Saved scraped data")
  }

}

module.exports.oneTimeScrape = async event => {
  let body = typeof (event.body) === 'string' ? JSON.parse(event.body) : event.body

  if (!body.item_name)
    return Response.createErrorResponse(400, 'Item not supplied')

  if (!body.scrape_type)
    return Response.createErrorResponse(400, 'Site to scrape not specified')

  let result = await scrapeFunctions(body.scrape_type, body.item_name, 15)
  console.log('result', result)
  return Response.createSuccessResponse(200, "Successfully scraped", result)
}

module.exports.createCronRequest = async event => {
  if (!event.header['Authorization'])
    return Response.createErrorResponse(400, 'Could not identify user')

  if (!event.body)
    return Response.createErrorResponse(400, 'Insufficient information to create Cron Request')

  if (!dbFunctions.checkFields(event.body, CronRequest))
    return Response.createErrorResponse(400, 'Insufficient information to create Cron Request')

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
    return Response.createErrorResponse(400, 'Could not identify user')

  if (!event.body)
    return Response.createErrorResponse(400, 'Insufficient information to create Cron Request')

  try {
    let result = await dbFunctions.createCronRequest(event.body, user_id)
    return Response.createSuccessResponse(201, "Successfully created cron request", result)
  }
  catch (e) {
    return Response.createErrorResponse(500, 'Error while creating cron request')
  }
}

module.exports.getScrapeResults = async event => {

  if (!event.headers['Authorization'])
    return Response.createErrorResponse(400, 'Could not identify user')

  let decoded = jwt.decode(event.headers['Authorization'].replace("Bearer ", ''))
  if (!decoded) {
    return Response.createErrorResponse(500, 'Error, could not identify user')
  }

  let scrapeResults = await dbFunctions.getScrapeResultsByUser(decoded.uid)

  if (!scrapeResults)
    return Response.createErrorResponse(500, 'Error, could not identify user')

  return Response.createSuccessResponse(201, 'Successfully fetched scrape results', scrapeResults)

}

