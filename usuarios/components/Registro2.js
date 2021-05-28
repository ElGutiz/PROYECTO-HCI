import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 
import Toast from 'react-native-toast-message';
import StepIndicator from 'react-native-step-indicator';

export default function Registro2({route, navigation}) {
    const { phone, password, mail } = route.params;
    const [username, onChangeUsername] = React.useState('');
    const [biography, onChangeBiography] = React.useState('');
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
    };
    
    let usernameLenght = username.length;
    let biographyLenght = biography.length;

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

    const BioToShortAlert = () => {
        Toast.show({
            text1: 'Tu bibliografia es muy corta',
            text2: 'Una buena bibliografia debe tener mas de 100 caracteres.',
            autoHide: true,
            visibilityTime: 2000,
            type: 'error',
        });
    }

    const userExists = (usuario) => {
        Toast.show({
            text1: 'El usuario '+usuario+' ya existe',
            text2: 'Por favor ingrese otro nombre o ingrese a su cuenta.',
            autoHide: true,
            visibilityTime: 2000,
            type: 'error',
        });
    }

    const multipleConditions = async () => {
        if(usernameLenght === 0 || biographyLenght === 0){
            SomeAreasEmptyAlert();
        }else{
            if(biographyLenght <= 100){
                BioToShortAlert();
            }else{
                const avaibale = await fetch('http://stw-uvg.site:3186/usuario/'+username, { method: 'GET' })
                    .then(results => results.json())
                    .then((json) => {
                        if(json.user === true){
                            userExists(username);
                        }else{
                            navigation.navigate('Registro3', {phone:phone, password:password, mail:mail, username:username, biography:biography});
                        }
                    })
                    .catch((error)=>{console.log(error)});
            }
        }
    };

    return (
        <View>
            <View style = {styles.container2}>
                <TouchableOpacity onPress = {() => navigation.navigate('Registro1')}>
                    <AntDesign name="back" size={27} color="white"/>
                </TouchableOpacity>
                <Text style ={styles.topbartext}>Chance al Chile</Text>
            </View> 
            <View style = {styles.stepIndicatorContainer}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={1}
                    labels={labels}
                    stepCount={4}
                />
            </View>
            <View style={styles.Form}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder="Nombre de Usuario:"
                    maxLength={30}
                />
                <TextInput
                    style={styles.Bio}
                    placeholder="Bio:"
                    multiline={true}
                    onChangeText={onChangeBiography}
                    value={biography}
                    maxLength={300}
                />
                <Text fontFamily='Mukta_400Regular'>Caracteres restantes: {biographyLenght}/300</Text>
                <Button
                    title="Siguiente"
                    titleStyle={{
                        color: '#fff',
                        fontSize: 15,
                        fontFamily:'Mukta_400Regular', 
                    }}
                    buttonStyle={{
                        marginTop: 25,
                        width: 250,
                        height: 30,
                        borderRadius: 6,
                        backgroundColor: '#448DDB'
                    }}
                    onPress = {async() => multipleConditions()}
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
    Bio: {
        height: 240,
        width: 250,
        margin: 12,
        marginTop: 40,
        marginBottom: 20,
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
        marginTop: 20,
        marginHorizontal: 50
    },
});
