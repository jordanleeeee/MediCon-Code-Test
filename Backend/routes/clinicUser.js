const express = require('express')
const router = express.Router()
const config = require('../common/config')
const RES = require('../common/response')
const crypto = require('crypto');
const session = require('../common/session')
const db = require('../common/db').getInstance()
const errorHandler = require('../common/errorHandler')


router.post('/login', (req, response) => {
  var input = req.body
  if (input.Email == null || input.Password == null || input.UUID == null) {
    errorHandler.handleMissingInputParams(response)
    return
  }

  const loginEmail = input.Email
  const loginPw = crypto.createHmac('sha256', config.password_SHA_key).update(input.Password).digest('hex')

  const query = `
  SELECT clinicName, phoneNo, address, email, cid 
  from clinic 
  where email=? and password=?`

  db.makeSqlQuery(query, [loginEmail, loginPw]).then(async info => {
    if (info.length > 0) {
      var msg = info[0];
      msg.token = await session.getToken(input.UUID, req.ip, msg.cid)
      response.send(RES(1, info[0]))
    } else {
      response.send(RES(-1, "invalid login email or password"))
    }
  }).catch(err => {
    errorHandler.handleDbError(response, err)
  })
})

router.put('/create', (req, response) => {
  var input = req.body
  if (input.Email == null || input.Password == null || input.ClinicName == null
    || input.Phone == null || input.Address == null) {
    response.send(RES(-9996, "missing input parama"))
    return
  }

  const hashPw = crypto.createHmac('sha256', config.password_SHA_key).update(input.Password).digest('hex')

  const query = `
  Insert into clinic
  (email, password, clinicName, phoneNo, address)
  values
  (?, ?, ?, ?, ?)`

  db.makeSqlQuery(query, [input.Email, hashPw, input.ClinicName, input.Phone, input.Address]).then(info => {
    response.send(RES(1, "create account success"))
  }).catch(err => {
    if (err.errno == 1062) {
      response.send(RES(-1, `you already got an account for ${input.Email}, please use another email`))
    } else {
      errorHandler.handleDbError(response, err)
    }
  })

})

module.exports = router