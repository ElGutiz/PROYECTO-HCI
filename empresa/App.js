import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Listado from './components/listado';

export default function App() {
  return (
    /*<View style={styles.container}>
       <Image
        style={styles.tinyLogo}
        source={require('./imagenes/Logo.png')}
      />
      <Text style={styles.text}>Username:</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.text}>Password:</Text>
      <TextInput style={styles.input}></TextInput>
      <TouchableOpacity
      activeOpacity={0.8}>
        <Text style={styles.login}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
      activeOpacity={0.8}>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </View>*/
    <Listado></Listado>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DCC8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 75,
    height: 75,
    marginBottom: 20,
  },
  text:{
    color: '#f0f0f0',
    fontSize: 12,
    padding:8,
    marginRight:110,
  },
  input:{
    borderWidth:3,
    borderColor:'#f0f0f0',
    borderRadius:50,
    marginBottom:20,
  },
  login:{
    color:'#f0f0f0',
    fontFamily:'Arimo',
    fontSize:14,
    backgroundColor:'#448DDB',
    paddingHorizontal: 60,
    marginTop: 10, 
    paddingVertical:5,
    borderRadius: 50,
  },
  register:{
    fontFamily:'Arial Nova',
    fontStyle:'italic',
    fontSize:14,
    color:'#f0f0f0',
    marginTop:20,
  }
});
