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
import NumericInput from 'react-native-numeric-input'
import {Input} from 'react-native-elements';
import FA from 'react-native-vector-icons/FontAwesome';
import {ServerURL, getData} from './FetchNodeServices';
import { useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
const {width, height} = Dimensions.get('window');

const ProductItem = ({item,props}) => {
 // console.log(props.navigation)
  var dispatch=useDispatch()
  const [getQty,setQty]=useState(0)


  const handleChange=(item,value)=>{
    setQty(value)
    item.qtyDemand=value
    dispatch({type:'ADD_ITEM',payload:[item.fooditem_id,item]})
    props.navigation.setParams({x:  ''});


  }

  var stock = item.stock - item.rented;
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
        {stock <= 0 ? (
          <Text
            style={{
              padding: 2,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#c0392b',
            }}>
            Not Available
          </Text>
        ) : (
          <Text
            style={{
              padding: 2,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#27ae60',
            }}>
            In Stock
          </Text>
        )}
        <View style={{display:'flex',flexDirection:'row'}}>
        <Text style={{padding: 2, fontSize: 16, fontWeight: 'bold',textDecorationLine:'line-through',color:'#e74c3c'}}>
          Price:{'\u20B9'}{item.price}
        </Text>
        <Text style={{padding: 2, fontSize: 16, fontWeight: 'bold'}}>{'\u20B9'}{item.offer}</Text>
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

         { /*    {stock>0?   */}

         <View style={{display:'flex',alignItems:'flex-end',width:width*0.60}}>
         <NumericInput minValue={0} maxValue={3} totalWidth={100} value={getQty} onChange={value => handleChange(item,value)} />
         </View>

    { /*     :<></>}    */}

      </View>
    </View>
  );
};

const ProductsDetails = (props) => {
  const [productList, setProductList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');


  const searching=(txt)=>{
  
    setSearchTxt(txt)
    var result =tempList.filter((item)=>{
     return item.fooditem.includes(txt)

    })

    setProductList(result)


  } 

  const fetchAllCategories = async () => {
    var list = await getData('allfooditems/displayall');
    setProductList(list);
    setTempList(list)
  };
  useEffect(function () {
    fetchAllCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding:5}}>
        <Input
          onChangeText={txt => searching(txt)}
          placeholder="Search Product Here..."
          placeholderTextColor="#000"
          underlineColor="#000"
          leftIcon={<FA name="search" size={16} color={'#000'} />}
        />
      </View>
      <FlatList
        data={productList}
        renderItem={({item}) => <ProductItem item={item} props={props} />}
        keyExtractor={item => item.id}
      />
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

export default ProductsDetails;
