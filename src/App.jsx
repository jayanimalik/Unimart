// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import SellProduct from "./routes/sellproduct";
import Wishlist from "./components/Wishlist";
import Profile from "./routes/Profile";
import Loader from "./components/Loading";
import { WishlistProvider } from "./components/WishlistContext";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const emailDomain = currentUser.email.split('@')[1];
        if (emailDomain !== 'thapar.edu') {
          await signOut(auth);
          localStorage.removeItem("user");
          setUser(null);
        } else {
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      }
      setIsLoading(false);
    });

    // Check if user data exists in local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
    } else {
      setIsLoading(false); // No stored user, authentication not complete
    }

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <WishlistProvider>
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
    </WishlistProvider>
  );
}

export default App;
