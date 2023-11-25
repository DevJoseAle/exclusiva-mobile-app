import { View, StatusBar, StyleSheet, Button, Text, ListRenderItem } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import CustomSpinner from "../components/shared/CustomSpinner"
import { useProducts } from "../api/hooks/useProducts"
import { useNavigation } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"

import HorizontalSlider from '../components/products/HorizontalSlider';
import React, { useEffect, useLayoutEffect } from "react"
import CustomHeader from "../components/shared/CustomHeader"
import AsyncStorage from "@react-native-async-storage/async-storage"

const HomeScreen  = () => {
  const navigation = useNavigation()
  const {top} = useSafeAreaInsets()
  const SCREENS = {
    PRODUCT: 'ProductScreen',
    HOME: 'HomeScreen',
  };
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>  <CustomHeader/>,
    })
  }, [navigation]);

  useEffect(() => {
    const viewStorage = async () => {
      try {
        // Obtén todas las claves almacenadas
        const keys = await AsyncStorage.getAllKeys();

        // Obtén los valores asociados a las claves
        const items = await AsyncStorage.multiGet(keys);

        // Visualiza el contenido
        items.forEach(([key, value]) => {
          console.log({key : value});
        });
      } catch (error) {
        console.error('Error al acceder al almacenamiento asíncrono:', error);
      }
    };

    // Llama a la función para visualizar el contenido cuando el componente se monta
    viewStorage();
  }, [])
  const{productosActuales, loading} = useProducts()

  if(loading){
    return <CustomSpinner />
  }
  return (
    
        <ScrollView style={{paddingTop: top + 40, flex: 1, backgroundColor: 'white'}} > 
            <View>
              {/*  TODO Cambiar esto por el contenido de las diversas cat */}
              <HorizontalSlider productosActuales={productosActuales} title="Carteras:" />
              <HorizontalSlider productosActuales={productosActuales} title="Accesorios:" />
              <HorizontalSlider productosActuales={productosActuales} title="Cadenas:" />
              <HorizontalSlider productosActuales={productosActuales} title="Collares:" />
              <HorizontalSlider productosActuales={productosActuales} title="Pulseras:" />
            </View>
        </ScrollView>
  )
}


const style = StyleSheet.create({
  container:{
    paddingTop: 15,
    backgroundColor: 'white',
    flex:1,
    flexDirection: 'row'
  },
  categoryTitle:{
    fontSize: 18,
    backgroundColor: 'white',
    flex:1,
  }
})
export default HomeScreen
