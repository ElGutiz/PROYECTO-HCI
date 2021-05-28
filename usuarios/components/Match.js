import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons'; 

export default function registro({navigation,route}) {
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });
    return (
        <View>
            <View style = {styles.container2}>
                <TouchableOpacity style={styles.ff} onPress = {() => navigation.navigate('Lista')}>
                    <AntDesign name="back" size={27} color="white"/>
                </TouchableOpacity>
                <Text style ={styles.topbartext}>Chance al Chile</Text>
            </View>
            <View style={styles.list}>
                <View style={styles.list2}>
                    <Text style={styles.texto1}>{route.params.data.name}</Text>
                </View>
            </View>
            <View style={styles.div}>
                <TouchableOpacity
                    activeOpacity={0.8} onPress = {async() => navigation.navigate('Listado')} 
                    onPressOut = {async() => Toast.show({
                        type:'success',
                        text1:'Matching Realizado',
                        visibilityTime:2000,
                        autoHide:false})}>
                    <Text style={styles.register}>Match</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container2: {
        flexDirection: 'row',
        backgroundColor: '#1DCC8B',
        paddingVertical: 10,
        paddingLeft: 10,
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
        resizeMode: "contain",
        width: '60px',
        height: '60px', 
    },
    list: {
        flexDirection: 'row',
        width: '90%',
        padding: '10px',
        borderBottomColor: '#1DCC8B',
        alignSelf: 'center',
    },
    div:{        
        width: '90%',
        padding: '10px',
        borderBottomColor: '#1DCC8B',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    div2:{
        alignSelf: 'center',
        justifyContent: 'center'
    },
    texto1: {
        color: 'black',
        fontSize: 16,
        padding: '5px',
        fontFamily: 'Mukta_400Regular',
    },
    register:{
        color:'#f0f0f0',
        fontFamily:'Mukta_400Regular',
        fontSize:14,
        backgroundColor:'#448DDB',
        paddingHorizontal: 60,
        marginTop: 10,
        alignSelf: 'center',
        paddingVertical:5,
        borderRadius: 50,
    },
    ff: {
        marginTop: 4
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