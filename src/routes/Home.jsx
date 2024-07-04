import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import "./Home.css";

const Home = () => {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const renderProducts = () => {
    return products.map((product) => {
      const cartItem = cart.find((item) => item._id === product._id);
      const cartQuantity = cartItem ? cartItem.quantity : 0;

      return (
        <div key={product._id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <p>Quantity in Cart: {cartQuantity}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="products-page">
        <div className="products-grid">
          {renderProducts()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
