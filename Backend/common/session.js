const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid')

const db = require('./db').getInstance()
const { tokenExpireTime } = require('./config');
const log = require('./logger');

function refreshToken(newToken, uuid, ip, cid) {
  return new Promise((resolve, reject) => {
    const query = `
    update session 
    set token = '${newToken}', expireTime = ${Date.now() + tokenExpireTime}
    where uuid = '${uuid}' and ip = '${ip.toString()}' and cid = '${cid}'`
    db.makeQuery(query).then(info => { resolve() }).catch(err => { reject(); log.warn(err) })
  })
}

module.exports = {
  getToken: (uuid, ip, cid) => {
    return new Promise((resolve, reject) => {
      const query = `
      select token
      from session
      where uuid = '${uuid}' and ip = '${ip.toString()}' and cid = '${cid}'`
      db.makeQuery(query).then(async info => {
        const newToken = crypto.createHash('sha256').update(uuid + cid + uuidv4()).digest("hex")
        if (info.length > 0) {
          await refreshToken(newToken, uuid, ip, cid)
          resolve(newToken)
        } else {
          const query = `
          insert into session
          (token, uuid, cid, expireTime, ip)
          values
          ('${newToken}', '${uuid}', ${cid}, ${Date.now() + tokenExpireTime}, '${ip}')`
          db.makeQuery(query).then(info => {
            resolve(newToken)
          }).catch(err => {
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
  verifyToken: (token, ip) => {
    return new Promise((resolve, reject) => {
      const query = `
      select cid
      from session
      where token = '${token}' and ip = '${ip}' and expireTime > ${Date.now()}`
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
  updateToken: (token, ip) => {
    const query = `
    update session
    set expireTime = ${Date.now() + tokenExpireTime}
    where token = '${token}' and ip = '${ip}'`
    db.makeQuery(query).then(info => { }).catch(err => { log.warn(err) })
  },
  removeExpireToken: () => {
    const query = `
    delete from session
    where expireTime < ${Date.now()}`
    db.makeQuery(query).then(info => { }).catch(err => { log.warn(err) })
  },
  removeToken: (token, ip) => {
    const query = `
    delete from session
    where token = '${token}' and ip = '${ip}'`
    db.makeQuery(query).then(info => { }).catch(err => { log.warn(err) })
  }

}