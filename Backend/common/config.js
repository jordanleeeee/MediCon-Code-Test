module.exports = {
  // db config
  dbConnection: {
    host: 'localhost',
    user: 'root',
    password: 'cube54212356',
    database: 'clinicapp'
  },
  environment: 'UAT',
  password_SHA_key: 'clinicAppSecret',
  tokenExpireTime: 30 * 60 * 1000 //30mins
}