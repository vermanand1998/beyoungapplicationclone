import React, { useEffect, useState } from "react";
import { clearWishList, getWishlistItems } from "../../utils/wishListAPI";
import { useLoader } from "../../context/LoaderContext";
import WishlistCard from "./WishlistCard";
import emptyImage from "../../assets/EMPTY-WISHLIST-PAGE.jpg";
import { toast } from "react-toastify";
import { useUpdateWishlistNumbers } from "../../context/CartItemNumbersContext";

const WishList = () => {
  const [products, setProducts] = useState([]);

  const { updateLoaderStatus } = useLoader();
  const updateWishlistNumbers = useUpdateWishlistNumbers();


  // function to remove a wishlist item fromlocal state
  const removeProductFromState = (productId) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);
  };

  // function to make api call to fetch wishlist items
  const fetchproducts = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getWishlistItems();
      if (res.status === "success") {
        setProducts(res.data.items);
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  // functiopn to make api call to delete all items from the wishlist
  const clearAllWishlist = async () => {
    try {
      const res = await clearWishList();

      if (res.status == "success") {
        setProducts([]);
        updateWishlistNumbers(0);
      } else {
        toast.error("There's an error, check console for more detail!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    fetchproducts();
    scrollToTop();
  }, []);
  return (
    <div className="wishlist-section">
      {products.length>0 && (
        <button onClick={clearAllWishlist}>Clear wishlist</button>
      )}
      {products.length === 0 ? (
        <img
          style={{ width: "70%", margin: "0 auto" }}
          src={emptyImage}
          alt="empty-wishlist"
        />
      ) : (
        <div className="wishlist-container">
          {products.map((product, i) => (
            <WishlistCard
              key={i}
              product={product}
              removeProductFromState={removeProductFromState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
