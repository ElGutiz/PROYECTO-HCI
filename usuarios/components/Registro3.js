import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TagInput from 'react-native-tags-input';
import * as Font from 'expo-font'; 
import AppLoading from 'expo-app-loading';
import StepIndicator from 'react-native-step-indicator';

const mainColor = '#1CCC8B';
const labels = ["Credenciales","Cuenta","Profesional","Docs."];
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
    'Mukta': require('../assets/Mukta-Regular.ttf')
}

export default class Registro3 extends React.Component {
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
                            currentPosition={2}
                            labels={labels}
                            stepCount={4}
                        />
                    </View>
                    <View style={styles.container_c_m}>
                        <View style={[styles.containerP, {transform: [{ translateY: 20 }]}]}>
                            <Picker
                                style={styles.picker_s}
                                selectedValue={this.selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({selectedLanguage: itemValue})
                                }>
                                <Picker.Item label="Ingenieria en Sistemas" value="ies" />
                                <Picker.Item label="Robotica" value="robo" />
                                <Picker.Item label="Ingenieria en Alimentos" value="iea" />
                                <Picker.Item label="Administracion de empresas" value="ade" />
                            </Picker>
                        </View>
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
                        <View style={[{transform: [{ translateY: 450 }]}]}>
                            <Button
                                title="Siguiente"
                                titleStyle={{
                                    color: '#fff',
                                    fontSize: 16, 
                                    fontFamily: 'Mukta',
                                }}
                                buttonStyle={{
                                    marginTop: 20,
                                    width: 240,
                                    height: 30,
                                    borderRadius: 20,
                                    backgroundColor: '#448DDB'
                                }}
                                onPress = {async() => this.props.navigation.navigate('Registro4')}
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
        borderRadius: 20,
        fontFamily: 'Mukta',
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
        position:'absolute',
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
        marginTop: 20
    },
});
