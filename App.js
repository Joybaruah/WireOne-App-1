import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './app/navigation/AuthStack';
import AppStack from './app/navigation/AppStack';
import { store } from './app/redux/store';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      {/* <AuthStack /> */}
      <AppStack />
    </NavigationContainer>
  </Provider>
);

export default App;
