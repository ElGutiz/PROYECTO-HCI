import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import icono from '../imagenes/UserIcon.png';
import descarga from '../imagenes/descarga.png';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev";
import Toast from 'react-native-toast-message';
import { Ionicons, Foundation, FontAwesome,AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function registro({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        NotoSans_400Regular,
        Mukta_400Regular,
    });
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Listado')}>
                    <AntDesign name="back" size={27} color="white"/>
                </TouchableOpacity>
                <Text style={styles.texto}>Chance al Chile</Text>
            </View>
            <View style={styles.list}>
                <View style={styles.center}>
                    <Image source={route.params.data.foto} style={styles.icon}></Image>
                </View>
                <View style={styles.center}>
                    <Ionicons name="md-mail-sharp" size={24} color="black" />
                    <Text style={styles.texto1}  onPress={() => Linking.openURL(`mailto:${route.params.data.correo}`)}>{route.params.data.correo}</Text>
                </View>
                <View style={styles.center}>
                    <Foundation name="telephone" size={24} color="black" />
                    <Text style={styles.texto1}  onPress={() => Linking.openURL(`tel:${route.params.data.telefono}`)}>{route.params.data.telefono}</Text>
                </View>
            </View>
            <View style={styles.div3}>
                <View style={styles.div4}>
                    <Text style={styles.texto2, { fontWeight: 700 }}>Nombre:</Text>
                    <Text style={styles.texto2}>{route.params.data.usuario}</Text>
                </View>
                <View style={styles.div4}>
                    <Text style={styles.texto2, { fontWeight: 700 }}>Biografía:</Text>
                    <Text style={styles.texto2}>{route.params.data.bio}</Text>
                </View>
                <View style={styles.div4}>
                    <Text style={styles.texto2, { fontWeight: 700 }}>Portafolio:</Text>
                    <Text style={styles.texto2} onPress={() => Linking.openURL(route.params.data.portafolio)}>{route.params.data.portafolio}</Text>
                </View>
                <Text style={styles.texto2, { fontWeight: 700 }}>Descargar Currículum Vitae (CV):</Text>
                <TouchableOpacity>
                    <FontAwesome.Button name="download" backgroundColor='#F0F0F0'
                        style={{
                            width: 110,
                            height: 30,
                            borderRadius: 6,
                            backgroundColor: '#1CCC8B',
                            paddingLeft: 10,
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 40,
                        }}>
                        Download
                </FontAwesome.Button>
                </TouchableOpacity>

            </View>

            <View style={styles.div}>
                <View style={styles.div2}>
                    <TouchableOpacity

                        activeOpacity={0.8} 
                        onPress={() => Linking.openURL(`mailto:${route.params.data.correo}`)}
                        //onPress={async () => navigation.navigate('Listado')}
                        onPressOut={async () => Toast.show({
                            type: 'success',
                            text1: 'Matching Realizado',
                            visibilityTime: 2000,
                            autoHide: false
                        })}>
                        <Text style={styles.register}>Contactar</Text>
                    </TouchableOpacity>
                </View>

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
    center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: '5px',
        left: "5px",
    },
    texto: {
        color: '#f0f0f0',
        fontWeight: 'bold',
        fontFamily: 'Mukta_400Regular',
        marginLeft: 20,
        fontSize: 22,
    },
    textoN: {
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
        marginTop: 5,
    },
    icon: {
        resizeMode: "contain",
        width: '100px',
        height: '100px',
    },
    list: {
        flexDirection: 'column',
        width: '90%',
        padding: '10px',
        borderBottomWidth: 1,
        borderBottomColor: '#1DCC8B',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    div: {
        width: '90%',
        borderBottomColor: '#1DCC8B',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    div2: {
        alignSelf: 'center',
        justifyContent: 'center',
        padding: "0px",
    },
    div3: {
        width: '90%',
        borderBottomColor: '#1DCC8B',
        alignSelf: 'center',
        justifyContent: 'center',
        top: "10px",
    },
    div4: {
        marginBottom: "10px"
    },
    texto1: {
        color: 'black',
        fontSize: 16,
        padding: '5px',
        fontFamily: 'Mukta_400Regular',
    },
    texto2: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Mukta_400Regular',
    },
    register: {
        color: '#f0f0f0',
        fontFamily: 'Mukta_400Regular',
        fontSize: 14,
        backgroundColor: '#448DDB',
        paddingHorizontal: 60,
        marginTop: 10,
        paddingVertical: 5,
        borderRadius: 6,
    }
});