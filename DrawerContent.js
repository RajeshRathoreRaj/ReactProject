import React, { useEffect,useState } from 'react';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Image, Text, View,TouchableOpacity} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import { getSyncDataByIndex,getSyncData,removeDatasync } from './AsyncDataStorage';
import { ServerURL } from './FetchNodeServices';

const DrawerContent = props => {
  const [user,setUser]=useState(null)
  const fetchUserData=async()=>{
  var key=  await getSyncDataByIndex(0,0)
  console.log("KEY:",key)
  var userData=await getSyncData(key)
  console.log(userData)
  setUser(userData)
  }

  useEffect(function(){
fetchUserData()

  },[])
 // console.log(props);
 //  var userData=getSyncData()

 const handleLogout=async()=>{
   var key=user.mobileno;
 await  removeDatasync(key)
 props.navigation.navigate("Login")
 }

  return (
   <>
 {/*   {alert(user.mobileno)}   */}
     {user!=null?
    <DrawerContentScrollView>
      <View
        style={{
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 100, height: 100, borderRadius: 50}}
          source={{uri: `${ServerURL}/images/${user.picture}`}}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={{padding: 5, fontSize: 12, letterSpacing: 1}}>
          {user.emailid}
        </Text>
      </View>
      <View>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="home"  size={25} />
          <Text style={{padding:5}}>Home</Text>
        </View>
        
        <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="login"  size={25} />
          <Text style={{padding:5}}>Login</Text>
        </View>
       </TouchableOpacity>


         
       <TouchableOpacity onPress={()=>props.navigation.navigate("ProductsDetails")}> 
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="shopping-cart"  size={25} />
          <Text style={{padding:5}}>Products</Text>
        </View>
        </TouchableOpacity>

        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="list-alt"  size={25} />
          <Text style={{padding:5}}>Orders</Text>
        </View>
       <TouchableOpacity onPress={()=>handleLogout()}>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="logout"  size={25} />
          <Text style={{padding:5}}>Logout</Text>
        </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
    :<View></View>}
    </>
  );
};

export default DrawerContent;
