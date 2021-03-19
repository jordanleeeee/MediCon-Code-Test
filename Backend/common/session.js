const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid')

const db = require('./db').getInstance()
const { tokenExpireTime } = require('./config');
const log = require('./logger');

function updateToken(token) {
  const query = `
  update session
  set expireTime = ${Date.now() + tokenExpireTime}
  where token = '${token}'`
  db.makeQuery(query).then(info => { }).catch(err => { log.warn(err) })
}

module.exports = {
  getToken: (uuid, cid) => {
    return new Promise((resolve, reject) => {
      const query = `
      select token
      from session
      where uuid = '${uuid}' and cid = '${cid}'`
      console.log(query);
      db.makeQuery(query).then(info => {
        if (info.length > 0) {
          const token = info[0].token
          updateToken(token)
          resolve(token)
        } else {
          const newToken = crypto.createHash('sha256').update(uuid + cid + uuidv4()).digest("hex")
          console.log(newToken);
          const query = `
          insert into session
          (token, uuid, cid, expireTime)
          values
          ('${newToken}', '${uuid}', ${cid}, ${Date.now() + tokenExpireTime})`
          db.makeQuery(query).then(info => {
            resolve(newToken)
          }).catch(err => {
            console.log(err);
            reject("db error")
            log.warn(err)
          })
        }
      }).catch(err => {
        log.warn(err)
        reject("db error")
      })
    })
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      const query = `
      select cid
      from session
      where token = '${token}' and expireTime > ${Date.now()}`
      db.makeQuery(query).then(info => {
        if (info.length > 0) {
          resolve(info[0].cid)
        } else {
          resolve(false)
        }
      }).catch(err => {
        log.warn(err)
        resolve(false)
      })
    })
  },
  updateToken: (token) => {
    updateToken(token)
  },
  removeToken: (token, uuid) => {
    const query = `
    delete from session
    where expireTime < ${Date.now()}`
    db.makeQuery(query).then(info => { }).catch(err => { log.warn(err) })
  },
}