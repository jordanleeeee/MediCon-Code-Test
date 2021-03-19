const express = require('express')
const router = express.Router()
const config = require('../common/config')
const RES = require('../common/response')
const log = require('../common/logger')
const db = require('../common/db').getInstance()

router.get('/record', (req, response) => {
  var time = req.query.timestamp || Date.now()

  const query = `
  SELECT doctorName, patientName, diagnosis, medication, consultationFee, time, followUp 
  from consultation 
  where cid=${req.CID} and time < ${time}
  order by time desc
  limit 20`

  db.makeQuery(query).then(info => {
    response.send(RES(1, info))
  }).catch(err => {
    log.warn(err)
    response.send(RES(-9999, "db error"))
  })
})

router.put('/create', (req, response) => {
  var input = req.body
  if (input.DoctorName == null || input.PatientName == null || input.Diagnosis == null
    || input.Medication == null || input.ConsultationFee == null || input.FollowUp == null) {
    response.send(RES(-9996, "missing input parama"))
    return
  }
  const query = `
  Insert into consultation
  (cid, doctorName, patientName, diagnosis, medication, consultationFee, time, followUp)
  values
  (${req.CID}, '${input.DoctorName}', '${input.PatientName}', '${input.Diagnosis}', '${input.Medication}',
  ${input.ConsultationFee}, ${Date.now()}, ${input.FollowUp})`

  db.makeQuery(query).then(info => {
    response.send(RES(1, "create consultation record success"))
  }).catch(err => {
    if (err.errno == 1452) {
      response.send(RES(-1, "invalid clinic"))
    } else {
      response.send(RES(-9999, err))
      log.warn(err)
    }
  })
})

module.exports = router