const mysql = require('mysql');
const { localDbConnection, UATDbConnection, environment } = require('./config')

class Database {
  static instance = null

  constructor() {
    this.connection = mysql.createConnection(
      environment === 'LOCAL' ? localDbConnection : UATDbConnection
    );
    this.connection.connect();
  }

  static getInstance() {
    if (Database.instance == null) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  stopConnection() {
    this.connection.end();
  }

  startConnection() {
    this.connection.connect();
  }

  makeQuery(query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      });
    })
  }


}

module.exports = Database