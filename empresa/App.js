import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import registro from './components/registro';
import listado from './components/listado';
import Match from './components/Match'
import { HeaderTitle } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name ="Login" component={Login} />
        <Stack.Screen name ="Registro" component={registro} />
        <Stack.Screen name ="Listado" component={listado} />
        <Stack.Screen name ="Match" component={Match} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)}></Toast>
    </NavigationContainer>
  );
}
