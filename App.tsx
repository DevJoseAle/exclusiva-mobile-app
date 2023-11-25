import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from './src/components/shared/CustomHeader';
import CartScreen from './src/screens/CartScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import ProductScreen from './src/screens/ProductScreen';
import { RootStackParams } from './types/NavigationTypes';

 
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ToastProvider } from 'react-native-toast-notifications';
import { View, Text } from 'react-native';
import { useCartStore } from './src/stores/useCart';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParams>()

interface BadgeProps{
  count?: number
}


const CartBadge = ({ count }: BadgeProps ) => (
  <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', borderRadius: 10, padding: 5, width:10, height:10 }}>
    <Text style={{ color: 'white', fontSize:10}}>{count}</Text>
  </View>
);
function TabNavigator(){
  const cartLength = useCartStore(state => state.cart.length)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#887020',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen 
        name="HomeScreen" 
        component={HomeStackNavigator} 
        
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
          header: () =>  <CustomHeader/>,
        }}/>
      <Tab.Screen 
        name="Favoritos" 
        component={FavoritesScreen} 
        options={{ 
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" size={size} color={color} />
          )
        }}/>
      <Tab.Screen 
        name="Carrito" 
        component={CartScreen}
        options={{ 
          tabBarIcon: ({color, size}) => (
            <View>

            <Icon 
              name="cart-outline" 
              size={size} 
              color={color} 
              />
              {
                cartLength > 0 
                ?<CartBadge
                  count={cartLength}
                />
                :null
              }
            </View>
          )
        }}
        />
      <Tab.Screen 
        name="Perfil" 
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }} />
    </Tab.Navigator>
);
}

//STACK 
function HomeStackNavigator(){
  return(
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen}  options={{
          header: () =>  <CustomHeader/>,
          
        }}/>
      <Stack.Screen 
        name="ProductScreen" 
        component={ProductScreen} 
        options={{
        headerShown: false,
        
      }}/>
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <ToastProvider
      successColor= '#056AC2'>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </ToastProvider>


  )
};

export default App