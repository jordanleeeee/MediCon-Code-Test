import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import icon from '../../img/heartbeat.png'

export default function LoginPage() {

  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [errMsg, changeErrMsg] = useState('')

  function submitAction(){
    if(!email){
      changeErrMsg('please enter email')
    } else if(!password){
      changeErrMsg('please enter password')
    } else {
      changeErrMsg('')
    }
  }

  return (
    <View style={styles.container}>

      <Image source={icon} style={{maxHeight: Dimension.width*0.5, aspectRatio: 1/1}} resizeMode='contain' />
      <TextInput style={styles.textInput} placeholder='email'
          onChangeText = {(text) => changeEmail(text)} 
          value={email}  />
      <TextInput style={styles.textInput} placeholder='password'
          onChangeText = {(text) => changePassword(text)} 
          value={password}  />
      <Text style={{color: 'white'}}> forgot password </Text>

      <Text style={{color: 'red', marginTop: 30, fontSize: 18}}>{errMsg}</Text>
      <TouchableOpacity style={styles.submitBtn} onPress={()=>submitAction()}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <Text style={{color: 'white'}}> create account </Text>
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: Color.inputField,
    width: Dimension.width*0.7,
    paddingHorizontal: Dimension.width*0.1,
    height: 50,
    borderRadius: 25,
    fontSize: 20,
    marginVertical: 10
  },
  submitBtn: {
    backgroundColor: 'white',
    width: Dimension.width*0.7,
    paddingHorizontal: Dimension.width*0.1,
    height: 50,
    borderRadius: 25,
    fontSize: 26,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
