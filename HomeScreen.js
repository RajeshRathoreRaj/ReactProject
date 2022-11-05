import React from 'react';

import {Text, View} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = props => {
  return (
   <View style={{marginTop:30}}>
      <MI name="menu" size={30} onPress={() => props.navigation.openDrawer()} />

    <View
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <Text>Home Screen</Text>
    </View>
    </View>
  );
};
export default HomeScreen;
