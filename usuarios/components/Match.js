import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import Toast from 'react-native-toast-message';
import { AntDesign, Entypo  } from '@expo/vector-icons'; 

export default function Match({navigation,route}) {
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
                <View style={{alignSelf: 'center', borderBottomColor: '#1DCC8B', borderBottomWidth: 1, width: 320, alignItems: 'center', alignContent: 'center'}}>
                    <Image source={route.params.data.start.properties.foto} style={styles.icon}></Image>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Entypo style={{marginRight: 10}} name="phone" size={20} color="black" />
                        <Text style={styles.texto1}>56165156</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Entypo style={{marginRight: 10}} name="mail" size={20} color="black" />
                        <Text style={styles.texto1}>hola@hotmail.com</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: '#1DCC8B', borderBottomWidth: 1, marginTop: 20}}>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={styles.texto1, { fontWeight: 700 }}>Nombre de la vacante:</Text>
                        <Text style={styles.texto1}>{route.params.data.end.properties.nombre}</Text>
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={styles.texto1, { fontWeight: 700 }}>Nombre de la empresa:</Text>
                        <Text style={styles.texto1}>{route.params.data.start.properties.nombre}</Text>
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={styles.texto1, { fontWeight: 700 }}>Descripcion de la vacante:</Text>
                        <Text style={styles.texto1}>{route.params.data.end.properties.detalles}</Text>
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={styles.texto1, { fontWeight: 700 }}>Descripcion de la empresa:</Text>
                        <Text style={styles.texto1}>{route.params.data.start.properties.bio}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.texto1, { fontWeight: 700 }}>Fecha limite:</Text>
                        <Text style={styles.texto1}>{route.params.data.end.properties.deadline}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.div}>
                <TouchableOpacity
                    style={{borderRadius: 6}}
                    activeOpacity={0.8} onPress = {async() => navigation.navigate('Listado')} 
                    onPressOut = {async() => Toast.show({
                        type:'success',
                        text1:'Matching Realizado',
                        visibilityTime:2000,
                        autoHide:false})}>
                    <Text style={styles.register}>Contactar</Text>
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
        width: '60px',
        height: '60px',
        borderRadius: 100,
        marginBottom: 10,
    },
    list: {
        flexDirection: 'column',
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
        borderRadius: 6,
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