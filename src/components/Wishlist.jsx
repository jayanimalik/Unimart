import React from "react";
import { useWishlist } from "./WishlistContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const renderWishlistItems = () => {
    return wishlist.map((item) => (
      <div key={item._id} className="wishlist-item">
        <img src={item.imageUrl} alt={item.productName} className="wishlist-image" />
        <div className="wishlist-details">
          <h2>{item.productName}</h2>
          <p>{item.description}</p>
          <p>Hostel: {item.hostel}</p>
          <p>Price: ₹{item.price}</p>
          <button className="chat-button">Start Chatting</button>
          <button className="remove-button" onClick={() => removeFromWishlist(item._id)}>✖</button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <h1>Wishlist</h1>
        {wishlist.length > 0 ? renderWishlistItems() : <p>Your Wishlist is empty</p>}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
