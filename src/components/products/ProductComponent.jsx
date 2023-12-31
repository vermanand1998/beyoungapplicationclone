import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../utils/getProductsAPI";
import "../../styles/productcomponent.css";
import {
  CircularProgress,
  Divider,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BestSeller from "../home/BestSeller";
import { useAuth, useUpdateLoginModalStatus } from "../../context/AuthContext";
import { addItemToCart } from "../../utils/cartAPI";
import { useUpdateCartNumbers } from "../../context/CartItemNumbersContext";
import { toast } from "react-toastify";
import { useLoader } from "../../context/LoaderContext";
import { useCheckout } from "../../context/CheckoutContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ProductComponent = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  const loginStatus = useAuth();
  const updateCartNumbers = useUpdateCartNumbers();
  const setShowLoginModal = useUpdateLoginModalStatus();
  const { updateLoaderStatus } = useLoader();
  const { updateProducts, updateTotalItems, updateTotalPrice } = useCheckout();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [showZipValidation, setShowZipValidstion] = useState(false);

  const handleZIpChange = (e) => {
    setZipCode(e.target.value);
    setShowZipValidstion(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // function to make api call to fetch the product details
  const fetchProduct = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getProductById(id);
      setProduct(res);
      scrollToTop();
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    document.querySelectorAll(".product-details-box").forEach((box) => {
      box.querySelector("h5").addEventListener("click", () => {
        const content = box.querySelector(".collaps-content");

        content.classList.toggle("collapseContent");
      });
    });
  }, []);

  const [randomRating] = useState((Math.random() * 5).toFixed(1));

  const handleQtyChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setSelectedQty(newQuantity);
  };

  // function to add item to the cart if user is logged in
  // otherwise show login modal
  const handleAddToCart = async () => {
    if (loginStatus) {
      try {  
        setLoading(true);
        const res = await addItemToCart(id, selectedQty);
        if (res.status === "success") {
          toast.success(res.message);
          updateCartNumbers(res.results);
        } else if (res.status === "fail") {
          toast.error(res.message);
        } else {
          toast.error("Something went wrong, please try again later.");
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, see console for more detail.')
      } finally {
        setLoading(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  // function to place a item for individual item without adding to the cart by
  // updating the checkout context accordingly for current item
  const handleBuyNow = () => {
    if (loginStatus) {
      
      const chkoutproduct = [{
        quantity:selectedQty,
        product:{_id:id}
      }];
      updateProducts(chkoutproduct);
      updateTotalItems(1);
      updateTotalPrice(product.price * selectedQty);
      navigate("/checkout/shipping");
    } else {
      setShowLoginModal(true);
    }
  };

  const sizes = ["S", "M", "L", "XL"];

  const productDetailsHtml = { __html: product.description };
  return (
    <div className="product-component">
      <div className="main-product-container">
        <div className="left-side">
          {" "}
          <img style={{ width: "100%" }} src={product.displayImage} alt="" />
        </div>
        <div className="right-side">
          <section className="about-product">
            <h4 className="product-heading">{product.name}</h4>
            <span className="product-subcategory">{product.subCategory}</span>
            <p className="product-price">&#8377; {product.price}</p>
            <p style={{ color: "#878484", fontWeight: "600" }}>
              Inclusive of All Taxes + Free Shipping
            </p>
            <div className="product-rating">
              <Rating name="read-only" value={randomRating} readOnly />
              <p>{randomRating}</p>
            </div>
            <div className="product-discount">
              <DiscountIcon />
              <span>Extra ₹100 OFF on ₹999 (Code:BEYOUNG100)</span>
            </div>
            <div className="sizes-section">
              <p style={{ margin: "3rem 0 0.4rem 0" }}>SIZE</p>
              <RadioGroup
                row
                name="size"
                sx={{ marginLeft: "8px" }}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizes.map((size) => (
                  <FormControlLabel
                    className={`size-label ${
                      selectedSize === size ? "active-size" : ""
                    }`}
                    key={size}
                    value={size}
                    control={<Radio sx={{ display: "none" }} color="default" />}
                    label={size}
                  />
                ))}
              </RadioGroup>
            </div>
            <div className="qty-section">
              <label htmlFor="quantity">QTY:</label>
              <select
                name="quantity"
                id="quantity"
                value={selectedQty}
                onChange={handleQtyChange}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-buttons">
              <button
                onClick={handleAddToCart}
                style={{ backgroundColor: "#51CCCC", color: "white" }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <>
                    <AddShoppingCartIcon />
                    <span>Add to cart</span>
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                style={{ backgroundColor: "#F9EB28" }}
              >
                <ShoppingCartCheckoutIcon />
                <span>Buy Now</span>
              </button>
            </div>
            <div className="delivery-options">
              <h4>delivery options</h4>
              <section className="delivery-options-box">
                <p>
                  Enter your Pincode to check the delivery time and free pick up
                  options
                </p>
                <div>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    value={zipCode}
                    onChange={handleZIpChange}
                  />{" "}
                  <button onClick={() => setShowZipValidstion(true)}>
                    check
                  </button>
                </div>
                {showZipValidation && (
                  <label>
                    {zipCode.length === 6 ? (
                      <>
                        <CheckCircleIcon
                          sx={{ color: "green", width: "2rem" }}
                        />
                        Free delivery available at {zipCode}
                      </>
                    ) : (
                      <>
                        <CancelIcon sx={{ color: "red", width: "2rem" }} />
                        Invalid Pincode
                      </>
                    )}
                  </label>
                )}
                <label>
                  <img
                    style={{ width: "2rem" }}
                    src="https://www.beyoung.in/desktop/images/product-details-2/cod.jpg"
                    alt="cod"
                  />
                  Cash On Delivery
                </label>
                <label>
                  <img
                    style={{ width: "2rem" }}
                    src="https://www.beyoung.in/desktop/images/product-details-2/ship.jpg"
                    alt="cod"
                  />
                  Express Shipping
                </label>
              </section>
            </div>
          </section>
        </div>
      </div>
      <div className="product-info-container">
        <h3>Product Details</h3>
        <div className="product-details-section">
          <div className="product-details-box">
            <h5>Product Description</h5>

            <div
              className="collaps-content"
              dangerouslySetInnerHTML={productDetailsHtml}
            />
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <ul className="collaps-content">
              <li>
                100% Bio-washed Cotton - makes the fabric extra soft & silky
              </li>
              <li>Precisely stitched with no pilling & no fading</li>
              <li>Provide all-time comfort. Anytime, anywhere</li>
              <li>
                Every cloth is tailored with regular fit over years of testing
              </li>
              <li>
                Elasticated Waistband - adjustable drawstring for better fitting
              </li>
              <li>
                Zero Pilling - absolutely no presence of fuzzballs on the fabric
              </li>
            </ul>
          </div>

          <div className="product-details-box">
            <h5>Delivery & Return Policy</h5>
            <div className="collaps-content">
              We provide free shipping on all orders. Pay online to avoid
              charges of ₹50/product applicable on COD orders. The return or
              exchange can be done within 15 days after delivery. Every delivery
              from Beyoung is processed under excellent condition and in the
              fastest time possible. For our beloved customer's care, we give
              contactless delivery. Refer to FAQ for more information.
            </div>
          </div>
        </div>
      </div>
      <div className="ratings-review-container">
        <h3>Rating & Reviews</h3>
        <div className="ratings-review-section">
          <div className="review-section-left">
            <h3>{randomRating}</h3>
            <Rating name="read-only" value={5} readOnly />
            <p>Based on 31K+ ratings and 9K+ reviews</p>
          </div>
          <div className="review-section-right">
            <h4>Product reviews</h4>
            <p>
              <ThumbUpIcon />
              91% of customers recommend this brand
            </p>
            <Divider sx={{ marginBottom: "2rem" }} />
            <div className="rating-bar">
              <span>5</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={80}
              />
              <span>80+</span>{" "}
            </div>
            <div className="rating-bar">
              <span>4</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={10}
              />
              <span>10+</span>{" "}
            </div>
            <div className="rating-bar">
              <span>3</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={7}
              />{" "}
              <span>7+</span>
            </div>
            <div className="rating-bar">
              <span>2</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={3}
              />{" "}
              <span>3+</span>
            </div>
            <div className="rating-bar">
              <span>1</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={1}
              />{" "}
              <span>1+</span>
            </div>
          </div>
        </div>
      </div>
      <BestSeller />
      <div className="about-us-container">
        <ul>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon1.jpg"
              alt="1.5M+ Happy Beyoungsters"
            />
            <p>1.5M+ Happy Beyoungsters</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon2.jpg"
              alt="15 Days Easy Returns"
            />
            <p>15 Days Easy Returns</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon3.jpg"
              alt="Homegrown Brand"
            />
            <p>Homegrown Brand</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon4.jpg"
              alt="Packed with Safety"
            />
            <p>Packed with Safety</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductComponent;
