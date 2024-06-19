import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import { Auth0Provider } from "@auth0/auth0-react";
import SellProduct from "./routes/sellproduct";
import CartPage from './components/CartPage';
//import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./routes/Profile";
import { CartProvider } from './components/CartContext';

const domain = "chaitanya231971.jp.auth0.com";
const clientId = "F0FiBaJJrvFYewRS8DDCoXGXSPMYXYi1";

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <CartProvider>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sellproduct" element={<SellProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={ <CartPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </Auth0Provider>
  );
}

export default App;
