import React from 'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import StepIndicator from 'react-native-step-indicator';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
export default function registro2({navigation}){
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });

    const labels = ["Credenciales", "Cuenta"];

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

    const [foto, onChangePhoto] = useState(null);
    const [bio, onChangeBio] = useState(null)

    const Verificar = (foto, bio) =>{
        if(foto === null || bio === null){
            Toast.show({
                type:'error',
                text1:'ERROR',
                text2:'Ingrese datos',
                autoHide: true,
                visibilityTime: 2000
            });
        }else if(bio.length < 32){
            Toast.show({
                type:'error',
                text1:'ERROR',
                text2:'Ingrese una biografía de mayor tamaño',
                autoHide: true,
                visibilityTime: 2000
            });
        }else{
            navigation.navigate('Login')
        }
    }

    return(
        <View >
            <View style = {styles.container}>
                <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
                    <Image style ={styles.menu} source={require('../imagenes/flecha.png')}></Image>
                </TouchableOpacity>
                <Text style ={styles.texto}>Chance al Chile</Text>
            </View>
            <View style = {styles.stepIndicatorContainer}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={1}
                labels={labels}
                stepCount={2}
            />
            </View>
            <View style = {styles.container2}>
                <Text style = {styles.texto2}>Foto</Text>
                <TextInput style={styles.input} onChangeText={onChangePhoto} value={foto}></TextInput>
                <Text style = {styles.texto2}>Descripción de la empresa</Text>
                <TextInput multiline numberOfLines={8} style={styles.descripcion} onChangeText={onChangeBio} value={bio}></TextInput>
                <View style={styles.container3}>
                    <TouchableOpacity
                        activeOpacity={0.8} onPress = {() => navigation.navigate('Registro')}>
                        <Text style={styles.register}>Back</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8} onPress = {async()=> Verificar(foto, bio)}>
                        <Text style={styles.register2}>Register</Text>
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
            marginTop:5,
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
            padding:5
        },
        texto2:{
            color:'black',
            fontFamily:'Mukta_400Regular',
            fontSize:16,
            marginLeft: 50,
            marginTop: 22,
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
            paddingHorizontal: 30,
            marginTop: 75, 
            paddingVertical:5,
            borderRadius: 6,
            marginRight:20,
        },
        register2:{
            color:'#f0f0f0',
            fontFamily:'Mukta_400Regular',
            fontSize:14,
            backgroundColor:'#448DDB',
            paddingHorizontal: 20,
            marginTop: 75, 
            paddingVertical:5,
            borderRadius: 6,
            marginLeft:20,
        },
        container3: {
            flex: 1,
            flexDirection:"row",
            justifyContent:'center',
            backgroundColor: '#f0f0f0',
            marginTop:30,
          }
      });