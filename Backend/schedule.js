const session = require('./common/session')
const log = require('./common/logger');
const schedule = require('node-schedule')


module.exports = {
  startDailyClearExpiredTokenJob: () => {
    schedule.scheduleJob('0 0 * * *', function() { // every 00:00
      log.info("DailyClearExpiredTokenJobStart")
      session.removeToken()
    })
  }
}