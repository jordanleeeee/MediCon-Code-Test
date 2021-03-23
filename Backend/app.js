const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const schedule = require('./schedule.js')
const RES = require('./common/response')
const CustomMiddleWare = require('./customMiddleWare').getMiddleWare()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(CustomMiddleWare.receiveRequestLogging)
app.use(CustomMiddleWare.responseRequestLogging)

// no need auth route
app.get('/', (req, res) => {
  res.send(RES(1, 'connection ok'))
})
app.use('/user', require('./routes/clinicUser'))

// need auth route
app.use(CustomMiddleWare.authorization)
app.use(CustomMiddleWare.updateLastAction)
app.use('/consultation', require('./routes/consultation'))

app.listen(3050)
schedule.startDailyClearExpiredTokenJob()
