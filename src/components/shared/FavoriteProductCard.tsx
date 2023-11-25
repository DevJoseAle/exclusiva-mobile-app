import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { Products } from '../../../interfaces/homeProducts'
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../stores/useCart';
import { useFavoritesStore } from '../../stores/useFavoritesProducts';

interface Props {
    product: Products;
    inScreen: 'Cart' | 'Favorites';
}

const FavoriteProductCard = ({product, inScreen}: Props) => {

  const addToCart = useCartStore(state=> state.addToCart);
  const removeFromCart = useCartStore(state=> state.removeFromCart);
  const removeFromFavorites = useFavoritesStore(state=> state.removeFromFavorites);

  const navigation = useNavigation<any>()
    const priceFormatter = (price:string):string =>{
        const productPrice = parseInt(price);
        const formatPrice = productPrice.toLocaleString('es-CL', {
          style: 'currency',
          currency:'CLP',
          minimumFractionDigits: 0
        })
    
        return formatPrice
    
      }
  return (
    <TouchableOpacity style={styles.cardContainer}
      onPress={() => navigation.navigate('ProductScreen',  product)}
      > 
        {/* Imagen */}
        <View style={styles.imageContainer}>
            <Image
            source={{uri: product.images[0].url}}
            width={80}
            height={80}
                />
        </View>
        {/* Precio y titulo */}
        <View style={{
          width: '70%'
        }}>

          <View style={styles.textContainer}>
              <Text style={styles.textContainerTitle}>{product.name}</Text>
              <Text style={styles.textPrice}>{priceFormatter(product.price.toString())}</Text>
          </View>
          <View
            style={{
              display:'flex',  
              justifyContent:'space-around',
              paddingVertical:4,
              marginLeft:10,
              width:'90%'
            }}
          >
            {
              inScreen ==='Favorites'
              ?(
                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={() => {addToCart(product)}}
                  >
                    <Text style={{color:'white', fontWeight:'bold'}}>Al carrito</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.removeFromFavoriteButton}
                  onPress={() => {removeFromFavorites(product.id)}}
                  >
                    <Text style={{color:'white', fontWeight:'bold'}}>Quitar Favorito</Text>
                  </TouchableOpacity>
                </View>
              )
              :
              (
            <TouchableOpacity 
                style={styles.removeOfCartButton }
                onPress={() => { removeFromCart(product) }}
              >
                <Text style={{color:'white', fontWeight:'bold'}}>Quitar</Text>
            </TouchableOpacity>
              )
            }
            


          </View>
        </View>
    </TouchableOpacity>
  )
}

export default FavoriteProductCard

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
    textContainerTitle:{
      display:'flex',
      alignItems:'flex-start',
      paddingHorizontal:10,

    },
    textContainer:{
      display:'flex',
      alignItems:'flex-start',

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
      
    },
    addToCartButton:{
      backgroundColor:'#00437E',
      borderRadius:50,
      paddingHorizontal:8,
      paddingVertical: 5,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      color:'white',
      fontWeight:'bold'
    },
    removeOfCartButton:{
      backgroundColor:'#D34343',
      borderRadius:50,
      paddingHorizontal:10,
      paddingVertical: 5,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      color:'white',
      fontWeight:'bold'
    },
    removeFromFavoriteButton:{
      backgroundColor:'#D34343',
      borderRadius:50,
      paddingHorizontal:10,
      paddingVertical: 5,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      color:'white',
      fontWeight:'bold'
    },
  })