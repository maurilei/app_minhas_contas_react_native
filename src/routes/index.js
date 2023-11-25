/*import AddConta from '../pages/Addconta';
import Home from '../pages/Home';
import Login from '../pages/Login';

const {createNativeStackNavigator} = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ADD"
        component={AddConta}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
*/

import React from 'react'; // Importe o React, que é necessário para usar JSX
import AddConta from '../pages/Addconta';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditarConta from '../pages/EditarConta';

//const {createNativeStackNavigator} = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ADD"
        component={AddConta}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditarConta"
        component={EditarConta}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
