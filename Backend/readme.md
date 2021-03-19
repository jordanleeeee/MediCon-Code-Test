# Mdiconcen Code Test Backend

To start the backend server, clone the repo
run the following command

```
npm install
node app.js
```

## This webserver will communicating with client with restApi


### Clinic

  * [create ac](#1-create-ac)
  * [create record](#2-create-record)
  * [get record](#3-get-record)
  * [login](#4-login)

--------


## Ungrouped



### 1. create ac



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:3050/user/create
```



***Body:***

```js        
{
    "Email": "3test@gmail.com",
    "Password": "3test1234",
    "ClinicName": "Tester3",
    "Phone": "9998",
    "Address": "Kowloon"
}
```



***More example Requests/Responses:***


##### I. Example Request: create ac



***Body:***

```js        
{
    "Email": "3test@gmail.com",
    "Password": "3test1234",
    "ClinicName": "Tester3",
    "Phone": "9998",
    "Address": "Kowloon"
}
```



##### I. Example Response: create ac
```js
{
    "resCode": 1,
    "resMsg": "create account success"
}
```


***Status Code:*** 200

<br>



### 2. create record



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:3050/consultation/create
```



***Body:***

```js        
{
    "DoctorName": "lam",
    "PatientName": "lau",
    "Diagnosis": "fever",
    "Medication": "injection",
    "ConsultationFee": 200,
    "FollowUp": false
}
```



***More example Requests/Responses:***


##### I. Example Request: create record



***Body:***

```js        
{
    "DoctorName": "lam",
    "PatientName": "lau",
    "Diagnosis": "fever",
    "Medication": "injection",
    "ConsultationFee": 200,
    "FollowUp": false
}
```



##### I. Example Response: create record
```js
{
    "resCode": 1,
    "resMsg": "create consultation record success"
}
```


***Status Code:*** 200

<br>



### 3. get record



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:3050/consultation/record
```



***More example Requests/Responses:***


##### I. Example Request: get record



##### I. Example Response: get record
```js
{
    "resCode": 1,
    "resMsg": [
        {
            "doctorName": "lee",
            "patientName": "chan",
            "diagnosis": "covid19",
            "medication": "NA",
            "consultationFee": 1000,
            "time": 1616150131098,
            "followUp": 1
        },
        {
            "doctorName": "lee",
            "patientName": "chan",
            "diagnosis": "covid19",
            "medication": "NA",
            "consultationFee": 1000,
            "time": 1616150089268,
            "followUp": 1
        },
        {
            "doctorName": "lee",
            "patientName": "chan",
            "diagnosis": "headache",
            "medication": "drug",
            "consultationFee": 100,
            "time": 1616141982282,
            "followUp": 0
        }
    ]
}
```


***Status Code:*** 200

<br>



### 4. login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3050/user/login
```



***Body:***

```js        
{
    "Email": "jordanlee80@gmail.com",
    "Password": "admin1234",
    "UUID": "uuidOfAParticulatMobileDevice"
}
```



***More example Requests/Responses:***


##### I. Example Request: login



***Body:***

```js        
{
    "Email": "jordanlee80@gmail.com",
    "Password": "admin1234",
    "UUID": "uuidOfAParticulatMobileDevice"
}
```



##### I. Example Response: login
```js
{
    "resCode": 1,
    "resMsg": {
        "clinicName": "happyClinic",
        "phoneNo": "12345678",
        "address": "hk",
        "email": "jordanlee80@gmail.com",
        "cid": 1,
        "token": "c3f7c8223661e19cdfef3198e36ee758778a9d861916e058371ba1f1fbb84070"
    }
}
```


***Status Code:*** 200

<br>




---
[Back to top](#clinic)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-03-19 19:21:33 by [docgen](https://github.com/thedevsaddam/docgen)