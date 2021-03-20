import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'

function InputRow({label, onChange, ...textInputProps}){
  const [input, changeInput] = useState('')
  return(
    <View>
      <Text style={{color: 'white', fontSize: 18}}>{label}:</Text>
      {
        React.cloneElement(
          <TextInput/>,
          {
            style: styles.textInput,
            onChangeText: (text) => {changeInput(text); onChange(text)},
            value: input,
            ...textInputProps
          }
        )
      }
      </View>
  )
}

export default function LoginPage() {

  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [passwordRetype, changePasswordReType] = useState('')
  const [clinicName, changeClinicName] = useState('')
  const [phone, changePhone] = useState('')
  const [address, changeAddress] = useState('')
  const [errMsg, changeErrMsg] = useState('')

  function isValidPhoneNo(){
    const re = /^[0-9]{8}$/
    return re.test(phone)
  }

  function isValidEmail(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function submitAction(){
    if(!email){
      changeErrMsg('please enter email')
    } else if(!isValidEmail()){
      changeErrMsg('invalid email format')
    } else if(!clinicName){
      changeErrMsg('please enter clinic name')
    } else if(!phone){
      changeErrMsg('please enter phoneNumber')
    } else if(!isValidPhoneNo){
      changeErrMsg('invalid phone number format')
    } else if(!address){
      changeErrMsg('please enter address')
    } else if(!password){
      changeErrMsg('please enter password')
    }  else if(password !== passwordRetype){
      changeErrMsg('password and confirm password must be the same')
    } else {
      changeErrMsg('')
    }
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.header}>Register Now</Text>
        
        <InputRow label='Email' onChange={(text) => {changeEmail(text)}} autoCapitalize='none'/>
        <InputRow label='Clinic Name' onChange={(text) => {changeClinicName(text)}}/>
        <InputRow label='Phone Number' onChange={(text) => {changePhone(text)}} keyboardType='numeric'/>
        <InputRow label='Address' onChange={(text) => {changeAddress(text)}}/>
        <InputRow label='Password' onChange={(text) => {changePassword(text)}} 
          secureTextEntry={true}/>
        <InputRow label='Confirm Password' onChange={(text) => {changePasswordReType(text)}} 
          secureTextEntry= {true}/>
        <Text style={{color: 'red', marginTop: 15, fontSize: 18, width: '100%', textAlign:'center'}}>{errMsg}</Text>
        
        <TouchableOpacity style={styles.submitBtn} onPress={()=>submitAction()}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    paddingHorizontal: Dimension.width*0.1,
    paddingTop: Dimension.height*0.1,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: 'grey',
    width: Dimension.width*0.7,
    paddingHorizontal: 10,
    height: 38,
    fontSize: 18,
    marginVertical: 10
  },
  submitBtn: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: Dimension.width*0.08,
    height: 50,
    borderRadius: 25,
    fontSize: 26,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
