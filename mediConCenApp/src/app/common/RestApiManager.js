import AsyncStorageManager from "./AsyncStroageManager"
import config from '../constant/Config'

function handleRestApiResoponse(apiCall, callback) {
  apiCall.then(res => {
    return res.json()
  }).then(res => {
    callback(res)
  }).catch(err => {})
}

function generateRequestDetails(requestType, token, requstBody = undefined, bodyType = undefined) { 
  var details = {}
    details.method = requestType
    details.headers = {}
    if(token){
      details.headers.Authorization = `Bearer ${token}`
    }
    if (requstBody != null) {
      if (bodyType === 'json') {
        details.headers['Content-Type'] = 'application/json'
        details.body = JSON.stringify(requstBody)
      } else if (bodyType === 'form') {
        details.body = requstBody
      }
    }
    return details
}

const RestApiManager = {
  createAccount(email, clinicName, phone, address, pw, callback) {
    handleRestApiResoponse(
      fetch(`${config.apiEndpoint}:${config.apiListeningPort}/user/create`, generateRequestDetails('PUT', null, 
      {
        Email: email,
        ClinicName: clinicName,
        Password: pw,
        Phone: phone,
        Address: address,
      }, 'json')), callback
    )
  },
  async userLogin(email, password, callback) {
    handleRestApiResoponse(
      fetch(`${config.apiEndpoint}:${config.apiListeningPort}/user/login`, generateRequestDetails('POST', null, 
      {
        Email: email,
        Password: password,
        UUID: await AsyncStorageManager.getDeviceUUID()
      }, 'json')), callback
    )
  },
  async getRecord(from, to, callback) {
    const token = await AsyncStorageManager.get('token')
    handleRestApiResoponse(
      fetch(`${config.apiEndpoint}:${config.apiListeningPort}/consultation/record?from=${from}&to=${to}`
        , generateRequestDetails('GET', token)), callback
    )
  },
  async createConsultationRecord(DoctorName, PatientName, Diagnosis, Medication, ConsultationFee, Time, FollowUp, callback) {
    const token = await AsyncStorageManager.get('token')
    handleRestApiResoponse(
      fetch(`${config.apiEndpoint}:${config.apiListeningPort}/consultation/create`, generateRequestDetails('PUT', token, 
        {DoctorName, PatientName, Diagnosis, Medication, ConsultationFee, Time,  FollowUp}, 'json')), callback
    )
  },
}

export default RestApiManager
