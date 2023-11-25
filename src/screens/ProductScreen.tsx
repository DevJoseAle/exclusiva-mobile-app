import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react'
import { Products } from '../../interfaces/homeProducts'
import { StackScreenProps } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../types/NavigationTypes';
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../components/shared/CustomCartButton';
import CustomCartButton from '../components/shared/CustomCartButton';
import Icon  from 'react-native-vector-icons/Ionicons';
import { useFavoritesStore } from '../stores/useFavoritesProducts';
import { useCartStore } from '../stores/useCart';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

const ProductScreen = ({route}: Props) => {

  const product = route.params as unknown as Products;
  const navigation =useNavigation()
  
  const productPrice = parseInt(product.price.toString())
  const formatPrice = productPrice.toLocaleString('es-CL', {
    style: 'currency',
    currency:'CLP',
    minimumFractionDigits: 0
  })

  const addToFavorite = useFavoritesStore(state=> state.addToFavorites)

  const addToCart = useCartStore(state=> state.addToCart)
  return (
      <ScrollView style={styles.scrollcontainer}>
        <TouchableOpacity 
          style={{
            position: 'absolute', 
            flex:1,
            top:65, 
            zIndex:1,
            }}
            onPress={ ()=> navigation.goBack()}>
          <Icon name='arrow-back-circle-outline'size={44} color='gray' />
        </TouchableOpacity>
        <SafeAreaView style={styles.container}>

        <Image
          source={{uri: product.images[0].url}}
          width={100}
          height={100}
          style={styles.imageContainer}
          />
        </SafeAreaView>
        <View style={styles.detailsContainer}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}> {product.name} </Text>
            <Text style={styles.price}> {`${formatPrice} - CLP`}</Text>
          </View>
          <View style={styles.productDetailsContainer}>
            <Text style={styles.descriptionTitle}> Descripcion de Producto:</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <CustomCartButton type='Comprar' product={product} />
          <CustomCartButton type='A Favoritos' product={product}/>
        </View >
      </ScrollView>
  )
}

export default ProductScreen

const styles =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  scrollcontainer:{
    flex:1,
    backgroundColor:'white',
  },
  imageContainer:{
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  detailsContainer:{
    marginLeft:10,
    backgroundColor:'white'
  },
  titleContainer:{
    // backgroundColor:'green',

  },
  title:{
    fontWeight:'600',
    fontSize: 25,
    paddingBottom:5
  },
  price:{
    fontWeight:'600',
    fontSize: 25,
    paddingBottom:5,
    fontStyle:'italic',
    color:'#3E3E3E'
    
  },
  productDetailsContainer:{
    paddingTop:5,
    width:'100%', 
    height:130
  },
  descriptionTitle:{ 
    width:'100%',
    textAlign: 'center',
    height:25,
    fontSize:20,
    paddingBottom:30,
    textDecorationLine:'underline',
    fontWeight:'bold',
    color:'#3E3E3E',

  },
  productDescription:{
    color:'#3E3E3E',
    paddingHorizontal: 15,
    paddingRight:35,
    paddingVertical:10,
    textAlign:'justify'
  },
  buttonContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap: 10
  } 
})