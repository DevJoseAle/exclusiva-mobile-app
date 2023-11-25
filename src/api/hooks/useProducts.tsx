import { useEffect, useState } from "react";
import getProducts from "../getProducts";
import { Products } from "../../../interfaces/homeProducts";


export const useProducts = () => {

    const [loading, setLoading] = useState(true)
    const [productosActuales, setProductosActuales] = useState<Products[]>([])

    const getProductsForHome = async() =>{

        const resp = await getProducts.get<Products[]>('/cde64cef-df0d-4f1d-9afc-1ae8f3a35198/product')
        setProductosActuales(resp.data);
        setLoading(false);
    }

       useEffect(() => {
         getProductsForHome();
       }, [])
       

    return {
        productosActuales,
        loading,
        setLoading
    }
}

