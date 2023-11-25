import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native'
import React from 'react'

const CustomSpinner = () => {
    return(
        <SafeAreaView style={{
          flex:1
  
        }}>
          <View style={{
            display: 'flex',
            alignItems:'center',
            backgroundColor:'white',
            width: '100%',
            height: '100%'
          }}>
            <ActivityIndicator 
              style={{marginTop:125}} 
              color='#5C4D08' 
              size={'large'}
              animating={true}
            />
            <Text
              style={{ color:'#5C4D08'}}>
              Cargando Productos
            </Text>
          </View>
        </SafeAreaView>
      )
    }
  

export default CustomSpinner