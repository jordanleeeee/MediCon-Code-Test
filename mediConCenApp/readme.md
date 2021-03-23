# React Native App

## Configuration
first you have to config the ip address, go to src/app/constant/Config.js
change apiEndpoint to your internal ip address (required). By defalut the listening 
on port 3050, change it if needed. Howerer, make sure the front end is trying to connect to the port where the backend is listening.

## Install app
to use the app in your phone, download the expo go in playstore 
or apple store

run the following command to start hosting the app

```
npm install
npm start
```
you can see a QR code in the terminal or http://localhost:19002/,
scan it with your camera app (iphone user) or the expo go app (android user) and you can download and use the app. 


## Remarks
It is highly encourage you to use android devices to test the app. Sorry, I
don't have iPhone or ios simulators to test the app, may have minor displaying 
issue when the app is running on iPhone