const express = require('express')
const router = express.Router()
const RES = require('../common/response')
const db = require('../common/db').getInstance()
const errorHandler = require('../common/errorHandler')

router.get('/record', (req, response) => {
  var start = req.query.from
  var end = req.query.to

  if(start == null || end == null){
    errorHandler.handleMissingInputParams(response)
    return
  }

  const query = `
  SELECT doctorName, patientName, diagnosis, medication, consultationFee, time, followUp 
  from consultation 
  where cid= ? and time > ? and time < ?
  order by time desc
  limit 10`

  db.makeSqlQuery(query, [req.CID, start, end]).then(info => {
    response.send(RES(1, info))
  }).catch(err => {
    errorHandler.handleDbError(response, err)
  })
})

router.put('/create', (req, response) => {
  var input = req.body
  if (input.DoctorName == null || input.PatientName == null || input.Diagnosis == null
    || input.Medication == null || input.ConsultationFee == null || input.FollowUp == null) {
      errorHandler.handleMissingInputParams(response)
    return
  }
  const query = `
  Insert into consultation
  (cid, doctorName, patientName, diagnosis, medication, consultationFee, time, followUp)
  values
  (?, ?, ?, ?, ?, ?, ?, ?)`

  const queryParams = [
    req.CID, input.DoctorName, input.PatientName, input.Diagnosis, input.Medication, 
    input.ConsultationFee, Date.now(), input.FollowUp
  ]

  db.makeSqlQuery(query, queryParams).then(info => {
    response.send(RES(1, "create consultation record success"))
  }).catch(err => {
    if (err.errno == 1452) {
      response.send(RES(-1, "invalid clinic"))
    } else {
      errorHandler.handleDbError(response, err)
    }
  })
})

module.exports = router