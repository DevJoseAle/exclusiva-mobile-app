import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useCartStore } from '../../stores/useCart'
import { Products } from '../../../interfaces/homeProducts'
import { useFavoritesStore } from '../../stores/useFavoritesProducts'

interface buttonProps{

    type: 'Comprar' | 'Agregar'|'A Favoritos',
    product: Products
}

const CustomCartButton = ({
    type,
    product
}: buttonProps) => {

  const addToCart = useCartStore(state=> state.addToCart)
  const addToFavorites = useFavoritesStore(state=> state.addToFavorites)

  return (
    <TouchableOpacity 
      onPress={() => {
        if(type === 'Comprar'){
          addToCart(product)
      }else if(type === 'A Favoritos'){
        addToFavorites(product)
      }
    }}
      activeOpacity={0.6}
      style={type === 'A Favoritos' ? stylesButtonAdd.buttonToAdd : styleButtonBuy.buttonToCart}>
        <Text 
        style={type === 'A Favoritos' ? stylesButtonAdd.buttonToAddText : styleButtonBuy.buttonToCartText}>{type}</Text>
    </TouchableOpacity>
  )
}

export default CustomCartButton

const stylesButtonAdd = StyleSheet.create({
  buttonToAdd:{
    display: 'flex',
    opacity:.8,
    width: 150,
    height:50,
    backgroundColor:'#BB0C0C',
    padding:10,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'black',
        shadowOffset:{
            width:0,
            height:5,
        },
        shadowOpacity:.19,
        shadowRadius:3
  },
  buttonToAddText:{
    color:'white',
    fontSize:20,
    fontWeight:'600',
  },
})

const styleButtonBuy = StyleSheet.create({
  buttonToCart:{
    opacity:.8,
    width: 150,
    height:50,
    backgroundColor:'#00437E',
    padding:10,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'black',  
        shadowOffset:{
            width:0,
            height:5,
        },
        shadowOpacity:.19,
        shadowRadius:3
  },
  buttonToCartText:{
    color:'white',
    fontSize:20,
    fontWeight:'600',
  },
})