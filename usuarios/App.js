import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Registro1 from './components/Registro1';
import Registro2 from './components/Registro2';
import Login from './components/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <Registro1></Registro1>
      {/* <Registro2></Registro2> */}
      {/* <Login/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
