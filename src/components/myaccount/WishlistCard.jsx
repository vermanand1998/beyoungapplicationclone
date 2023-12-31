import { Stack, Typography } from '@mui/material'
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useLoader } from '../../context/LoaderContext';
import { removeFromWishlist } from '../../utils/wishListAPI';
import { toast } from 'react-toastify';
import { useUpdateCartNumbers, useUpdateWishlistNumbers } from '../../context/CartItemNumbersContext';
import { addItemToCart } from '../../utils/cartAPI';
import { Link } from 'react-router-dom';

const WishlistCard = ({product,removeProductFromState}) => {
    
  const itemid = product._id
    
  const {products:{displayImage,_id,name,price }} = product;
  // console.log(product);
  const { updateLoaderStatus } = useLoader();
  const updateNumbers = useUpdateWishlistNumbers()
  const updateCartNumbers = useUpdateCartNumbers();


  // function to make api call to remove an item from the wishlist 
  const handleRemoveItem = async ()=>{
      try {
          updateLoaderStatus(true)
          const res = await removeFromWishlist(_id)
          if (res.status==='success') {
              toast.success(res.message)
              updateNumbers(res.results)
              removeProductFromState(itemid)
          }else if(res.status==='fail'){
              toast.error(res.message)
          }
      } catch (error) {
          
      }finally{
          updateLoaderStatus(false)
      }
  }

  // function to delete an iten from the wishlist and add to the cart
  const moveToCart = async()=>{
      try {
        updateLoaderStatus(true)
        const res = await addItemToCart(_id, 1);
        

        if (res.status==='success') {
          toast.success(res.message)
          handleRemoveItem()
          updateCartNumbers(res.results)
        } else if(res.status==='fail'){
          toast.error(res.message)
        }else{
          toast.error('Something went wrong, please try again later.')
        }
      } catch (error) {
          
      }finally{
          updateLoaderStatus(false)
      }
  }
  return (
    <div className='wishlist-card'>
        <Stack spacing={0.7}>
            <Link to={`/products/${_id}`}><img src={displayImage} alt={name} style={{width:'100%',borderRadius:'5px'}} /></Link>
            <Typography sx={{textOverflow:'ellipsis',whiteSpace:'nowrap',display:'inline-block',overflow:'hidden'}} variant='subtitle1'>{name}</Typography>
            <Typography sx={{fontWeight:'600'}} variant='subtitle1'>&#8377; {price}</Typography>
            <button onClick={moveToCart} className='move-to-cart-btn'><AddShoppingCartIcon/>Move To Cart</button>
        </Stack>
        <button onClick={handleRemoveItem} className='remove-from-wish-btn'>X</button>
    </div>
  )
}

export default WishlistCard