import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { Grid, Row, Col } from "react-native-easy-grid";

import Dimension from '../constant/Dimension'
import CommonTool from '../common/CommonToolManager';

export default function ConsultationModel({modalVisible, content, onClose}) {
  const [isVisible, setIsVisible] = useState(modalVisible)
  const [details, setDetails] = useState({
    "doctorName": "lee",
    "patientName": "chan",
    "diagnosis": "headache",
    "medication": "drug",
    "consultationFee": 100,
    "time": 1616141982282,
    "followUp": 0
  }) 

  useEffect(() => {
    setIsVisible(modalVisible)
    setDetails(content)
  }, [modalVisible, content]);

  return (
    !isVisible? null: 
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={{width: '100%', alignItems: 'flex-end'}} 
            onPress={()=> {setIsVisible(false); onClose()}}>
            <Text style={{fontSize: 40, color: 'red'}}>x</Text>
          </TouchableOpacity>
          <Grid>
            <Col size={0.8} style={{marginRight: 10}}>
              <Row><Text style={styles.labelText}>Time:</Text></Row>
              <Row><Text style={styles.labelText}>Doctor:</Text></Row>
              <Row><Text style={styles.labelText}>Patient:</Text></Row>
              <Row><Text style={styles.labelText}>Diagnosis:</Text></Row>
              <Row><Text style={styles.labelText}>Medication:</Text></Row>
              <Row><Text style={styles.labelText}>Fee:</Text></Row>
              <Row><Text style={styles.labelText}>FollowUp:</Text></Row>
            </Col>
            <Col >
              <Row><Text style={styles.contentText}>{CommonTool.praseTime(details.time, 'DD/MM/YYYY HH:mm')}</Text></Row>
              <Row><Text style={styles.contentText}>{details.doctorName}</Text></Row>
              <Row><Text style={styles.contentText}>{details.patientName}</Text></Row>
              <Row><Text style={styles.contentText}>{details.diagnosis}</Text></Row>
              <Row><Text style={styles.contentText}>{details.medication}</Text></Row>
              <Row><Text style={styles.contentText}>$ {details.consultationFee}</Text></Row>
              <Row><Image source={details.followUp? require('../../img/check.png'): require('../../img/cross-sign.png') } 
              style={{width: 20, aspectRatio: 1/1}} resizeMode='contain' /></Row>
            </Col>
          </Grid>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimension.width*0.8,
    height: Dimension.height*0.7,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimension.width,
    height: Dimension.height,
  },
  recordRow:{
    padding: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  labelText: {
    fontSize: 20
  },
  contentText: {
    fontSize: 20
  }
});
