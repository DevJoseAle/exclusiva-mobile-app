import { create } from 'zustand'
import { Products } from '../../interfaces/homeProducts'
import { Toast } from 'react-native-toast-notifications'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface FavoriteState{
    favoritesProducts: Products[]
    addToFavorites: (product: Products) => void
    removeFromFavorites: (productId: string) => void
}


export const useFavoritesStore = create<FavoriteState>()(
    persist(

        (set, get) => ({
            favoritesProducts:[],
            
            addToFavorites: (product: Products) => {
                
                const favorites = get().favoritesProducts;
                
                if(favorites.find(item => item.id === product.id)){
                    Toast.show('Producto ya está en favoritos', {
                        type: 'danger',
                        duration: 1000,
                    })
                    return;
                }else{
                    
                    set(state => ({
                        favoritesProducts: [...state.favoritesProducts, product]
                    }))
                    
                    Toast.show('Producto agregado a favoritos', {
                        type: 'success',
                        duration: 1000,
                    })
                }
                
            },
            removeFromFavorites: (productId: string) => {
                removeItemFromFavorites(productId)
                set(state => ({
                    favoritesProducts: state.favoritesProducts.filter(product => product.id !== productId)
                }))
            }
        }),
        {
            name:'favorites-products',
            storage: createJSONStorage(() => AsyncStorage),
        }
    ),
)
        
const removeItemFromFavorites = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Elemento con clave ${key} eliminado de AsyncStorage.`);
    } catch (error) {
      console.error('Error al intentar eliminar el elemento:', error);
    }
  };