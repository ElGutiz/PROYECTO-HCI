import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular, FascinateInline_400Regular } from "@expo-google-fonts/dev";
import Toast from 'react-native-toast-message';

export default function vacante({navigation, route }){

    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });

    const [nombre, onChangeUserName] = useState(null);
    const [detalles, onChangeDetalles] = useState(null);
    const [deadline, onChangeCorreo] = useState(null);

    const CrearVacante = async(nombre, deadline, detalles) =>{
        const login = await fetch(`http://stw-uvg.site:3186/vacante`, {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              'nombre':nombre,
              'deadline':deadline,
              'detalles':detalles
            },
          }, {mode:'no-cors'})
          .then(results => results.json())
          .then((json) => {
              registroData1.push(json)
              registroData1[0].nodes.map((data) =>{
                  registroData.push(data.node.properties)
              })
              onChangeData(registroData)
          });    


        Toast.show({
            type:'success',
            text1:'Creando Solicitud...',
            autoHide: true,
            visibilityTime: 300
        });
        navigation.navigate('Listado');
    }

    const Verificar = (nombre, deadline, detalles) =>{
        var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;

        if(nombre === null || deadline === null || detalles === null){
            Toast.show({
                type:'error',
                text1:'ERROR',
                text2:'Ingrese datos de la solicitud',
                autoHide: true,
                visibilityTime: 2000
            });
        }else if(detalles.length < 100){
            Toast.show({
                type:'error',
                text1:'ERROR',
                text2:'Ingrese detalles suficientes',
                autoHide: true,
                visibilityTime: 2000
            });
        }else if(reg.test(deadline) === false){
            Toast.show({
                type:'error',
                text1:'Ingrese fecha valida',
                autoHide: true,
                visibilityTime: 2000
            });
        }else{
            CrearVacante(nombre, deadline, detalles)
            }   
        }

    return(
        <View >
            <View style = {styles.container}>
                <TouchableOpacity onPress = {() => navigation.navigate('Listado')}>
                    <Image style ={styles.menu} source={require('../imagenes/flecha.png')}></Image>
                </TouchableOpacity>
                <Text style ={styles.texto}>Chance al Chile</Text>
            </View>
            <View style = {styles.container2}>
                <Text style = {styles.texto2}>Nombre:</Text>
                <TextInput style={styles.input} onChangeText={onChangeUserName} value={nombre} placeholder={'Nombre de la solicitud'}></TextInput>
                <Text style = {styles.texto2}>Deadline:</Text>
                <TextInput style={styles.input} onChangeText={onChangeCorreo} value={deadline} placeholder={'DD/MM/YYYY'}></TextInput>
                <Text style = {styles.texto2}>Detalles:</Text>
                <TextInput multiline numberOfLines={8} style={styles.descripcion} onChangeText={onChangeDetalles} value={detalles} placeholder={'Ingrese detalles de la vacante disponible'}></TextInput>
                <View style={styles.container3}>
                <TouchableOpacity
                    activeOpacity={0.8} onPress = {() => Verificar(nombre, deadline, detalles)}>
                    <Text style={styles.register}>Crear Vacante</Text>
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