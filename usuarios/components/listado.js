import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { registroData } from "../components/listadoData";
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Lista({ navigation }) {
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });
    return (
        <View scroll='false'>
            <View style={styles.container}>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <AntDesign name="back" size={27} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.topbartext}>Chance al Chile</Text>
                </View>
            </View>
            <ScrollView>
                {registroData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Match', { data: item })}>
                            <View style={styles.list}>
                                <FontAwesome5 name="city" size={24} color="black" />
                                <View style={styles.list2}>
                                    <Text style={styles.texto1}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}                
            </ScrollView>               
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
        right: "0px",
        left:"100px"
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
});