import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import icono from '../imagenes/UserIcon.png';
import descarga from '../imagenes/descarga.png';
export default function registro() {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.menu} source={require('../imagenes/Menu.png')}></Image>
                    <Text style={styles.texto}>Chance al Chile</Text>
                </View>
            </View>

            <View style={styles.list}>
                <Image source={icono} style={styles.icon}></Image>
                <View style={styles.list2}>
                    <Text style={styles.texto1}>Walter Saldaña</Text>
                    <Text style={styles.texto1}>20 años</Text>
                    <Text style={styles.texto1}>Ingeniero en Ciencias de PC</Text>
                </View>
            </View>
            <View style={styles.div}>
                <Text style={styles.texto1}>Biografia</Text>
                <Text style={styles.texto1}>---------------------------------------------------</Text>
                <Text style={styles.texto1}>---------------------------------------------------</Text>
                <Text style={styles.texto1}>---------------------------------------------------</Text>
            </View>
            <View style={styles.div}>
                <Text style={styles.texto1}>Curriculum</Text>
                <View style={styles.div2}>
                    <Image source={descarga} style={styles.icon}></Image>
                    <Text style={styles.texto1}>Descargar</Text>
                </View>
                
            </View>
            <View style={styles.div}>
                
                <Text style={styles.texto1}>Contacto</Text>
                <Text style={styles.texto1}>walter@gmail.com</Text>
            </View>
            <View style={styles.div}>
                <Text style={styles.texto1}>Referencias</Text>
                <Text style={styles.texto1}>---------------------------------------------------</Text>
            </View>
            <View style={styles.div}>
                <TouchableOpacity
                    activeOpacity={0.8}>
                    <Text style={styles.register}>Match</Text>
                </TouchableOpacity>
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
    texto: {
        color: '#f0f0f0',
        fontWeight: 'bold',
        fontFamily: 'Arimo',
        marginLeft: 20,
        fontSize: 22,
    },
    menu: {
        width: 25,
        height: 25,
        marginLeft: 10,
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
        fontFamily: 'Arimo',
    },
    register:{
        color:'#f0f0f0',
        fontFamily:'Arial Nova',
        fontSize:14,
        backgroundColor:'#448DDB',
        paddingHorizontal: 60,
        marginTop: 10,
        alignSelf: 'center',
        paddingVertical:5,
        borderRadius: 50,
    }
});