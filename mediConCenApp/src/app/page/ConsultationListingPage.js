import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker'
import DropDownPicker from 'react-native-dropdown-picker'

import Dimension from '../constant/Dimension'
import Color from '../constant/Color'
import CommonTool from '../common/CommonToolManager'
import AsyncStroageManager from '../common/AsyncStroageManager'
import ConsultationModel from '../modal/ConsultationModel'
import RestApiManager from '../common/RestApiManager';
import ErrorManager from '../common/ErrorManager';

export default function LoginPage({ navigation }) {
  const [clinicName, setClinicName] = useState()
  const [from, changeFrom] = useState(Date.now())
  const [updateTo, changeUpdateTo] = useState(0)
  const [to, changeTo] = useState(Date.now())
  const [enlargeViewVisible, setEnlargeViewVisible] = useState(false)
  const [enlargeIdx, setEnlargeIndex] = useState(0)
  const [displayMode, changeDisplayMode] = useState('daily') //weekly, monthly
  const [recordList, changeRecordList] = useState([])
  const [stopToLoad, setStopToLoad] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AsyncStroageManager.get('clinicName').then(res => {
      setClinicName(res)
      const [start, end] = CommonTool.getDayDuration(Date.now())
      updateList(start, end, true)
    })
  }, [])

  function refresh() {
    updateList(from, to, true)
  }

  function updateList(start, end, entireNewList) {
    setIsLoading(true)
    if (entireNewList) {
      changeFrom(start)
      changeTo(end - 1) // change 00:00:00 to 23:59:59
      setStopToLoad(false)
      changeRecordList([])
    }
    RestApiManager.getRecord(start, end, res => {
      setIsLoading(false)
      if (res.resCode == 1) {
        if (entireNewList) {
          changeRecordList(res.resMsg)
        } else {
          changeRecordList([...recordList, ...res.resMsg])
        }

        if (res.resMsg.length < 10) {
          setStopToLoad(true)
        } else {
          changeUpdateTo(res.resMsg[9].time)
        }
      } else {
        ErrorManager.solve(res.resCode, navigation, Alert)
      }
    })
  }

  function addRecord() {
    updateList(from, updateTo, false)
  }


  function renderRecord(item, idx) {
    return (
      <TouchableOpacity key={idx} style={{
        paddingVertical: 15,
        marginHorizontal: 15,
        borderBottomWidth: 1,
      }} onPress={() => {
        setEnlargeIndex(idx)
        setEnlargeViewVisible(true)
      }}>
        <Text style={{ fontSize: 16 }}>{CommonTool.praseTime(item.time, 'DD/MM/YYYY HH:mm')} </Text>
        <Text style={{ fontSize: 18 }}>Docter {item.doctorName} give consultation to {item.patientName}</Text>
      </TouchableOpacity>
    )
  }

  function getTimeDisplay() {
    const timeString = displayMode === 'daily' ?
      CommonTool.praseTime(from, 'DD/MM/YYYY') :
      `${CommonTool.praseTime(from, 'DD/MM/YY')} - ${CommonTool.praseTime(to, 'DD/MM/YY')}`
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '60%', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => previousTimeSlot()}>
          <Text style={{ fontSize: 40, color: 'grey' }}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15, color: 'white' }}>{timeString}</Text>
        <TouchableOpacity onPress={() => nextTimeSlot()}>
          <Text style={{ fontSize: 40, color: 'grey' }}>{'>'}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  function updateDisplayMode(mode) {
    if (displayMode !== mode) {
      changeDisplayMode(mode)
      if (mode === 'daily') {
        const [start, end] = CommonTool.getDayDuration(Date.now())
        updateList(start, end, true)
      } else if (mode === 'weekly') {
        const [start, end] = CommonTool.getWeekDuration(Date.now())
        updateList(start, end, true)
      } else {
        const [start, end] = CommonTool.getMonthDuration(Date.now())
        updateList(start, end, true)
      }
    }
  }

  function nextTimeSlot() {
    const mode = displayMode
    const update = (start, end) => {
      if (start < Date.now()) {
        updateList(start, end, true)
      }
    }
    if (mode === 'daily') {
      const [start, end] = CommonTool.getDayDuration(to + 1)
      update(start, end)
    } else if (mode === 'weekly') {
      const [start, end] = CommonTool.getWeekDuration(to + 1)
      update(start, end)
    } else {
      const [start, end] = CommonTool.getMonthDuration(to + 1)
      update(start, end)
    }
  }

  function previousTimeSlot() {
    const mode = displayMode
    if (mode === 'daily') {
      const [start, end] = CommonTool.getDayDuration(from - 1)
      updateList(start, end, true)
    } else if (mode === 'weekly') {
      const [start, end] = CommonTool.getWeekDuration(from - 1)
      updateList(start, end, true)
    } else {
      const [start, end] = CommonTool.getMonthDuration(from - 1)
      updateList(start, end, true)
    }
  }

  return (
    <View style={styles.container}>
      <ConsultationModel modalVisible={enlargeViewVisible} content={recordList[enlargeIdx]}
        onClose={() => { setEnlargeViewVisible(false) }} />
      <Text style={{ fontSize: 22, marginBottom: 20, color: 'white' }}>{clinicName} Consultation Record</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
        <DropDownPicker zIndex={10}
          items={[
              {label: 'daily', value: 'daily'},
              {label: 'weekly', value: 'weekly'},
              {label: 'monthly', value: 'monthly'},
          ]}
          defaultValue={displayMode}
          containerStyle={{height: 30, width: 100}}
          itemStyle={{
              justifyContent: 'flex-start',
              zIndex: 2,
              flex: 1
          }}
          style={{zIndex: 2, flex: 1}}
          dropDownStyle={{backgroundColor: 'white', zIndex: 10}}
          onChangeItem={item => updateDisplayMode(item.value)}
        />
        {/* <Picker
          mode="dropdown"
          dropdownIconColor='#4295f5'
          selectedValue={displayMode}
          style={{ height: 30, width: 100, backgroundColor: 'white' }}
          onValueChange={(itemValue, itemIndex) => updateDisplayMode(itemValue)}
        >
          <Picker.Item label="daily" value="daily" />
          <Picker.Item label="weekly" value="weekly" />
          <Picker.Item label="monthly" value="monthly" />
        </Picker> */}
        {getTimeDisplay()}
      </View>
      <View style={{ flex: 1, backgroundColor: Color.lightGrey, width: '100%' }}>
        <FlatList
          data={recordList}
          renderItem={({ item, index }) => renderRecord(item, index)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => refresh()} />}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
              recordList.length === 0 ?
                <Text style={{ textAlign: 'center', marginTop: 50 }}>No record for this time period</Text>
                : !stopToLoad ? <ActivityIndicator size="large" color="#0000ff" /> :
                  <Text style={{ textAlign: 'center', marginVertical: 25 }}>No more record</Text>
          }
          onEndReached={() => { stopToLoad ? null : addRecord() }}
          onEndReachedThreshold={0.01}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimension.height * 0.1,
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
