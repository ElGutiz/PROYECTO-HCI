import React from 'react';
import Registro1 from './components/Registro1';
import Registro2 from './components/Registro2';
import Registro3 from './components/Registro3';
import Registro4 from './components/Registro4';
import Lista from './components/listado';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
        <Stack.Screen name ="Registro1" component={Registro1} />
        <Stack.Screen name ="Registro2" component={Registro2} />
        <Stack.Screen name ="Registro3" component={Registro3} />
        <Stack.Screen name ="Registro4" component={Registro4} />
        <Stack.Screen name ="Lista" component={Lista} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

