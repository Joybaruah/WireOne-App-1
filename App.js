import React from 'react';
import Login from './app/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './app/navigation/AuthStack';
import AppStack from './app/navigation/AppStack';
import {Provider} from 'react-redux';
import { store } from './app/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <AuthStack /> */}
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
