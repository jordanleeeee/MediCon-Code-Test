import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, ScrollView, TouchableOpacity, CheckBox, Alert } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import CommonToolsManager from '../common/CommonToolManager';
import RestApiManager from '../common/RestApiManager';
import ErrorManager from '../common/ErrorManager';

function InputRow({label, value, onChange, ...textInputProps}){
  return(
    <View>
      <Text style={{color: 'white', fontSize: 18}}>{label}:</Text>
      {
        React.cloneElement(
          <TextInput/>,
          {
            style: styles.textInput,
            onChangeText: onChange,
            value: value,
            ...textInputProps
          }
        )
      }
      </View>
  )
}

export default function LoginPage({navigation}) {

  const [doctorName, changeDoctorName] = useState()
  const [patientName, changePatientName] = useState()
  const [diagnosis, changeDiagnosis] = useState()
  const [medication, changeMedication] = useState()
  const [fee, changeFee] = useState()
  const [time, changeTime] = useState(Date.now())
  const [followup, changeFollowup] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [errMsg, changeErrMsg] = useState('')

  function clearInput(){
    changeDiagnosis()
    changeFee()
    changeDoctorName()
    changePatientName()
    changeFollowup(false)
    changeErrMsg()
    setOpenDatePicker(false)
    changeTime(Date.now())
    changeMedication()

  }

  function submitAction(){
    if(!doctorName){
      changeErrMsg('please enter doctor name')
    } else if(!patientName){
      changeErrMsg('please enter patient name')
    } else if(!diagnosis){
      changeErrMsg('please enter diagnosis')
    } else if(!medication){
      changeErrMsg('please enter medication')
    } else if(!fee){
      changeErrMsg('please enter fee')
    } else if(isNaN(fee)){
      changeErrMsg('please a valid number for the fee')
    } else if(!time){
      changeErrMsg('please select a time')
    } else {
      changeErrMsg('')
      RestApiManager.createConsultationRecord(doctorName, patientName, diagnosis, medication, fee, time, followup, res => {
        if(res.resCode === 1 ){
          Alert.alert(
            "",
            "Create Record Success",
            [
              {
                text: "ok",
                onPress: () => clearInput(),
                style: "cancel",
              }
            ],
            {
              cancelable: false,
            }
          );
        } else {
          ErrorManager.solve(res.resCode, navigation, Alert)
        }
      })
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
      <ScrollView style={styles.container}>
        <Text style = {{fontSize: 28, color: 'white', marginBottom: 30, textAlign: 'center'}}>Create Consultation Record</Text>
        <InputRow label='Doctor' value={doctorName} onChange={changeDoctorName}/>
        <InputRow label='Patient' value={patientName} onChange={changePatientName}/>
        <InputRow label='Diagnosis' value={diagnosis} onChange={changeDiagnosis} />
        <InputRow label='Medication' value={medication} onChange={changeMedication}/>
        <InputRow label='Fee' value={fee} onChange={changeFee} keyboardType='numeric'/>
        <DateTimePicker
          mode = 'datetime'
          isVisible={openDatePicker}
          onConfirm={(date)=>{console.log(date); setOpenDatePicker(false); changeTime(new Date(date).getTime())}}
          onCancel={()=>setOpenDatePicker(false)}
        />
        <View>
          <Text style={{color: 'white', fontSize: 18}}>{'Time'}:</Text>
          <TouchableOpacity style={{...styles.textInput, justifyContent: 'center'}} onPress={()=>{
            setOpenDatePicker(true)
          }}> 
            <Text style={{fontSize: 20}}>{time?CommonToolsManager.praseTime(time, 'DD/MM/YY hh:mm'): ''}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', fontSize: 18, marginRight: 20}}>{'Followup'}:</Text>
          <CheckBox tintColors={{ true: 'white', false: 'black' }} value={followup} onValueChange={changeFollowup} />
        </View>
        <Text style={{color: 'red', marginTop: 15, fontSize: 18, width: '100%', textAlign:'center'}}>{errMsg}</Text>
        

        <TouchableOpacity style={styles.submitBtn} onPress={()=>submitAction()}>
          <Text>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    paddingHorizontal: Dimension.width*0.1,
    marginTop: Dimension.height*0.05
  },
  textInput: {
    backgroundColor: Color.inputField,
    width: Dimension.width*0.8,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    fontSize: 20,
    marginVertical: 10
  },
  submitBtn: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: Dimension.width*0.08,
    height: 40,
    borderRadius: 20,
    fontSize: 26,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
