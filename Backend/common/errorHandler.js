const log = require('./logger');
const RES = require('./response')

module.exports = {
  handleMissingInputParams: (response) => {
    response.status(400)
    response.send(RES(-9996, 'missing input params'))
  },
  handleDbError: (response, err) => {
    log.warn(err)
    response.status(500)
    response.send(RES(-9999, 'database error'))
  },
  handleAuthorizationError(response){
    response.status(403)
    response.send(RES(-9995, 'authorization error'))
  },
  handleTokenExpireExpireError(response){
    response.status(400)
    response.send(RES(-9994, 'token expire'))
  }
}