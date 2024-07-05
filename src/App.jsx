import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import SellProduct from "./routes/sellproduct";
import Wishlist from "./components/Wishlist";
import Profile from "./routes/Profile";
import Loader from "./components/Loading";
import { Auth0Provider } from "@auth0/auth0-react";
import { WishlistProvider } from "./components/WishlistContext";

const domain = "chaitanya231971.jp.auth0.com";
const clientId = "F0FiBaJJrvFYewRS8DDCoXGXSPMYXYi1";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3500);  // Reduced delay for better user experience
    };

    fakeDataFetch();
  }, []);

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <WishlistProvider>
        {isLoading ? (
          <Loader setIsLoading={setIsLoading} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sellproduct" element={<SellProduct />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Router>
        )}
      </WishlistProvider>
    </Auth0Provider>
  );
}

export default App;
