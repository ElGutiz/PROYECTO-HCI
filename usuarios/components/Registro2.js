import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Dimensions } from "react-native";
import { Button, Icon } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import TagInput from 'react-native-tags-input';

const mainColor = '#1CCC8B';

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
          selectedLanguage: ''
        };
      }

    // const [selectedLanguage, setSelectedLanguage] = useState();
    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };      

    render(){
    return (
        <View style={styles.container_c_m}>
            <View style={[{transform: [{ translateY: -150 }]}]}>
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
            <View style={[styles.container, {transform: [{ translateY: -100 }]}]} >
                <TagInput
                    updateState={this.updateTagState}
                    tags={this.state.tags}
                    placeholder="Tags..."                            
                    label='Press comma & space to add a tag'
                    labelStyle={{color: '#fff'}}
                    leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
                    leftElementContainerStyle={{marginLeft: 3}}
                    containerStyle={{width: (Dimensions.get('window').width - 60)}}
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
            <View style={styles.container_r}>
                <FontAwesome.Button name="upload" backgroundColor='#fff'
                style={{
                    width: 100,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: '#1CCC8B',
                    paddingLeft: 20,
                }}>
                    CV
                </FontAwesome.Button>
                <FontAwesome.Button name="upload" backgroundColor='#fff'
                style={{
                    width: 100,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: '#1CCC8B',
                    marginLeft: 10,
                }}>
                    Portfolio
                </FontAwesome.Button>
            </View>
            <Button
                title="Next"
                titleStyle={{
                    color: '#fff', 
                    fontWeight: 500, 
                    fontSize: 15, 
                }}
                buttonStyle={{
                    marginTop: 20,
                    width: 250,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: '#448DDB'
                }}
            />
        </View>
    );
}
};

const styles = StyleSheet.create({
    container_c_m: {
        flexDirection:'column',
        paddingVertical:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_r: {
        flexDirection:'row',
    },
    picker_s: {
        width:250,
        textAlign: 'center',
        fontSize: 15,
        borderRadius: 20,
    },
    text_s: {
        marginBottom: 10,
        fontSize: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
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
});
