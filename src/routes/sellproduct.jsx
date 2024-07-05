import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./sellproduct.css";

function SellProduct() {
  const [formData, setFormData] = useState({
    sellerName: "",
    productName: "",
    category: "",
    description: "",
    price: "",
    image: "",
    hostel: "",
    quantity: "", // Add quantity to formData state
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sellerName, productName, category, description, price, image, hostel, quantity } = formData;

    const productData = {
      sellerName,
      productName,
      category,
      description,
      price,
      imageUrl: image,
      hostel,
      quantity, // Include quantity in productData
    };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        setSuccessMessage(responseData.message || "Product Uploaded");
        setErrorMessage(""); // Clear any previous error messages
        setFormData({
          sellerName: "",
          productName: "",
          category: "",
          description: "",
          price: "",
          image: "",
          hostel: "",
          quantity: "", // Reset quantity field
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Something went wrong.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to upload product. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="sell-product-container">
        <h2>Sell Your Product</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="sell-product-form" onSubmit={handleSubmit}>
          <FormField
            label="Seller Name *"
            id="sellerName"
            name="sellerName"
            type="text"
            required
            value={formData.sellerName}
            onChange={handleChange}
          />
          <FormField
            label="Product Name *"
            id="productName"
            name="productName"
            type="text"
            required
            value={formData.productName}
            onChange={handleChange}
          />
          <FormField
            label="Category *"
            id="category"
            name="category"
            type="select"
            options={[
              { value: "", label: "Select Category" },
              { value: "Electronics", label: "Electronics" },
              { value: "Clothing", label: "Clothing" },
              { value: "Books", label: "Books" },
              { value: "Sports", label: "Sports" },
              { value: "Others", label: "Others" },
            ]}
            required
            value={formData.category}
            onChange={handleChange}
          />
          <FormField
            label="Description *"
            id="description"
            name="description"
            type="textarea"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <FormField
            label="Price (Rupees) *"
            id="price"
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <FormField
            label="Image URL *"
            id="image"
            name="image"
            type="text"
            required
            value={formData.image}
            onChange={handleChange}
          />
          <FormField
            label="Hostel *"
            id="hostel"
            name="hostel"
            type="select"
            options={[
              { value: "", label: "Select Hostel" },
              { value: "A", label: "A" },
              { value: "B", label: "B" },
              { value: "C", label: "C" },
              { value: "D", label: "D" },
              { value: "E", label: "E" },
              { value: "G", label: "G" },
              { value: "H", label: "H" },
              { value: "I", label: "I" },
              { value: "J", label: "J" },
              { value: "K", label: "K" },
              { value: "L", label: "L" },
              { value: "M", label: "M" },
              { value: "N", label: "N" },
              { value: "O", label: "O" },
              { value: "PG", label: "PG" },
              { value: "Q", label: "Q" },
            ]}
            required
            value={formData.hostel}
            onChange={handleChange}
          />
          <FormField
            label="Quantity *" // Add quantity field
            id="quantity"
            name="quantity"
            type="number"
            required
            value={formData.quantity}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <Footer />
    </>
  );
}

const FormField = ({ label, id, name, type, options, rows, required, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select id={id} name={name} required={required} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea id={id} name={name} rows={rows} required={required} value={value} onChange={onChange}></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default SellProduct;
