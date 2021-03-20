import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginPage from './src/app/page/LoginPage'
import RegisterPage from './src/app/page/RegisterPage'
import ConsultationListingPage from './src/app/page/ConsultationListingPage'

export default function App() {
  return (
    <ConsultationListingPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
