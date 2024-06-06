import "./styles.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import About from "./routes/About";
import Join from "./routes/Cart";
import { Auth0Provider } from "@auth0/auth0-react";
import Sellproduct from "./routes/sellproduct";
import Profile from "./components/Profile";

const domain = "chaitanya231971.jp.auth0.com";
const clientId = "F0FiBaJJrvFYewRS8DDCoXGXSPMYXYi1";

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
    redirectUri={window.location.origin}
    >
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/join" element={<Join />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<About />}></Route>
            <Route path="/sellproduct" element={<Sellproduct />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Auth0Provider>
  );
}

export default App;