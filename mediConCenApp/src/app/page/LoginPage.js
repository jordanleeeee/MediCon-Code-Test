import React, { useState } from 'react';
import { StyleSheet, Text, Alert, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import icon from '../../img/heartbeat.png'
import RestApiManager from '../common/RestApiManager';
import AsyncStorageManager from '../common/AsyncStroageManager';
import ErrorManager from '../common/ErrorManager';

export default function LoginPage({ navigation }) {

  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [errMsg, changeErrMsg] = useState('')

  function submitAction() {
    if (!email) {
      changeErrMsg('please enter email')
    } else if (!password) {
      changeErrMsg('please enter password')
    } else {
      RestApiManager.userLogin(email, password, async res => {
        if (res.resCode === 1) {
          changeErrMsg('')
          await AsyncStorageManager.save('cid', res.resMsg.cid.toString())
          await AsyncStorageManager.save('address', res.resMsg.address)
          await AsyncStorageManager.save('clinicName', res.resMsg.clinicName)
          await AsyncStorageManager.save('email', res.resMsg.email)
          await AsyncStorageManager.save('phoneNo', res.resMsg.phoneNo)
          await AsyncStorageManager.save('token', res.resMsg.token)
          navigation.navigate('AfterLoginMain')
        } else if (res.resCode === -1) {
          changeErrMsg('incorrect password')
        } else {
          ErrorManager.solve(res.resCode, navigation, Alert)
        }
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Image source={icon} style={{ maxHeight: Dimension.width * 0.5, aspectRatio: 1 / 1 }} resizeMode='contain' />
      <TextInput style={styles.textInput} placeholder='email'
        onChangeText={(text) => changeEmail(text)}
        value={email} autoCapitalize='none' />
      <TextInput style={styles.textInput} placeholder='password'
        onChangeText={(text) => changePassword(text)}
        value={password} secureTextEntry={true} />
      <Text style={{ color: 'white' }}> forgot password </Text>

      <Text style={{ color: 'red', marginTop: 30, fontSize: 18 }}>{errMsg}</Text>
      <TouchableOpacity style={styles.submitBtn} onPress={() => submitAction()}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('RegisterPage') }}>
        <Text style={{ color: 'white' }}> create account </Text>
      </TouchableOpacity>

    </SafeAreaView>

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
    width: Dimension.width * 0.7,
    paddingHorizontal: Dimension.width * 0.1,
    height: 50,
    borderRadius: 25,
    fontSize: 20,
    marginVertical: 10
  },
  submitBtn: {
    backgroundColor: 'white',
    width: Dimension.width * 0.7,
    paddingHorizontal: Dimension.width * 0.1,
    height: 50,
    borderRadius: 25,
    fontSize: 26,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
