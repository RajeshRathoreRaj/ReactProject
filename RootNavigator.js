import React from 'react';
import {View,Dimensions,Text,StatusBar} from 'react-native';
import FA from "react-native-vector-icons/FontAwesome"
import {createStackNavigator} from '@react-navigation/stack';
import {Badge} from 'react-native-elements' 
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import Login from './Login';
import Logout from './Logout';
import DrawerContent from './DrawerContent';
import ProductsDetails from './ProductsDetails';
import AppHeader from './AppHeader';
import ShowCart from './ShowCart';
const {width, height} = Dimensions.get('window');
export default function RootNavigator(props) {
  const StackNav = createStackNavigator();
 
  function Component() {
    return (
      <StackNav.Navigator>


     <StackNav.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />



        <StackNav.Screen
          name="ProductsDetails"
          component={ProductsDetails}     
          options={{
          header:AppHeader 
        }}
        />
        
        <StackNav.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <StackNav.Screen
          name="Logout"
          component={Logout}
          options={{headerShown: false}}
        />



        <StackNav.Screen
          name="appheader"
          component={AppHeader}
          options={{headerShown: false}}
        />


        

      <StackNav.Screen
          name="showcart"
          component={ShowCart}
          options={{
            header:AppHeader 
          }}
        />




      </StackNav.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Component}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
