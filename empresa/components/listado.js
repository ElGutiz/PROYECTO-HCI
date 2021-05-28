import React, {useState} from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular, ComingSoon_400Regular } from "@expo-google-fonts/dev";
import Toast from 'react-native-toast-message';


export default function registro({ navigation, route }) {


    const registroData1 = []
    const registroData = []

    const [datos, onChangeData] = useState([])

    const loginEmpresa = async() => {
        console.log("AQUI")
        const login = await fetch(`http://stw-uvg.site:3186/matchusers/${route.params.nombreEmpresa}`, {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }, {mode:'no-cors'})
        .then(results => results.json())
        .then((json) => {
            registroData1.push(json)
            registroData1[0].nodes.map((data) =>{
                registroData.push(data.node.properties)
            })
            onChangeData(registroData)
        });    
      };

    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });

    loginEmpresa()
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Image style={styles.menu} source={require('../imagenes/flecha.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.texto}>Chance al Chile</Text>
                    <View style={styles.container22}>
                        <TouchableOpacity >
                            <Image style={styles.menu} source={require('../imagenes/float.png')}></Image>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View>
                {
                (datos.length === 0) ?
                datos.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Match', { data: item })}>
                            <View style={styles.list}>
                                <Image source={item.foto} style={styles.icon}></Image>
                                <View style={styles.list2}>
                                    <Text style={styles.texto1}>{item.usuario}</Text>
                                    <Text style={styles.texto1}>{item.bio}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }):return(<Text>No hay usuarios que hagan MATCH</Text>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1DCC8B',
        paddingVertical: 10,
        
    },
    container22:{
        flexDirection: 'row',
        paddingVertical: 10,
        zIndex: 3,
        position:'relative',
        left:"100px",
        top:"-10px"
    },
    texto: {
        color: '#f0f0f0',
        fontWeight: 'bold',
        fontFamily: 'Mukta_400Regular',
        marginLeft: 20,
        fontSize: 22,
    },
    menu: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginTop:5,
    },
    icon: {
        width: '60px',
        height: '60px'
    },
    list: {
        flexDirection: 'row',
        width: '90%',
        padding: '20px',
        borderBottomWidth: 1,
        borderBottomColor: '#1DCC8B',
        alignSelf: 'center',
    },
    list2: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '20px',
    },
    texto1: {
        color: 'black',
        fontSize: 16,
        padding: '5px',
        fontFamily: 'Mukta_400Regular',
    }
});