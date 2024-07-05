import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = "someUserId"; // Replace with actual user ID
        const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    try {
      const userId = "someUserId"; // Replace with actual user ID
      const response = await fetch("http://localhost:5000/api/wishlist/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, userId }),
      });
      if (response.ok) {
        setWishlist((prevWishlist) => [...prevWishlist, { ...product, userId }]);
      } else {
        console.error("Failed to add product to wishlist");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/remove/${wishlistItemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== wishlistItemId));
      } else {
        console.error("Failed to remove product from wishlist");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
