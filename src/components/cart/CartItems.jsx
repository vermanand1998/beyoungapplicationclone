import React from "react";
import CartItemCard from "./CartItemCard";
import { useCheckout } from "../../context/CheckoutContext";

const CartItems = () => {
  
  const {
    products,
    updateProducts,
  } = useCheckout();
  
 
//  function to remove a cart item from the local state
  const removeProductFromState = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.product._id !== productId
    );
    updateProducts(updatedProducts);
  };

  return (
    <div className="cart-items-container">
      {products.length &&
        products.map((product, i) => (
          <CartItemCard
            key={i}
            product={product}
            removeProductFromState={removeProductFromState}
            
          />
        ))}
    </div>
  );
};

export default CartItems;
