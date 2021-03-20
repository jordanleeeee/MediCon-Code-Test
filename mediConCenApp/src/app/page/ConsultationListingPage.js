import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CheckBox from 'react-native-check-box'

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import CommonTool from '../common/CommonToolManager'
import ConsultationModel from '../modal/ConsultationModel'

export default function LoginPage({clinicName}) {

  clinicName = 'HappyClinic'

  const [from, changeFrom] = useState(1609473600000)
  const [to, changeTo] = useState(1616247311534)
  const [enlargeViewVisible, setEnlargeViewVisible] = useState(false)
  const [enlargeIdx, setEnlargeIndex] = useState(0)
  const [displayMode, changeDisplayMode] = useState('daily') //weekly, monthly
  const [recordList, changeRecordList] = useState([
    {
      "doctorName": "lam",
      "patientName": "wan",
      "diagnosis": "fever",
      "medication": "vitamin C",
      "consultationFee": 200,
      "time": 1616208448629,
      "followUp": 0
    },
    {
        "doctorName": "lam",
        "patientName": "lau",
        "diagnosis": "fever",
        "medication": "injection",
        "consultationFee": 200,
        "time": 1616150682679,
        "followUp": 0
    },
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
    },
    {
      "doctorName": "lam",
      "patientName": "lau",
      "diagnosis": "fever",
      "medication": "injection",
      "consultationFee": 200,
      "time": 1616150682679,
      "followUp": 0
    },
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
    },
    {
      "doctorName": "lam",
      "patientName": "lau",
      "diagnosis": "fever",
      "medication": "injection",
      "consultationFee": 200,
      "time": 1616150682679,
      "followUp": 0
    },
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
  ])

  function renderRecord(item, idx){
    return(
      <TouchableOpacity key={idx} style={{
        paddingVertical: 15,
        marginHorizontal: 15,
        borderBottomWidth: 1,
      }} onPress={()=>{
        setEnlargeIndex(idx)
        setEnlargeViewVisible(true)
      }}>
        <Text style={{fontSize: 16}}>{CommonTool.praseTime(item.time, 'DD/MM/YYYY HH:mm')} </Text>
        <Text style={{fontSize: 18}}>Docter {item.doctorName} give consultation to {item.patientName}</Text>
      </TouchableOpacity>
    )
  }

  function getTimeDisplay(){
    const timeString = displayMode === 'daily'? 
      CommonTool.praseTime(from, 'DD/MM/YYYY'): 
        `${CommonTool.praseTime(from, 'DD/MM/YYYY')} - ${CommonTool.praseTime(to, 'DD/MM/YYYY')}`
    return (
      <View style={{flexDirection: 'row', justifyContent:'space-between', width: '80%', alignItems: 'center'}}>
        <Text style={{fontSize: 40}} onPress={()=>previousTimeSlot()}>{'<'}</Text>
        <Text style={{fontSize: 18}}>{timeString}</Text>
        <Text style={{fontSize: 40}} onPress={()=>nextTimeSlot()}>{'>'}</Text>
      </View>
    )
  }

  function nextTimeSlot(){
    console.log("next");
  }

  function previousTimeSlot(){
    console.log('prev');
  }

  return (
    <View style={styles.container}>
      <ConsultationModel modalVisible={enlargeViewVisible} content={recordList[enlargeIdx]} />
      <Text style={{fontSize: 20, marginBottom: 20}}>{clinicName} Consultation Record</Text>
      {getTimeDisplay()}
      <View style={{flex: 1, backgroundColor: 'grey', width: '100%'}}>
        <FlatList 
          data={recordList}
          renderItem={({item, index}) => renderRecord(item, index)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimension.height*0.1,
    alignItems: 'center',
    backgroundColor: Color.background
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold'
  },

});
