import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { registroData } from "../components/listadoData";
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import { FontAwesome5, AntDesign } from '@expo/vector-icons'; 

export default function Lista({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    const registroData1 = []
    const registroData = []
    const [datos, onChangeData] = useState([])

    const fetchMatch = async() => {
        const login = await fetch(`http://stw-uvg.site:3186/matchvacantes/${route.params.nombreUsuario}`, {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }, {mode:'no-cors'})
        .then(results => results.json())
        .then((json) => {
            registroData1.push(json)
            registroData1[0].nodes.map((data) =>{
                registroData.push(data.node[0])
            });
            onChangeData(registroData)
        });    
    };
    fetchMatch();

    return (
        <View scroll='false'>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.ff} onPress={() => navigation.navigate('Login')}>
                    <AntDesign name="back" size={27} color="white"/>
                </TouchableOpacity>
                <Text style={styles.topbartext}>Chance al Chile</Text>
            </View>
            <View>
                {
                (datos.length>0) ?
                datos.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Match', { data: item })}>
                            <View style={styles.list}>
                                <Image source={item.start.properties.foto} style={styles.icon}></Image>
                                <View style={styles.list2}>
                                    <Text style={styles.texto1}><B>{item.end.properties.nombre}</B></Text>
                                    <Text style={styles.texto1}>{item.end.properties.detalles.length>30 ? item.end.properties.detalles.slice(0, 27)+'...' : item.end.properties.detalles}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }):<Text style={styles.loading}>Cargando resultados...</Text>}
            </View>              
        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
        color: '#f0f0f0',
        fontWeight: 'bold',
        fontFamily: 'Mukta_400Regular',
        marginLeft: 20,
        fontSize: 22,
    },
    list: {
        flexDirection: 'row',
        width: '90%',
        padding: '20px',
        borderBottomWidth: 1,
        borderBottomColor: '#1DCC8B',
        alignSelf: 'center',
        flexShrink: 1,
    },
    list2: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '20px',
        flexShrink: 1,
    },
    texto1: {
        color: 'black',
        fontSize: 16,
        padding: '5px',
        fontFamily: 'Mukta_400Regular',
        flexShrink: 1,
    },
    loading: {
        color: 'black',
        fontSize: 16,
        padding: '80px',
        fontFamily: 'Mukta_400Regular',
        flexShrink: 1,
        width: '375',
        position: 'absolute',
        marginTop: '300',
        alignSelf: 'center',
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
    ff: {
        marginTop: 4
    },
    icon: {
        width: '60px',
        height: '60px',
        borderRadius: 100
    },
});