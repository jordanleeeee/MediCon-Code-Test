// internal use only!!!

const config = require('./common/config')
const crypto = require('crypto');
var password = 'admin1234'

console.log(crypto.createHmac('sha256', config.password_SHA_key).update(password).digest('hex'))