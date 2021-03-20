import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Grid, Row, Col } from "react-native-easy-grid";
import CheckBox from 'react-native-check-box'

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import CommonTool from '../common/CommonToolManager';

export default function ConsultationModel({modalVisible, content}) {
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
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={{width: '100%', alignItems: 'flex-end', color: 'red'}} 
            onPress={()=> setIsVisible(false)}>
            <Text style={{fontSize: 40, color: 'red'}}>x</Text>
          </TouchableOpacity>
          <Grid>
            <Col size={0.8} style={{marginRight: 10}}>
              <Row><Text style={styles.labelText}>Time:</Text></Row>
              <Row><Text style={styles.labelText}>Doctor:</Text></Row>
              <Row><Text style={styles.labelText}>Patient:</Text></Row>
              <Row><Text style={styles.labelText}>Diagnosis:</Text></Row>
              <Row><Text style={styles.labelText}>Fee:</Text></Row>
              <Row><Text style={styles.labelText}>FollowUp:</Text></Row>
            </Col>
            <Col >
              <Row><Text style={styles.contentText}>{CommonTool.praseTime(details.time, 'DD/MM/YYYY HH:mm')}</Text></Row>
              <Row><Text style={styles.contentText}>{details.doctorName}</Text></Row>
              <Row><Text style={styles.contentText}>{details.patientName}</Text></Row>
              <Row><Text style={styles.contentText}>{details.diagnosis}</Text></Row>
              <Row><Text style={styles.contentText}>$ {details.consultationFee}</Text></Row>
              <Row><CheckBox isChecked={details.followUp} disabled={true}/></Row>
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
