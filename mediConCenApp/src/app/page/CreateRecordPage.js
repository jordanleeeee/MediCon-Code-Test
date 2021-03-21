import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'

export default function LoginPage({navigation}) {

  return (
    <SafeAreaView style={styles.container}>

      <Text style = {{fontSize: 30, color: 'white'}}>Not available now</Text>
       
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
