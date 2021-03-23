# Mdiconcen Code Test Backend

## Config
The server will listening on port 3050, change it if needed
(change value of listeningPort in /common/config.js) . However
make sure your client is trying to connect to the same port where
this backend app is listining. <br />

By default this server is trying to connect to mysql server
on my aws vm, no extra config is needed. If you want to create your own database in your local environment.  Create a database 
call clinicapp, and run testdata.sql. Change value of localDbConnection set environment
variable to 'LOCAL' in /common/config.js

## Start server
To start the backend server,
run the following command

```
npm install
node app.js
```

## This webserver will communicating with client with restApi


# Clinic

  * [create ac](#1-create-ac)
  * [create record](#2-create-record)
  * [get record](#3-get-record)
  * [login](#4-login)
  * [test](#5-test)

--------

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
    "Email": "testuser@gmail.com",
    "Password": "5test1234",
    "ClinicName": "Tester4",
    "Phone": "99988",
    "Address": "Kowloon East"
}
```



***More example Requests/Responses:***


##### I. Example Request: create ac



***Body:***

```js        
{
    "Email": "testuser@gmail.com",
    "Password": "5test1234",
    "ClinicName": "Tester4",
    "Phone": "99988",
    "Address": "Kowloon East"
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
    "PatientName": "wan",
    "Diagnosis": "fever",
    "Medication": "vitamin C",
    "ConsultationFee": 200,
    "Time": 1616478166176,
    "FollowUp": false
}
```



***More example Requests/Responses:***


##### I. Example Request: create record



***Body:***

```js        
{
    "DoctorName": "lam",
    "PatientName": "wan",
    "Diagnosis": "fever",
    "Medication": "vitamin C",
    "ConsultationFee": 200,
    "Time": 1616478166176,
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



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| from | 1606342400000 |  |
| to | 1616342400000 |  |



***More example Requests/Responses:***


##### I. Example Request: get record



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| from | 1606342400000 |  |
| to | 1616342400000 |  |



##### I. Example Response: get record
```js
{
    "resCode": 1,
    "resMsg": [
        {
            "doctorName": "lee",
            "patientName": "chan",
            "diagnosis": "headache",
            "medication": "vitaminA",
            "consultationFee": 1602,
            "time": 1616328663294,
            "followUp": 0
        },
        {
            "doctorName": "lam",
            "patientName": "chan",
            "diagnosis": "fever",
            "medication": "drug",
            "consultationFee": 9,
            "time": 1616328662941,
            "followUp": 1
        },
        ...
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
        "token": "994cfcb91b1e563f98c479b3cbe36c5082d2a4f8f4bc7f0186491ed6b0718190"
    }
}
```


***Status Code:*** 200

<br>



### 5. test



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:3050/test
```



---
[Back to top](#clinic)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-03-23 14:54:26 by [docgen](https://github.com/thedevsaddam/docgen)
