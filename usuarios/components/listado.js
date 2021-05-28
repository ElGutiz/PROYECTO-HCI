import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { registroData } from "../components/listadoData";
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import { FontAwesome5, AntDesign } from '@expo/vector-icons'; 

export default function Lista({ navigation }) {
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });

    return (
        <View scroll='false'>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.ff} onPress={() => navigation.navigate('Login')}>
                    <AntDesign name="back" size={27} color="white"/>
                </TouchableOpacity>
                <Text style={styles.topbartext}>Chance al Chile</Text>
            </View>
            <ScrollView>
                {registroData.map((item, index) => {
                    return (
                        <TouchableOpacity style={{ paddingRight: 20 }} key={index} onPress={() => navigation.navigate('Match', { data: item })}>
                            <View style={styles.list}>
                                <FontAwesome5 style={{ alignSelf: 'center' }} name="city" size={24} color="black" />
                                <View style={styles.list2}>
                                    <Text style={styles.texto1, { fontWeight: 500, fontSize: 18 }}>{item.vacante}</Text>
                                    <Text multiLine style={styles.texto1}>{item.descripcion.length > 28 ? item.descripcion.slice(0, 25) + '...' : item.descripcion}</Text>
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
    }
});