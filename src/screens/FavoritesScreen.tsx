import { View, FlatList , StyleSheet, Text} from 'react-native';
import React from 'react'
import { useProducts } from '../api/hooks/useProducts'
import FavoriteProductCard from '../components/shared/FavoriteProductCard';
import CustomSpinner from '../components/shared/CustomSpinner';
import { useFavoritesStore } from '../stores/useFavoritesProducts';


const FavoritesScreen = () => {

  const favoritesProducts = useFavoritesStore(state=>state.favoritesProducts)
 
  if(favoritesProducts.length === 0){
    return (
      <View style={{flex:1, backgroundColor:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:20}}>No hay productos en favoritos🙁</Text>
      </View>
    )
  }

  return (
  
        <View style={{flex:1, backgroundColor:'white', display:'flex'}}>
            <FlatList 
              data={favoritesProducts}
              renderItem={({item: product}: any) => (
                <>
                  <FavoriteProductCard product={product} inScreen='Favorites' />
                </>
              )}
              keyExtractor={item => item.id.toString()}

            />
            </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create( {
  cardContainer:{
    display:'flex',
    flexDirection:'row',
    
    flex:1,
    width:'95%',
    height: 90,
    backgroundColor:'white',
    marginVertical: 4,
    marginHorizontal: 10,
    borderWidth:0.16,
    shadowColor:'grey',
    shadowOffset:{
        width:2,
        height:0.5,
    },
    shadowOpacity:.23,
    shadowRadius:7

  },
  textContainer:{
    display:'flex',
    alignItems:'flex-start',
    paddingHorizontal:10,
    paddingVertical: 5
  },
  textPrice:{
    display:'flex',
    alignItems:'flex-start',
    paddingHorizontal:10,
    paddingVertical: 5,
    fontWeight:'bold'
  },
  imageContainer:{
      display:'flex',
      alignItems:'center',
      paddingHorizontal:10,
      paddingVertical: 5
    
  }
})