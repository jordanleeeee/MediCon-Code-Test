module.exports = {
  listeningPort: 3050,
  // db config
  localDbConnection: {
    host: 'localhost',
    user: 'root',
    password: 'cube54212356',
    database: 'clinicapp'
  },
  UATDbConnection: {
    host: '3.138.141.214',
    user: 'anywhereuser',
    password: 'anywhere',
    database: 'clinicapp'
  },
  // environment: 'LOCAL',
  environment: 'UAT', 
  password_SHA_key: 'clinicAppSecret',
  tokenExpireTime: 30 * 60 * 1000 //30mins
}