import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../components/WishlistContext";
import "./Home.css";

const Home = () => {
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [hostel, setHostel] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [category, hostel]);

  const filterProducts = () => {
    let tempProducts = products;

    if (category) {
      tempProducts = tempProducts.filter(product => product.category === category);
    }

    if (hostel) {
      tempProducts = tempProducts.filter(product => product.hostel === hostel);
    }

    setFilteredProducts(tempProducts);
  };

  const renderProducts = () => {
    return filteredProducts.map((product) => (
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
        <div className="filter-box">
          <button onClick={() => setShowFilters(!showFilters)}>Filter</button>
          {showFilters && (
            <div className="filters">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Others">Others</option>
              </select>
              <select value={hostel} onChange={(e) => setHostel(e.target.value)}>
                <option value="">All Hostels</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
                <option value="J">J</option>
                <option value="K">K</option>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="N">N</option>
                <option value="O">O</option>
                <option value="PG">PG</option>
                <option value="Q">Q</option>
              </select>
            </div>
          )}
        </div>
        <div className="products-grid">
          {renderProducts()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
