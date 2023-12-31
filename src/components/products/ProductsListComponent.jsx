import React, { useEffect, useState } from "react";
import ProductSliderCard from "../home/product_card/ProductSliderCard";
import "../../styles/productlist.css";
import { useSearchParams } from "react-router-dom";
import FilterCustomDropdown from "./FilterCustomDropdown";
import { useMediaQuery } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import NoProducts from "./NoProducts";

const ProductsListComponent = ({ products }) => {
  const [searchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(1);

  const params = new URLSearchParams(searchParams);
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  const [collapsActive, setCollapsActive] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState(products);

  // set the page heading by reading query parameters
  let heading = "shop all";
  for (const value of params.values()) {
    if (value) {
      heading = value;
    }
  }

  // this function takes an array of objects and a key and returns unique values of that key from all the objects
  const uniqueValues = (arr, key) => {
    return [...new Set(arr.map((item) => item[key].toLowerCase()))];
  };
  // this function scans all the products and save the potential filters that can be applied to a state
  const getInitialFilter = (products) => {
    const subCategories = uniqueValues(products, "subCategory");
    const brands = uniqueValues(products, "brand");
    const colors = uniqueValues(products, "color");

    return {
      subCategory: subCategories,
      brand: brands,
      color: colors,
    };
  };
  
  const initialFilter = getInitialFilter(products);
  const [filterCriteria, setFilterCriteria] = useState(initialFilter);

  const [productsFilter, setProductsFilter] = useState({
    subCategory: [],
    brand: [],
    color: [],
  });

  
  // this function is responsible for filtering out the products based on user selection
  const applyFilter = () => {
    const { subCategory, brand, color } = productsFilter;
    const filteredResult = products.filter((product) => {
      const subCategoryFilter =
        subCategory.length === 0 ||
        subCategory.includes(product.subCategory.toLowerCase());
      const brandFilter =
        brand.length === 0 || brand.includes(product.brand.toLowerCase());
      const colorFilter =
        color.length === 0 || color.includes(product.color.toLowerCase());
      return subCategoryFilter && brandFilter && colorFilter;
    });

    setFilteredProducts(filteredResult);
  };

  // function to reset the filter
  const clearFilter = () => {
    setProductsFilter({
      subCategory: [],
      brand: [],
      color: [],
    });
    setFilteredProducts(products);
  };

  // clears the filter when products received from props changes means new products are getting rendered
  useEffect(() => {
    clearFilter();
    setFilteredProducts(products);
  }, [products]);

  // set the page number to 1 when any filter is applied and 
  // also sets the potensial filters that can be applied on the whole products array that is received from props
  useEffect(() => {
    const initialFilter = getInitialFilter(products);
    setFilterCriteria(initialFilter);
    setPageNo(1);
  }, [filteredProducts]);

  const itemsToDisplay = filteredProducts.slice(0, pageNo * 20); // render products based on the page number, in the multiply of 20
  const isEmpty = !Object.keys(filteredProducts).length;

  // function to load next 20 items by updating the page number
  const loadMore = () => {
    const newPage = pageNo + 1;
    setPageNo(newPage);
  };

  return (
    <div className="products-list-compo-container">
      <section className="product-list-section">
        <h3>{heading}</h3>
        <div className="products-container">
          <div className="product-filters">
            <section
              className="filters-heading"
              onClick={() => setCollapsActive(!collapsActive)}
            >
              <h5>Filters</h5>
              {isSmallScreen && <ExpandMoreIcon />}
            </section>

            <div
              className={`filters-container ${
                collapsActive ? "collaps-active" : ""
              }`}
            >
              <FilterCustomDropdown
                values={filterCriteria.brand}
                type={"brand"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <FilterCustomDropdown
                values={filterCriteria.subCategory}
                type={"subCategory"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <FilterCustomDropdown
                values={filterCriteria.color}
                type={"color"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <div className="filter-btn">
                <button id="filter-btn" onClick={applyFilter}>
                  apply
                </button>
                <button id="filter-btn" onClick={clearFilter}>
                  clear
                </button>
              </div>
            </div>
          </div>

          <div className="product-list-container">
            <div className="product-list-cards-container">
              {isEmpty ? (
                <NoProducts />
              ) : (
                products.length &&
                itemsToDisplay.map((product, i) => (
                  <ProductSliderCard key={i} product={product} />
                ))
              )}
            </div>
             {!isEmpty && (
              <button
                onClick={loadMore}
                disabled={itemsToDisplay.length === filteredProducts.length}
              >
                <span>Load More</span>
                <ExpandCircleDownIcon />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsListComponent;
