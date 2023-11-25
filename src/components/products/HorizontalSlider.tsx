import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import { Products } from '../../../interfaces/homeProducts'

interface Props {
    productosActuales: Products[],
    title: string
}
const HorizontalSlider = ({productosActuales, title}:Props) => {
    
  return (
    <View style={styles.container}>
        <Text style={styles.titleFlatlist}>{title}</Text>
        <FlatList
            data={productosActuales as Products[]}
            renderItem={({item}: any) => (
            <ProductCard product={item} />
            )}
            horizontal= {true}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            
            
        />

  </View>
  )
}

export default HorizontalSlider

const styles = StyleSheet.create({
    container:{ 
        paddingTop: 10,
        width: '100%', 
        height: 300,
        backgroundColor:'white'
    }, 
    titleFlatlist:{
        paddingLeft: 15,
        fontSize: 20,
        fontWeight: 'bold',
    }
})