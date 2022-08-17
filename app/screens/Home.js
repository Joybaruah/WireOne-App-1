import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form1 from '../components/Form1';
import Form2 from '../components/Form2';
import Form3 from '../components/Form3';

const Stack = createNativeStackNavigator();

const Home = () => (
  <Stack.Navigator initialRouteName="Step1">
    <Stack.Screen
      name="form1"
      component={Form1}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="form2"
      component={Form2}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="form3"
      component={Form3}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default Home;
