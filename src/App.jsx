import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import SellProduct from "./routes/sellproduct";
import CartPage from "./components/CartPage";
import Profile from "./routes/Profile";
import Loader from "./components/Loading";
import { Auth0Provider } from "@auth0/auth0-react";
import { CartProvider } from "./components/CartContext";

const domain = "chaitanya231971.jp.auth0.com";
const clientId = "F0FiBaJJrvFYewRS8DDCoXGXSPMYXYi1";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };

    fakeDataFetch();
  }, []);

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <CartProvider>
        {isLoading ? (
          <Loader setIsLoading={setIsLoading} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sellproduct" element={<SellProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Router>
        )}
      </CartProvider>
    </Auth0Provider>
  );
}

export default App;
