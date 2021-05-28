import React, {useState, setState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import Toast from 'react-native-toast-message';
import { State } from 'react-native-gesture-handler';


export default function Login({ navigation }) {
  
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    Mukta_400Regular,
  });

  const Credenciales = () =>{
    Toast.show({
      type:'error',
      text1:'ERROR',
      text2:'Ingrese Credenciales',
      autoHide: true,
      visibilityTime: 2000
    });
  }

  const loginEmpresa = async(username, password) => {
    
    const login = await fetch('http://stw-uvg.site:3186/loginEmpresa', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'usuario':username,
        'contrasena':password
      }
    })
    .then(results => results.json())
    .then((json) => {
      if(json.login === true){
        console.log("listado")
        navigation.navigate('Listado');
      }else{
        WrongDataAlert();
        console.log("no listado")
      }
    });
    
  };


  const [input1, onChangeUserName] = useState(null);
  const [input2, onChangePassword] = useState(null);

  const [focus, setFocus] = useState(false)
  const customStyle = focus ? styles.inputFocus : styles.input

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../imagenes/Logo.png')}
      />
      <Text style={styles.text}>Username:</Text>
      <TextInput onChangeText = {onChangeUserName} style={styles.input} value={input1}></TextInput>
      <Text style={styles.text}>Password:</Text>
      <TextInput onChangeText = {onChangePassword} style={styles.input} value={input2} secureTextEntry={true}></TextInput>
      <TouchableOpacity
        activeOpacity={0.8} onPress={async() => loginEmpresa(input1, input2)} >
        <Text style={styles.login}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8} onPress={() => navigation.navigate('Registro')}>
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
  },
  tinyLogo: {
    width: 75,
    height: 75,
    marginBottom: 20,
  },
  text: {
    color: '#f0f0f0',
    fontSize: 12,
    padding: 8,
    marginRight: 110,
  },
  input: {
    borderWidth: 3,
    borderColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 20,
    padding:5,
    fontFamily:'Mukta_400Regular',
    color:'#f0f0f0',
    width:170,
  },
  login: {
    color: '#f0f0f0',
    fontFamily: 'Mukta_400Regular',
    fontSize: 14,
    backgroundColor: '#448DDB',
    paddingHorizontal: 60,
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  register: {
    fontFamily: 'Mukta_400Regular',
    fontStyle: 'italic',
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 20,
    textDecorationLine:'underline'
  }
});