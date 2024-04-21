import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "./sellproduct.css";

function SellProduct() {
  return (
    <>
      <Navbar />
      <div className="sell-product-container">
        <br/><br/><br/>
        <h2>Sell Your Product</h2>
        <br/>
        <form className="sell-product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name *</label>
            <input type="text" id="productName" name="productName" required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select id="category" name="category" required>
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (Rupees) *</label>
            <input type="number" id="price" name="price" required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image *</label>
            <input type="file" id="image" name="image" accept="image/*" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Thapar Email *</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="hostel">Hostel *</label>
            <select id="hostel" name="hostel" required>
              <option value="">Select Hostel</option>
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
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input type="tel" id="phone" name="phone" required/>
          </div><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SellProduct;
