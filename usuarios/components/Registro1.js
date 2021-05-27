import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { NotoSans_400Regular, useFonts, Mukta_400Regular } from "@expo-google-fonts/dev"; 

export default function Login({navigation}) {
  const [username, onChangeUsername] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [mail, onChangeMail] = React.useState(null);
  const [biography, onChangeBiography] = React.useState(null);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    Mukta_400Regular,
  });

  return (
    <View>
        <View style = {styles.container2}>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
                <AntDesign name="back" size={27} color="white"/>
            </TouchableOpacity>
            <Text style ={styles.topbartext}>Chance al Chile</Text>
        </View> 
        <View style={styles.Form}>
            <Text style={styles.titulo}>User Information</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username:"
                maxLength={30}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                placeholder="Password:"
                value={password}
                secureTextEntry={true}
                maxLength={30}
            />
            <TextInput
                style={styles.input}
                placeholder="Mail:"
                onChangeText={onChangeMail}
                value={mail}
                keyboardType="email-address"
                maxLength={40}
            />
            <TextInput
                style={styles.Bio}
                placeholder="Bio:"
                multiline={true}
                onChangeText={onChangeBiography}
                value={biography}
            />
            <Button
                title="Next"
                titleStyle={{
                    color: '#fff',
                    fontSize: 15,
                    fontFamily:'Mukta_400Regular', 
                }}
                buttonStyle={{
                    marginTop: 20,
                    width: 250,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: '#448DDB'
                }}
                onPress = {() => navigation.navigate('Registro2')}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: '#1DCC8B',
        paddingVertical:10,
        alignSelf: 'stretch',
    },
    Form: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto2:{
        color:'#f0f0f0',
        fontFamily:'Mukta_400Regular',
        marginLeft:20,
        fontSize:22,
    },
    titulo:{
        textAlign: 'center',
        fontWeight: 'thin',
        marginTop: 20,
        fontSize: 18,
        width: 200,
        fontFamily:'Mukta_400Regular',
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor:'#1DCC8B',
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily:'Mukta_400Regular',
    },
    menu:{
        width:25,
        height:25,
        marginLeft:10,
    },
    Bio: {
        height: 240,
        width: 250,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        backgroundColor: '#EBEBEB',
        color: '#000',
        padding: 5,
        borderColor: '#D0D0D0',
        fontFamily:'Mukta_400Regular',
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
