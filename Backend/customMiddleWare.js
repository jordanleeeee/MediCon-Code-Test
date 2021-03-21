const requestIp = require('request-ip')
const log = require('./common/logger')
const mung = require('express-mung')
const session = require('./common/session')
const errorHandler = require('./common/errorHandler')

module.exports = {
  getMiddleWare: () => {
    var object = {}

    //log after receive request
    object.receiveRequestLogging = (req, response, next) => {
      // console.log("log after receive request");
      req.ip = requestIp.getClientIp(req)
      var msg = `recieve request: [${req.method}: ${req.originalUrl}] from IP: ${req.ip}`
      msg += " authentication: " + req.headers.authorization
      if (req.method == 'POST') {
        msg += `\nrequest body: ${JSON.stringify(req.body, null, 2)}`
      }
      log.info(msg)
      next()
    }

    //authorization
    object.authorization = async (req, response, next) => {
      // console.log("authorization checking");
      if (req.headers.authorization == null) {
        errorHandler.handleAuthorizationError(response)
      } else {
        var autType = req.headers.authorization.substring(0, 6)
        var token = req.headers.authorization.substring(7)
        if (autType !== 'Bearer' || token == null) {
          errorHandler.handleAuthorizationError(response)
        } else {
          const CID = await session.verifyToken(token, req.ip)
          if (CID === false) {
            errorHandler.handleTokenExpireExpireError(response)
          } else {
            req.CID = CID
            req.token = token
            next()
          }
        }
      }
    }

    //log before send response
    object.responseRequestLogging = mung.json((body, req, res) => {
      // console.log("log before send response");
      log.info(`response request: [${req.method}: ${req.originalUrl}] from IP: ${requestIp.getClientIp(req)} ` +
        `\nresponse body: ${JSON.stringify(body, null, 2)}`)
      return body;
    })

    object.updateLastAction = (req, response, next) => {
      session.updateToken(req.token, req.ip)
      next()
    }

    return object
  }

}