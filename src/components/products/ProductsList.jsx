import React, { useEffect, useState } from "react";
import ProductsListComponent from "../products/ProductsListComponent";
import { getProductsBySearch } from "../../utils/getProductsAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import NoProducts from "./NoProducts";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [prevSearchParams, setPrevSearchParams] = useState(null);


  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { updateLoaderStatus } = useLoader();

  // function to make api call to fetch the products based on a filter
  const fetchProducts = async (searchFilter) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch(searchFilter);

      if (res.status === "success") {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  // this useEffect hook reads the query parameters and create a filter to identify what products to fetch
  useEffect(() => {
    let filter = {};
    if (searchParams.size === 0) {
      navigate("/");
    }
    searchParams.forEach((value, key) => {
      if (value !== "shop all") {
        filter[key] = decodeURIComponent(value);
      }
    });

    const isSearchChange = prevSearchParams !== searchParams.toString();
    if (isSearchChange) {
      scrollToTop();
    }

    setPrevSearchParams(searchParams.toString());

    fetchProducts(filter);
    
  }, [searchParams]);

  




  
  const isEmpty = !Object.keys(products).length;

  return (
    <div>
      {isEmpty ? (
        <NoProducts />
      ) : (
        <ProductsListComponent products={products}  />
      )}
    </div>
  );
};

export default ProductsList;
