import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './src/app/page/LoginPage'
import RegisterPage from './src/app/page/RegisterPage'
import AfterLoginMain from './src/app/page/AfterLoginMain'

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="AfterLoginMain" component={AfterLoginMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
