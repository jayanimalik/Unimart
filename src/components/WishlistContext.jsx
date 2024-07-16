// WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig'; // Your Firebase configuration file

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/wishlist/${user.uid}`);
          setWishlist(response.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (item) => {
    if (user) {
      try {
        const response = await axios.post('http://localhost:5000/api/wishlist/add', {
          ...item,
          userId: user.uid,
        });
        setWishlist([...wishlist, response.data]);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.warn('Item already in wishlist');
        } else {
          console.error('Error adding to wishlist:', error);
        }
      }
    }
  };

  const removeFromWishlist = async (itemId) => {
    if (user) {
      try {
        await axios.delete(`http://localhost:5000/api/wishlist/remove/${itemId}`);
        setWishlist(wishlist.filter((item) => item._id !== itemId));
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
