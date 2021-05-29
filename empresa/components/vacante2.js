import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TagInput from 'react-native-tags-input';
import * as Font from 'expo-font'; 
import AppLoading from 'expo-app-loading';
import StepIndicator from 'react-native-step-indicator';
//import { route } from "../../server/src/routes/index.routes";
import Toast from 'react-native-toast-message';

const mainColor = '#1CCC8B';
const labels = ["Creación de Solicitud","Tags"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#1DCC8B',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#1DCC8B',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1DCC8B',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#1DCC8B',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#1DCC8B',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#1DCC8B',
};
let customFonts = {
    'Mukta': require('./assets/Mukta-Regular.ttf')
}

export default class vacante2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
            tag: '',
            tagsArray: []
            },
            tagsColor: mainColor,
            tagsText: '#fff',
            selectedLanguage: '',
            phone: props.route.params.phone,
            password: props.route.params.password,
            mail: props.route.params.mail,
            username: props.route.params.username,
            biography: props.route.params.biography,
        };
    }
       
    state = {
        fontsLoaded: false,
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }
    // const [selectedLanguage, setSelectedLanguage] = useState();
    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };

    render(){
        if (this.state.fontsLoaded){
            return (
                <View>
                    <View style = {styles.container2}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Registro2')}>
                            <AntDesign name="back" size={27} color="white"/>
                        </TouchableOpacity>
                        <Text style ={styles.topbartext}>Chance al Chile</Text>
                    </View>
                    <View style = {styles.stepIndicatorContainer}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={1}
                            labels={labels}
                            stepCount={2}
                        />
                    </View>
                    <View style={styles.container_c_m}>
                        <Text>{JSON.stringify(this.state.nameffr)}</Text>
                        <View style={[styles.container, {transform: [{ translateY: 150 }]}]} >
                            <TagInput
                                updateState={this.updateTagState}
                                tags={this.state.tags}
                                placeholder="Tags..."                            
                                label='Press comma & space to add a tag'
                                labelStyle={{color: '#fff'}}
                                leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
                                leftElementContainerStyle={{marginLeft: 3}}
                                containerStyle={{width: (Dimensions.get('window').width - 120)}}
                                inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
                                inputStyle={{color: this.state.tagsText}}
                                onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
                                onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
                                autoCorrect={false}
                                tagStyle={styles.tag}
                                tagTextStyle={styles.tagText}
                                keysForTag={', '}
                            />
                        </View>
                        <View style={[{transform: [{ translateY: 400 }]}]}>
                            <Button
                                title="Registrar"
                                titleStyle={{
                                    color: '#fff',
                                    fontSize: 16, 
                                    fontFamily: 'Mukta',
                                }}
                                buttonStyle={{
                                    width: 240,
                                    height: 30,
                                    borderRadius: 6,
                                    backgroundColor: '#448DDB'
                                }}
                                onPress = {async() => {
                                    const addVacante = await fetch(`http://stw-uvg.site:3186/vacante`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            'nombre': this.props.route.params.nombre,
                                            'detalles': this.props.route.params.detalles,
                                            'deadline': this.props.route.params.deadline,
                                            'empresa': this.props.route.params.nombreEmpresa
                                        })
                                        }, { mode: 'no-cors' })
                                        .then(results => results.json())
                                        .then((json) => {
                                            this.state.tags.tagsArray.forEach(element => {
                                                const addTags = fetch(`http://stw-uvg.site:3186/requisitos`, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        'vacante': this.props.route.params.nombre,
                                                        'tag': element
                                                    })
                                                    }, { mode: 'no-cors' })
                                                    .then(results => results.json())
                                                    .then((json) => {
                                                        Toast.show({
                                                            type: 'success',
                                                            text1: 'Creando Solicitud...',
                                                            autoHide: true,
                                                            visibilityTime: 300
                                                        });
                                                        Toast.show({
                                                            type: 'success',
                                                            text1: 'Creando Solicitud...',
                                                            autoHide: true,
                                                            visibilityTime: 300
                                                        });
                                                        this.props.navigation.navigate('Listado');
                                                    });
                                            });
                                        });
                                    //this.props.navigation.navigate('Listado')
                                }}
                            />
                        </View>
                    </View>
                </View>
            );
        } else {
            return <AppLoading/>
        }
    }
};

const styles = StyleSheet.create({
    container_c_m: {
        flexDirection:'column',
        paddingVertical:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerP: {
        position:'absolute'
    },
    container_r: {
        flexDirection:'row',
        alignSelf: 'center',
        marginBottom: 20,     
    },
    picker_s: {
        width:250,
        textAlign: 'center',
        fontSize: 15,
        borderRadius: 6,
        fontFamily: 'Mukta',
        paddingLeft: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
        position:'absolute',
        top: -50
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: mainColor
    },
    container2: {
        flexDirection: 'row',
        backgroundColor: '#1DCC8B',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    topbartext: {
        color: '#f0f0f0',
        fontFamily: 'Mukta',
        marginLeft: 20,
        fontSize: 22,
        paddingLeft: 10,
    },
    stepIndicatorContainer: {
        marginTop: 20,
        marginHorizontal: 50
    },
    text_s: {
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Mukta',
    },
});
