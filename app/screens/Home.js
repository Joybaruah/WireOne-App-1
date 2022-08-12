import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Form1 from '../components/Form1';
import Form2 from '../components/Form2';
import Form3 from '../components/Form3';

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Step1">
      {/* <Stack.Screen name="Step1" component={Step1} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Step2" component={Step2} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Step3" component={Step3} options={{
        headerShown: false
      }} /> */}

      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen
        name="form3"
        component={Form3}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
