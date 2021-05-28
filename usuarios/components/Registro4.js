import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 
import Toast from 'react-native-toast-message';
import StepIndicator from 'react-native-step-indicator';

export default function Registro4({navigation, route}) {
    const labels = ["Credenciales","Cuenta","Profesional","Docs."];
    const { phone, password, mail, username, biography, selectedLanguage, tagsArray } = route.params;
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
    };

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
                <TouchableOpacity onPress = {() => navigation.navigate('Registro3')}>
                    <AntDesign name="back" size={27} color="white"/>
                </TouchableOpacity>
                <Text style ={styles.topbartext}>Chance al Chile</Text>
            </View> 
            <View style = {styles.stepIndicatorContainer}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={3}
                    labels={labels}
                    stepCount={4}
                />
            </View>
            <View style={[styles.container_r]}>
                <Text style ={styles.text_s}>Currículum Vitae (CV):</Text>
                <FontAwesome.Button name="upload" backgroundColor='#F0F0F0'
                    style={{
                    width: 100,
                    height: 30,
                    borderRadius: 6,
                    backgroundColor: '#1CCC8B',
                    paddingLeft: 20,
                    alignSelf: 'center',
                    marginTop: 60,
                    }}>
                    Upload
                </FontAwesome.Button>
                <Text style ={styles.text_s}>Portafolio / Repositorio:</Text>
                <FontAwesome.Button name="upload" backgroundColor='#F0F0F0'
                    style={{
                    width: 100,
                    height: 30,
                    borderRadius: 6,
                    backgroundColor: '#1CCC8B',
                    alignSelf: 'center',
                    marginTop: 80,
                }}>
                    Upload
                </FontAwesome.Button>
                <Button
                    title="Terminar"
                    titleStyle={{
                        color: '#fff',
                        fontSize: 15,
                        fontFamily:'Mukta_400Regular', 
                    }}
                    buttonStyle={{
                        marginTop: 80,
                        width: 250,
                        height: 30,
                        borderRadius: 6,
                        backgroundColor: '#448DDB'
                    }}
                    onPress = {async() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Form: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto2:{
        color:'#f0f0f0',
        fontFamily:'Mukta_400Regular',
        marginLeft:20,
        fontSize:22,
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
    container_r: {
        marginTop: 20, 
        alignContent: 'center',
        alignSelf: 'center',
    },
    stepIndicatorContainer: {
        marginTop: 20,
        marginHorizontal: 50
    },
    text_s: {
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Mukta',
    }
});
