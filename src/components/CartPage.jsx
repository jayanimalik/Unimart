// CartPage.jsx
import React from "react";
import { useCart } from "../components/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const renderCartItems = () => {
    return cart.map((item) => (
      <div key={item.id} className="cart-item">
        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
        <div className="cart-details">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: {item.price}</p>
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
          <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
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



// // CartPage1.jsx
// import React from "react";
// import { useCart } from "../components/CartContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "./CartPage.css";

// const CartPage = () => {
//   const { cart, removeFromCart } = useCart();

//   const renderCartItems = () => {
//     return cart.map((item) => (
//       <div key={item.id} className="cart-item">
//         <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
//         <div className="cart-details">
//           <h2>{item.name}</h2>
//           <p>{item.description}</p>
//           <p>Price: {item.price}</p>
//           <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="cart-container">
       
//         {cart.length > 0 ? renderCartItems() : <p>Your cart is empty</p>}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;







// // CartPage.jsx
// import React from "react";
// import { useCart } from "../components/CartContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "./CartPage.css";

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();

//   const renderCartItems = () => {
//     return cart.map((item) => (
//       <div key={item.id} className="cart-item">
//         <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
//         <div className="cart-details">
//           <h2>{item.name}</h2>
//           <p>{item.description}</p>
//           <p>Price: {item.price}</p>
//           <div className="quantity-controls">
//             <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//             <span>{item.quantity}</span>
//             <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//           </div>
//           <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="cart-container">
//         <h1>Cart</h1>
//         {cart.length > 0 ? renderCartItems() : <p>Your cart is empty</p>}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;

