import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { usefonts, NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 


const Login = () => {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    Mukta_400Regular,
  });
  return (
    <View style={styles.container}>
       <Image
        style={styles.tinyLogo}
        source={require('../imagenes/LogoU.png')}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DCC8B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
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
    fontFamily: 'Mukta_400Regular',
  },
  input:{
    borderWidth:3,
    borderColor:'#f0f0f0',
    borderRadius:50,
    marginBottom:20,
  },
  login:{
    color:'#f0f0f0',
    fontFamily:'Mukta_400Regular',
    fontSize:14,
    backgroundColor:'#448DDB',
    paddingHorizontal: 60,
    marginTop: 10, 
    paddingVertical:5,
    borderRadius: 50,
  },
  register:{
    fontFamily:'Mukta_400Regular',
    fontStyle:'italic',
    fontSize:14,
    color:'#f0f0f0',
    marginTop:20,
  }
});

export default Login;
