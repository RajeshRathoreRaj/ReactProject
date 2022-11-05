import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';

import {ServerURL, getData} from './FetchNodeServices';
import { useDispatch,useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
const {width, height} = Dimensions.get('window');

const ProductItem = ({item,props}) => {
 // console.log(props.navigation)




  

  var stock = item.stock - item.rented;

  var price=0
  if(item.offer>=0)
  {price=item.offer}
  else{
      price=item.price
  }
  var save = item.price - item.offer;





  return (
    <View style={styles.item}>
      <View style={{padding: 5}}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: `${ServerURL}/images/${item.fooditemimage}`}}
        />
      </View>
      <View style={{display: 'flex', flexDirection: 'column', padding: 5}}>
        <Text numberOfLines={1} style={styles.title}>
          {item.fooditem}
        </Text>
        
        <View style={{display:'flex',flexDirection:'row'}}>
        <Text style={{padding: 2, fontSize: 16, fontWeight: 'bold',textDecorationLine:'line-through',color:'#e74c3c'}}>
          
          Price:{'\u20B9'}{item.price} 

        </Text>
        <Text style={{padding: 2, fontSize: 16, fontWeight: 'bold'}}>{'\u20B9'}{item.offer} 
        </Text>
        </View>

        
        <Text
            style={{
              padding: 2,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#27ae60',
            }}>
              You save {'\u20B9'}{save}
         </Text>

         <View style={{display:'flex',flexDirection:'row'}}>
        <Text style={{padding: 2, fontSize: 18, fontWeight: 'bold',
       color:'#000'}}>
          
          Price:{'\u20B9'}{price} x {item.qtydemand}

        </Text>


        <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',
          textAlign:'right',
          color:'#000',
          width:width*0.33
          }}>
          
          {'\u20B9'}{price * item.qtydemand}

        </Text>


        </View>




              </View>
    </View>
  );
};

const ShowCart = (props) => {
  

  var cart=useSelector(state=>state.cart)
  var values=Object.values(cart)



  var totalamt = values.reduce(calculation, 0);
  var totalsaving = values.reduce(calculationsaving, 0);
  var actualamt = values.reduce(actualcalculation, 0);

  function actualcalculation(a, b) {
    var price = b.rentamt * b.qtydemand;
    return a + price;
  }

  function calculation(a, b) {
    var price = b.offer > 0 ? b.offer * b.qtydemand : b.rentamt * b.qtydemand;
    return a + price;
  }
  function calculationsaving(a, b) {
    var price = (b.rentamt - b.offer) * b.qtydemand;
    return a + price;
  }








  const [productList, setProductList] = useState(values);
  //console.log("keys",keys.length)

 
 

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={productList}
        renderItem={({item}) => <ProductItem item={item} props={props} />}      
        keyExtractor={item => item.id}
      />

<View style={{display:'flex',flexDirection:'column',padding:10,backgroundColor:'#f5f6fa'}}>
  <View style={{display:'flex',flexDirection:'row', width:width*0.94}}>
    <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',    
          color:'#000', 
          }}>
      Total:
    </Text>
    <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',
          marginLeft:'auto',
          color:'#000',
         
          }}>

      {'\u20B9'} {actualamt}
    </Text>
  </View>

  <View style={{display:'flex',flexDirection:'row'}}>
    <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',    
          color:'#000', 
          }}>
      You Save:
    </Text>
    <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',  
          marginLeft:'auto',  
          color:'#000', 
          }}>
    {'\u20B9'}  {totalsaving}
    </Text>
  </View>

  <View style={{display:'flex',flexDirection:'row',marginBottom:10}}>
    <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',    
          color:'#000',  
          }}>
    Net Amount:
    </Text>
    <Text style={{padding: 2,
         fontSize: 18,
          fontWeight: 'bold',    
          color:'#000',
          marginLeft:'auto', 
          }}>
   {'\u20B9'}  {totalamt}
    </Text>
  </View>



  <View style={{width:width*0.85,backgroundColor:'#e84118',alignSelf:'center',padding:10,borderRadius:7}}>
    <Text style={{color:'#FFF',fontSize:22,fontWeight:'bold',letterSpacing:2,alignSelf:'center'}}>
      Payment
    </Text>

  </View>


</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#FFF',
  },
  item: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#bdc3c7',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width:width*0.93
  },
  title: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShowCart;
