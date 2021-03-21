import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { Grid, Row, Col } from "react-native-easy-grid";

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import AsyncStorageManager from '../common/AsyncStroageManager';

export default function LoginPage({navigation}){
  const [address, setAddress] = useState()
  const [clinicName, setClinicName] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    AsyncStorageManager.get('address').then( res =>
      setAddress(res)
    )
    AsyncStorageManager.get('clinicName').then( res =>
      setClinicName(res)
    )
    AsyncStorageManager.get('phoneNo').then( res =>
      setPhoneNo(res)
    )
    AsyncStorageManager.get('email').then( res =>
      setEmail(res)
    )
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 30, marginTop: 20}}>{clinicName} info:</Text>
      <Image source={require('../../img/clinic.png')} style={{maxHeight: Dimension.width*0.3, aspectRatio: 1/1, marginVertical: 50}} 
      resizeMode='contain' />
       <Grid>
            <Col size={0.4} style={{marginRight: 10, height: 250}}>
              <Row><Text style={styles.labelText}>Email:</Text></Row>
              <Row><Text style={styles.labelText}>Phone number:</Text></Row>
              <Row><Text style={styles.labelText}>Address:</Text></Row>
            </Col>
            <Col size={0.8} style={{marginRight: 10, height: 250}}>
              <Row><Text style={styles.contentText}>{email}</Text></Row>
              <Row><Text style={styles.contentText}>{phoneNo}</Text></Row>
              <Row><Text style={styles.contentText}>{address}</Text></Row>
            </Col>
        </Grid>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Dimension.height *0.06
  },
  labelText: {
    fontSize: 20
  },
  contentText: {
    fontSize: 18
  }
});
