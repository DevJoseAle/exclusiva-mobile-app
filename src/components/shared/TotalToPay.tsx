import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import { useCartStore } from "../../stores/useCart";



const totalToPay = () =>{

    const [totalAPagar, setTotalAPagar] = useState(0)
    const totalToPay = useCartStore(state=> state.totalToPay)

    useEffect(() => {
        setTotalAPagar(totalToPay)
    }, [totalToPay])
    

    return(
      <View style={styles.totalToPay}>
  
        <Text style={styles.totalToPayText}> Total a Pagar:</Text>
        <Text style={styles.totalPrice}> {totalAPagar}</Text>
      </View>
    )
  }
export default totalToPay;

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
      
    },
    totalToPay:{
      marginTop:10,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      display:'flex',
      flexDirection:'row',
      paddingHorizontal:10,
      borderRadius:50,
      backgroundColor:'#056AC2',
      margin:'auto',
      width:'100%', 
      height:40
    },
    totalToPayText:{
      color:'white',
      fontSize:20
    },
    totalPrice:{
      color:'white',
      fontSize:20,
      fontWeight:'bold'
    }
  })
  