
import React from 'react';
 
import { Text,TouchableOpacity,View} from 'react-native';


const Login=(props)=> {
  

  
  return (
     <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
       <TouchableOpacity onPress={()=>props.navigation.navigate("HomeScreen")}>
                <Text>Logout Screen</Text>
                </TouchableOpacity>

     </View>
  );
};
export default Login;