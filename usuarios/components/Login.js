import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 
import Toast from 'react-native-toast-message';

export default function Login({navigation}) {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    Mukta_400Regular,
  });

  const state = {
    logged:false};
  
  const wrongPasswordAlert = (mensaje) => {
    Toast.show({
        text1: 'Credenciales incorrectas',
        text2: mensaje,
        autoHide: true,
        visibilityTime: 2000,
        type: 'error',
    });
  }

  const loginUser = async(username, password) => {
    const login = await fetch('http://stw-uvg.site:3186/login', {
      method:'GET',
      headers: {
        'usuario':username,
        'contrasena':password
      }
    })
    .then(results => results.json())
    .then((json) => {
      if(json.login === true){
        navigation.navigate('Listado');
      }else{
        wrongPasswordAlert(json.message)
      }
    });
  };

  const [input1, onChangeUsername] = useState('')
  const [input2, onChangePassword] = useState('')

  return (
    <View style={styles.container}>
       <Image
        style={styles.tinyLogo}
        source={require('../imagenes/LogoU.png')}
      />
      <Text style={styles.text}>Username:</Text>
      <TextInput onChangeText={onChangeUsername} style={styles.input} value={input1}></TextInput>
      <Text style={styles.text}>Password:</Text>
      <TextInput onChangeText={onChangePassword} style={styles.input} value={input2}></TextInput>
      <TouchableOpacity
        activeOpacity={0.8} onPress = {() => loginUser(input1, input2)}>
        <Text style={styles.login}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8} onPress = {() =>navigation.navigate('Registro1') }>
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
    borderRadius:6,
    marginBottom:20,
    fontFamily: 'Mukta_400Regular',
    paddingLeft: 10,
  },
  login:{
    color:'#f0f0f0',
    fontFamily:'Mukta_400Regular',
    fontSize:14,
    backgroundColor:'#448DDB',
    paddingHorizontal: 60,
    marginTop: 10, 
    paddingVertical:5,
    borderRadius: 6,
  },
  register:{
    fontFamily:'Mukta_400Regular',
    fontStyle:'italic',
    textDecorationLine: 'underline',
    fontSize:14,
    color:'#f0f0f0',
    marginTop:20,
  }
});

