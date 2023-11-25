import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Products } from '../../../interfaces/homeProducts';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../stores/useCart';



interface CardProps{
    product: Products;
}

const ProductCard = ({product}: CardProps) => {

    const addToCart = useCartStore(state=> state.addToCart)
    const navigation = useNavigation<any>()
    const {
        id,
        price: productPrice,
        name, images:[url], 
        category:{name: categoryName},
        subcategory:{name: subCategoryName} 
    }: Products = product
    
    const precio = parseInt(productPrice.toString());
    const formatPrice = precio.toLocaleString('es-CL', {
        style: 'currency',
        currency:'CLP',
        minimumFractionDigits: 0
        });

    if(categoryName.length === 0){
        return; 
    }

    
  return (
    <TouchableOpacity 
        activeOpacity={0.76}
        style={styles.cardContainer}
        onPress={() => {navigation.navigate('ProductScreen',  product) }}
        >
      <View>
        <View style={styles.textContainer}>
            <Image
                style={styles.imageProduct}
                source={{uri: url.url}}
                
                />
                <View style={styles.textContainer}>
                    <Text style={styles.category}> {categoryName} </Text>
                    <Text style={styles.productTitle}> {name}</Text>
                    <Text style={styles.price}> CLP: {formatPrice}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={ () => addToCart(product) }
                    >
                    <Text style={styles.addbuttontitle}>Agregar</Text>
                </TouchableOpacity>
            </View>
    </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    cardContainer:{
        display: 'flex',
        borderRadius: 10,
        margin: 4,
        marginLeft:6,
        backgroundColor:'#FFFFFF',
        height:250,
        width: 170,
        borderWidth:0.1,
        shadowColor:'grey',
        shadowOffset:{
            width:2,
            height:4,
        },
        shadowOpacity:.3,
        shadowRadius:7
        
        
    },
    category:{
        fontSize: 12,
        fontStyle:'italic',
        paddingBottom:2   
    },
    productTitle:{
        fontWeight:'500',
        color:'#3E3E3E',
        textAlign:'center',
        marginTop: 2
  
    },
    textContainer:{
        flexDirection:'column',
        alignItems:'center',
        paddingTop:5,
        marginTop: 2
    },
    price:{
        fontWeight:'bold',
        color:'black',

    },
    imageProduct:{
        marginTop:5,
        alignSelf:'center',
        width: 90,
        height: 110
    },
    likeButtonCard:{
        position: 'absolute',
        right:0
    },
    addbuttontitle:{
        color: 'black',
        fontWeight:'bold',

    },
    addButton:{
        position:'relative',
        bottom:0,
        borderRadius: 100,
        backgroundColor:'#FFB846',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,
        width:140,
        height: 25,
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:.09,
        shadowRadius:1
    }
})