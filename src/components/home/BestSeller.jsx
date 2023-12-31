import React, { useEffect, useState } from 'react'
import ProductSlider from './product_card/ProductSlider';
import { getProductsBySearch } from '../../utils/getProductsAPI';
import { useLoader } from '../../context/LoaderContext';

const BestSeller = () => {
    const [products, setProducts] = useState([]);
    const {updateLoaderStatus} = useLoader()


    // function to make api call to fetch the products
    const fetchProducts = async () => {
      const filter = {
        sellerTag: 'best seller'
      }
      try {
        updateLoaderStatus(true)
          const res = await getProductsBySearch(filter);
          if (res.status==='success') {
            setProducts(res.data)
          }else{
            setProducts({})
          }
      } catch (error) {}finally{
        updateLoaderStatus(false)
      }
    };
  
    useEffect(() => {
      fetchProducts();
      
    }, []);
  return (
    <div className='best-seller-container'>
        <ProductSlider products={products} heading={'best seller'}/>
    </div>
  )
}

export default BestSeller