import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Products } from '../../interfaces/homeProducts'
import { Toast, useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface State{
    cart: Products[],
    totalToPay: number,
    totalItems: number
  
}

const INITIAL_STATE: State =  {
  cart:[],
  totalToPay: 0,
  totalItems: 0
}

interface Actions{
  removeFromCart: (productId: Products) => void,
  addToCart: (product: Products) => void,

}

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalToPay: INITIAL_STATE.totalToPay,
      totalItems: INITIAL_STATE.totalItems,
    
    
      //Agregar al Carrito
      addToCart: (product: Products) => {
    
    
        const cart = get().cart
    
        //Encuentra el id igual
        const cartItem = cart.find(item => item.id === product.id)
    
        //Si existe
        if(cartItem){
          Toast.show('Producto ya está en carrito', {
            type: 'warning',
            duration: 1000,
          })
          // const updatedCart = cart.map( item => 
          //   item.id === product.id 
          //     ? {...item, quantity:(item.quantity as number) + 1}
          //     : item
          //     )
    
          // set(state =>({
          //   cart: updatedCart,
          //   totalToPay: state.totalToPay + Number(product.price),
          //   totalItems: state.totalItems + 1
          // }))
        }else{
          set(state => ({
            cart: [...state.cart, {...product, quantity: 1}],
            totalToPay: state.totalToPay + Number(product.price),
            totalItems: state.totalItems + 1
          }))
          Toast.show('Agregado al carrito', {
            type: 'success',
            duration: 1000,
          })
        }
  
      },
    
      
      //Eliminar unidad
      removeFromCart: async(product: Products) => {
        await removeItem(product.id)
        set(state => ({
          cart: state.cart.filter(item => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalToPay: state.totalToPay - product.price,
        }))
        

       }
    }),
    {
       name: 'cart-store',
     storage: createJSONStorage(()=>AsyncStorage),
    }
  )
)
  



//Funciones para borrar del LocalStorage
const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Elemento con clave ${key} eliminado de AsyncStorage.`);
  } catch (error) {
    console.error('Error al intentar eliminar el elemento:', error);
  }
};