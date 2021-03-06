import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 
import Toast from 'react-native-toast-message';
import StepIndicator from 'react-native-step-indicator';

export default function Registro4({navigation, route}) {
    const labels = ["Credenciales","Cuenta","Profesional","Docs."];
    const { phone, password, mail, username, biography, selectedLanguage, tagsArray, foto } = route.params;
    const [cvLink, onChangeCvLink] = React.useState('');
    const [portLink, onChangePortLink] = React.useState('');
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

    const validarURL = (str) => {
        const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
        console.log(patron.test(str));
        return patron.test(str);
    }
    
    const SomeAreasEmptyAlert = () => {
        Toast.show({
            text1: 'Falta Informacion',
            text2: 'Procura que todos los campos esten llenos.',
            autoHide: true,
            visibilityTime: 2000,
            type: 'error',
        });
    }

    const malURL = (txt) => {
        Toast.show({
            text1: 'URL no v??lida',
            text2: 'Su enlace de'+txt+'no est?? disponible.',
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
                <Text style ={styles.text_s}>Subir Curr??culum Vitae (CV):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Link de su CV"
                    onChangeText={onChangePortLink}
                    value={portLink}
                />
                {/* <FontAwesome.Button name="upload" backgroundColor='#F0F0F0'
                    style={{
                    width: 100,
                    height: 30,
                    borderRadius: 6,
                    backgroundColor: '#1CCC8B',
                    paddingLeft: 10,
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom:  40,
                    }}>
                    Upload
                </FontAwesome.Button> */}
                <Text style ={styles.text_s}>Subir Portafolio / Repositorio:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Link de su portafolio/repositorio:"
                    onChangeText={onChangeCvLink}
                    value={cvLink}
                />
                {/* <FontAwesome.Button name="upload" backgroundColor='#F0F0F0'
                    style={{
                    width: 100,
                    height: 30,
                    borderRadius: 6,
                    paddingLeft: 10,
                    backgroundColor: '#1CCC8B',
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom:  40,
                }}>
                    Upload
                </FontAwesome.Button> */}
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
                    onPress = {async() => {
                        if(validarURL(cvLink)){
                            if(validarURL(portLink)){
                                const login = await fetch(`http://stw-uvg.site:3186/usuario`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        'cv': cvLink,
                                        'portafolio': portLink,
                                        'foto': foto,
                                        'correo': mail,
                                        'bio': biography,
                                        'contrasena': password,
                                        'usuario': username,
                                        'telefono': phone
                                    })
                                    }, { mode: 'no-cors' })
                                    .then(results => results.json())
                                    .then((json) => {
                                        tagsArray.forEach(element => {
                                            const addTags = fetch(`http://stw-uvg.site:3186/tag`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    'usuario': username,
                                                    'tag': element
                                                })
                                                }, { mode: 'no-cors' })
                                                .then(results => results.json())
                                                .then((json) => {
                                                    Toast.show({
                                                        type: 'success',
                                                        text1: 'Creando Solicitud...',
                                                        autoHide: true,
                                                        visibilityTime: 300
                                                    });
                                                    navigation.navigate('Login');
                                                });
                                        });
                                    });
                            }else{
                                malURL(' portafolio ')
                            }
                        }else{
                            malURL(' cv ')
                        }
                        
                        //navigation.navigate('Login');
                    }}
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
        fontFamily: 'Mukta_400Regular',
        alignSelf: 'center',
        marginTop: 20,
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        marginTop: 20,
        marginBottom: 40,
        borderWidth: 1,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor:'#1DCC8B',
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily:'Mukta_400Regular',
    },
});
