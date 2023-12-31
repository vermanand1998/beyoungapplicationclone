import { Navigate, Route, Routes } from "react-router";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartNumbersProvider } from "./context/CartItemNumbersContext";
import RoutesComponent from "./components/RoutesComponent";
import CheckoutComponent from "./components/checkout/CheckoutComponent";
import CartItems from "./components/cart/CartItems";
import ShippingSection from "./components/checkout/ShippingSection";
import PaymentSection from "./components/checkout/PaymentSection";
import CartComponent from "./components/cart/CartComponent";
import { CheckoutProvider } from "./context/CheckoutContext";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { ErrorProvider } from "./context/ErrorContext";
import Error404 from "./components/Error404";
import { SuccessModalProvider } from "./context/SuccessModalContext";
import SuccessModal from "./components/checkout/SuccessModal";

function App() {
  return (
    <>
      <AuthProvider>
        <CartNumbersProvider>
          <CheckoutProvider>
            <LoaderProvider>
              <ErrorProvider>
                <SuccessModalProvider>
                  <Routes>
                    <Route  path="/cart"  element={<ProtectedRoute Component={<CartComponent />} />}/>
                    <Route path="/checkout" element={<ProtectedRoute Component={<CheckoutComponent />} /> }>
                      <Route index element={<Navigate to="shipping" />} />
                      <Route path="shipping" element={<ShippingSection />} />
                      <Route path="payment" element={<PaymentSection />} />
                    </Route>
                    <Route path="*" element={<RoutesComponent />} />
                  </Routes>

                  <ToastContainer autoClose={3000} position="bottom-left" />
                  <Loader />
                  <Error404 />
                  <SuccessModal />
                </SuccessModalProvider>
              </ErrorProvider>
            </LoaderProvider>
          </CheckoutProvider>
        </CartNumbersProvider>
      </AuthProvider>
    </>
  );
}

export default App;
