import React, { createContext, useContext, useState } from "react";

const cartNumberContext = createContext();

export function CartNumbersProvider({ children }) {
  const [cartNumbers, setCartNumbers] = useState(parseInt(localStorage.getItem("cartItemNums")) || 0);
  const [wishlistNumbers, setWishlistNumbers] = useState(parseInt(localStorage.getItem("wishlistNumbers")) || 0);

  const updateCartNumbers = (newNum) => {
    setCartNumbers(newNum);
    localStorage.setItem('cartItemNums', newNum);
  };
  const updateWishlistNumbers = (newNum) => {
    setWishlistNumbers(newNum);
    localStorage.setItem('wishlistNumbers', newNum);
  };

  return (
    <cartNumberContext.Provider value={{ cartNumbers, updateCartNumbers,updateWishlistNumbers,wishlistNumbers }}>
      {children}
    </cartNumberContext.Provider>
  );
}

// custom hooks to use or update the number of items in the wishlist or cart
export function useCartNumbers() {
  const context = useContext(cartNumberContext);
  return context.cartNumbers;
}
export function useUpdateCartNumbers() {
  const context = useContext(cartNumberContext);
  return context.updateCartNumbers; 
}
export function useWishlistNumbers() {
  const context = useContext(cartNumberContext);
  return context.wishlistNumbers;
}
export function useUpdateWishlistNumbers() {
  const context = useContext(cartNumberContext);
  return context.updateWishlistNumbers; 
}
