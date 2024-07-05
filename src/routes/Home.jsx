import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../components/WishlistContext";
import "./Home.css";

const Home = () => {
  const { addToWishlist } = useWishlist();
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
    return products.map((product) => (
      <div key={product._id} className="product-card">
        <img src={product.imageUrl} alt={product.productName} className="product-image" />
        <div className="product-details">
          <h2>{product.productName}</h2>
          <p>{product.description}</p>
          <p>Hostel: {product.hostel}</p>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
        </div>
      </div>
    ));
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
