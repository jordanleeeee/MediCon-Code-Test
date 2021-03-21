import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateRecordPage from './CreateRecordPage'
import AccountPage from './AccountPage'
import ConsultationListingPage from './ConsultationListingPage'

export default function AfterLoginMainStack() {
  const ClinicStack = createBottomTabNavigator();

  return (
    <ClinicStack.Navigator screenOptions={{headerShown: false}}>
      <ClinicStack.Screen name="ConsultationListingPage" component={ConsultationListingPage} 
       options = { ({navigation, route}) => ({
        tabBarLabel: ({focused}) => <Text style={{color: focused? 'blue': 'black'}}>Record</Text>,
        tabBarIcon: ({focused}) => (
          <Image source={require('../../img/record.png')} 
          style={{maxHeight:25, aspectRatio: 1/1, tintColor: focused? 'blue': 'black'}}
          resizeMode='contain' />
        )
       }) }
      />
      <ClinicStack.Screen name="CreateRecordPage" component={CreateRecordPage}
       options = { ({navigation, route}) => ({
        tabBarLabel: ({focused}) => <Text style={{color: focused? 'blue': 'black'}}>Create</Text>,
        tabBarIcon: ({focused}) => (
          <Image source={require('../../img/create.png')} 
          style={{maxHeight:25, aspectRatio: 1/1, tintColor: focused? 'blue': 'black'}}
          resizeMode='contain' />
        )
       }) }
      />
      <ClinicStack.Screen name="AccountPage" component={AccountPage}
       options = { ({navigation, route}) => ({
        tabBarLabel: ({focused}) => <Text style={{color: focused? 'blue': 'black'}}>Clinic</Text>,
        tabBarIcon: ({focused}) => (
          <Image source={require('../../img/hospital.png')} 
          style={{maxHeight:25, aspectRatio: 1/1, tintColor: focused? 'blue': 'black'}}
          resizeMode='contain' />
        )
       }) }
      />
    </ClinicStack.Navigator>
  );
}
