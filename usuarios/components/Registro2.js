import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TagInput from 'react-native-tags-input';
import * as Font from 'expo-font'; 
import AppLoading from 'expo-app-loading';

const mainColor = '#1CCC8B';
let customFonts = {
    'Mukta': require('../assets/Mukta-Regular.ttf')
}

export default class Registro2 extends React.Component {
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Registro1')}>
                            <AntDesign name="back" size={27} color="white"/>
                        </TouchableOpacity>
                        <Text style ={styles.topbartext}>Chance al Chile</Text>
                    </View> 
                    <View style={styles.container_c_m}>
                        <View style={[styles.containerP, {transform: [{ translateY: 20 }]}]}>
                            <Text style={styles.text_s}>Career</Text>
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
                            <View style={[styles.container_r, {transform: [{ translateY: 10 }]}]}>
                                <FontAwesome.Button name="upload" backgroundColor='#F0F0F0'
                                style={{
                                    width: 100,
                                    height: 30,
                                    borderRadius: 20,
                                    backgroundColor: '#1CCC8B',
                                    paddingLeft: 20,
                                    marginRight: 15,
                                }}>
                                    CV
                                </FontAwesome.Button>
                                <FontAwesome.Button name="upload" backgroundColor='#F0F0F0'
                                style={{
                                    width: 100,
                                    height: 30,
                                    borderRadius: 20,
                                    backgroundColor: '#1CCC8B',
                                    marginLeft: 15,
                                }}>
                                    Portfolio
                                </FontAwesome.Button>
                            </View>
                            <Button
                                title="Finish"
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
                                onPress = {() => this.props.navigation.navigate('Login')}
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
    containerM: {
        flexDirection: 'row',
        backgroundColor: '#1DCC8B',
        paddingVertical: 10,
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
    text_s: {
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'Mukta',
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
    trye: {
        position: 'absolute'
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
});
