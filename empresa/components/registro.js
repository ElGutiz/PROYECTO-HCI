import React from 'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function registro({navigation}){
    return(
    <View >
        <View style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
                <Image style ={styles.menu} source={require('../imagenes/Menu.png')}></Image>
            </TouchableOpacity>
            <Text style ={styles.texto}>Chance al Chile</Text>
        </View>
        <View style = {styles.container2}>
            <Text style = {styles.texto2}>Username:</Text>
            <TextInput multiline numberOfLines={2} style={styles.input}></TextInput>
            <Text style = {styles.texto2}>Password:</Text>
            <TextInput multiline numberOfLines={2} style={styles.input}></TextInput>
            <Text style = {styles.texto2}>Dirección:</Text>
            <TextInput multiline numberOfLines={2} style={styles.input}></TextInput>
            <Text style = {styles.texto2}>Empresa</Text>
            <TextInput multiline numberOfLines={2} style={styles.input}></TextInput>
            <Text style = {styles.texto2}>Descripción de la empresa</Text>
            <TextInput multiline numberOfLines={8} style={styles.descripcion}></TextInput>

            <View style={styles.container3}>
            <TouchableOpacity
                activeOpacity={0.8} onPress = {() => navigation.navigate('Login')}>
                <Text style={styles.register}>Register</Text>
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
        fontFamily:'Arimo',
        marginLeft:20,
        fontSize:22,
    },
    menu:{
        width:25,
        height:25,
        marginLeft:10,
    },
    container2:{
        flexDirection:'column',
        backgroundColor: '#f0f0f0',
        height: '100vh',
    }, 
    input:{
        borderWidth:2,
        borderRightColor: '#f0f0f0',
        borderTopColor: '#f0f0f0',
        borderLeftColor: '#f0f0f0',
        borderBottomColor:'#1DCC8B',
        fontFamily:'Arimo',
        marginBottom:40,
        marginLeft: 50,
        marginRight: 50,
    },
    texto2:{
        color:'black',
        fontFamily:'Arimo',
        fontSize:14,
        marginLeft: 50,
        marginTop: 22,
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
        fontFamily:'Arial Nova',
        fontSize:14,
        backgroundColor:'#448DDB',
        paddingHorizontal: 60,
        marginTop: 10, 
        paddingVertical:5,
        borderRadius: 50,
    },
    container3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
  });