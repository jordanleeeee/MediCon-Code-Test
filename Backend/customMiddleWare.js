const requestIp = require('request-ip')
const log = require('./common/logger')
const mung = require('express-mung')
const RES = require('./common/response')
const session = require('./common/session')

function rejectAction(response){
  response.status(403)
  response.send(RES(-9995, 'authorization error'))
}

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
        rejectAction(response)
      } else {
        var autType = req.headers.authorization.substring(0, 6)
        var token = req.headers.authorization.substring(7)
        if (autType !== 'Bearer' || token == null) {
          rejectAction(response)
        } else {
          const CID = await session.verifyToken(token)
          if (CID === false) {
            rejectAction(response)
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
      session.updateToken(req.token)
      next()
    }

    return object
  }

}