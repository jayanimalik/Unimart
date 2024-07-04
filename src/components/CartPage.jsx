import React from "react";
import { useCart } from "../components/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleUpdateQuantity = (itemId, change) => {
    const item = cart.find((item) => item._id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= item.stock) {
        updateQuantity(itemId, change);
      }
    }
  };

  const renderCartItems = () => {
    return cart.map((item) => (
      <div key={item._id} className="cart-item">
        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
        <div className="cart-details">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: {item.price}</p>
          <div className="quantity-controls">
            <button onClick={() => handleUpdateQuantity(item._id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleUpdateQuantity(item._id, 1)}>+</button>
          </div>
          <button className="remove-button" onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Cart</h1>
        {cart.length > 0 ? renderCartItems() : <p>Your cart is empty</p>}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
