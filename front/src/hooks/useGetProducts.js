import { useEffect, useState } from "react"
import { getProducts } from "../api/product"

export default function useGetProducts(){
    const [products, setProducts] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        getProducts().then(data =>{
            const proccesData = data?.map((el)=>{
                return {
                    id: el._id,
                    name: el.name,
                    stock: el.stock,
                    stock_alert: el.stock_alert,
                    category: el.category?.name,
                    key: el._id
                }
            })
            setProducts(proccesData)
        })
    }, [refreshKey])

    const refreshProducts = () => {
        setRefreshKey(prev => prev + 1)
    }

    return { products, refreshProducts }
}