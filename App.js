/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';

 import {Text, View} from 'react-native';
 import HomeScreen from './Component/HomeScreen';
 import Login from './Component/Login';
 import RootNavigator from './Component/RootNavigator';
 import {NavigationContainer} from '@react-navigation/native';
 import RootReducer from './Component/RootReducer';
 import { createStore } from 'redux';
 import { Provider } from 'react-redux';
 const store = createStore(RootReducer);
 const App = props => {
   return (
     <Provider store={store}>
     <NavigationContainer>
       <RootNavigator />
     </NavigationContainer>
     </Provider>
   );
 };
 
 export default App;
 