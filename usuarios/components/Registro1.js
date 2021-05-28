import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 
import Toast from 'react-native-toast-message';
import StepIndicator from 'react-native-step-indicator';

export default function Registro1({navigation}) {
  const [password, onChangePassword] = React.useState('');
  const [mail, onChangeMail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const labels = ["Credenciales","Cuenta","Profesional","Docs."];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#1DCC8B',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#1DCC8B',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1DCC8B',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#1DCC8B',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#1DCC8B',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#1DCC8B',
  }  
  
  let phoneLenght = phone.length;
  let passwordLenght = password.length;
  let mailLenght = mail.length;

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    Mukta_400Regular,
  });
  
  const SomeAreasEmptyAlert = () => {
        Toast.show({
            text1: 'Falta Informacion',
            text2: 'Procura que todos los campos esten llenos.',
            autoHide: true,
            visibilityTime: 2000,
            type: 'error',
        });
    }

  return (
    <View>
        <View style = {styles.container2}>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
                <AntDesign name="back" size={27} color="white"/>
            </TouchableOpacity>
            <Text style ={styles.topbartext}>Chance al Chile</Text>
        </View>
        <View style = {styles.stepIndicatorContainer}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={0}
                labels={labels}
                stepCount={4}
            />
        </View>
        <View style={styles.Form}>
            <TextInput
                style={styles.input}
                placeholder="Correo:"
                onChangeText={onChangeMail}
                value={mail}
                keyboardType="email-address"
                maxLength={40}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                placeholder="Contraseña:"
                value={password}
                secureTextEntry={true}
                maxLength={30}
            />
            <TextInput
                style={styles.input}
                placeholder="Numero Telefonico:"
                onChangeText={onChangePhone}
                value={phone}
                keyboardType="numeric"
                maxLength={8}
            />
            <Button
                title="Siguiente"
                titleStyle={{
                    color: '#fff',
                    fontSize: 15,
                    fontFamily:'Mukta_400Regular', 
                }}
                buttonStyle={{
                    marginTop: 20,
                    width: 250,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: '#448DDB'
                }}
                onPress = {async() => {phoneLenght === 0 || passwordLenght === 0 || mailLenght === 0 ? SomeAreasEmptyAlert() : navigation.navigate('Registro2')}}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: '#1DCC8B',
        paddingVertical:10,
        alignSelf: 'stretch',
    },
    Form: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto2:{
        color:'#f0f0f0',
        fontFamily:'Mukta_400Regular',
        marginLeft:20,
        fontSize:22,
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor:'#1DCC8B',
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily:'Mukta_400Regular',
    },
    menu:{
        width:25,
        height:25,
        marginLeft:10,
    },
    Bio: {
        height: 240,
        width: 250,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        backgroundColor: '#EBEBEB',
        color: '#000',
        padding: 5,
        borderColor: '#D0D0D0',
        fontFamily:'Mukta_400Regular',
    },
    container2: {
        flexDirection: 'row',
        backgroundColor: '#1DCC8B',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    topbartext: {
        color: '#f0f0f0',
        fontFamily: 'Mukta_400Regular',
        marginLeft: 20,
        fontSize: 22,
        paddingLeft: 10,
    },
    stepIndicatorContainer: {
        marginTop: 20
    }
});
