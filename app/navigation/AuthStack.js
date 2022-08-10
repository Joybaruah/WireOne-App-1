import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from '../screens/CreateAccount';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Create Account'>
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{
            title: "Create Account"
        }}/>

        <Stack.Screen name="Login" component={Login} />
      
    </Stack.Navigator>
  )
}

export default AuthStack