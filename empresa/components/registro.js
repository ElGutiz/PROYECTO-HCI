import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import StepIndicator from 'react-native-step-indicator';
import Toast from 'react-native-toast-message';
import { Ionicons, Foundation, FontAwesome,AntDesign } from '@expo/vector-icons';

export default function registro({navigation}){
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });

    const [nombre, onChangeUserName] = useState(null);
    const [contraseña, onChangePassword] = useState(null);
    const [correo, onChangeCorreo] = useState(null);

    const labels = ["Credenciales", "Cuenta"]
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

    const Verificar = (nombre, correo, contraseña) =>{
        let reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/;
        if(nombre === null || correo === null || contraseña === null){
            Toast.show({
                type:'error',
                text1:'ERROR',
                text2:'Ingrese credenciales',
                autoHide: true,
                visibilityTime: 2000
            });
        }else{
            if(reg.test(correo) === false){
                Toast.show({
                    type:'error',
                    text1:'ERROR',
                    text2:'Ingrese un correo válido',
                    autoHide: true,
                    visibilityTime: 2000
                });
            }else if(contraseña.length < 8){
                Toast.show({
                    type:'error',
                    text1:'Ingrese una contraseña de mayor tamaño',
                    autoHide: true,
                    visibilityTime: 300
                });                
            }else{
                Toast.show({
                    type:'success',
                    text1:'Validando datos...',
                    autoHide: true,
                    visibilityTime: 300
                });
                navigation.navigate('Registro2',{nombre:nombre,correo:correo,contra:contraseña});
            }   
        }
    }
    return(
    <View >
        <View style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
                <AntDesign name="back" size={27} color="white"/>
            </TouchableOpacity>
            <Text style ={styles.texto}>Chance al Chile</Text>
        </View>
        <View style = {styles.stepIndicatorContainer}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={0}
                labels={labels}
                stepCount={2}
            />
        </View>
        <View style = {styles.container2}>
            <Text style = {styles.texto2}>Nombre:</Text>
            <TextInput style={styles.input} onChangeText={onChangeUserName} value={nombre}></TextInput>
            <Text style = {styles.texto2}>Correo:</Text>
            <TextInput style={styles.input} onChangeText={onChangeCorreo} value={correo}></TextInput>
            <Text style = {styles.texto2}>Contraseña:</Text>
            <TextInput style={styles.input} onChangeText={onChangePassword} value={contraseña} secureTextEntry={true}></TextInput>
            <View style={styles.container3}>
            <TouchableOpacity
                activeOpacity={0.8} onPress = {() => Verificar(nombre, correo, contraseña)}>
                <Text style={styles.register}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      backgroundColor: '#1DCC8B',
      paddingVertical:10,
    },
    texto:{
        color:'#f0f0f0',
        fontWeight:'bold',
        fontFamily:'Mukta_400Regular',
        marginLeft:20,
        fontSize:22,
    },
    menu:{
        width:25,
        height:25,
        marginLeft:10,
        color:'#f0f0f0',
        marginTop:5
    },
    container2:{
        flexDirection:'column',
        backgroundColor: '#f0f0f0',
        height: '80vh',
    }, 
    input:{
        borderWidth:2,
        borderRightColor: '#f0f0f0',
        borderTopColor: '#f0f0f0',
        borderLeftColor: '#f0f0f0',
        borderBottomColor:'#1DCC8B',
        fontFamily:'Mukta_400Regular',
        marginBottom:40,
        marginLeft: 50,
        marginRight: 50,
        padding:10
    },
    texto2:{
        color:'black',
        fontFamily:'Mukta_400Regular',
        fontSize:16,
        marginLeft: 50,
        marginTop: 30,
    },
    descripcion:{
        backgroundColor:'#D8D8D8',
        marginLeft: 50,
        marginRight: 50,
        marginTop:10,
        marginBottom:15,
    },
    register:{
        color:'#f0f0f0',
        fontFamily:'Mukta_400Regular',
        fontSize:14,
        backgroundColor:'#448DDB',
        paddingHorizontal: 60,
        marginTop: 10, 
        paddingVertical:5,
        borderRadius: 6,
    },
    container3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
      }
  });