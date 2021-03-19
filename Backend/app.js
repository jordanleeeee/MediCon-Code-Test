const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const schedule = require('./schedule.js')
const RES = require('./common/response')
const db = require('./common/db').getInstance()
const CustomMiddleWare = require('./customMiddleWare').getMiddleWare()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(CustomMiddleWare.receiveRequestLogging)
app.use(CustomMiddleWare.responseRequestLogging)

app.get('/', (req, res) => {
  console.log("on home");
  res.send(RES(1, 'we are on home'))
})

app.get('/test', (req, res) => {
  db.makeQuery('SELECT * from clinic').then(info => {
    res.send(RES(1, info))
  }).catch(err => {
    res.send(RES(-1, err))
  })
})

app.use('/user', require('./routes/clinicUser'))

app.use(CustomMiddleWare.authorization)
app.use(CustomMiddleWare.updateLastAction)
app.use('/consultation', require('./routes/consultation'))

app.listen(3050)
schedule.startDailyClearExpiredTokenJob()
