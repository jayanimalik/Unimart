import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './sellproduct.css';

function SellProduct() {
  const [formData, setFormData] = useState({
    sellerName: "",
    productName: "",
    category: "",
    description: "",
    price: "",
    images: [], // Changed to an array for multiple images
    hostel: "",
    quantity: "",
    telegramUsername: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [user] = useAuthState(auth); // Get the currently logged-in user

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Ensure the total size of images does not exceed 1.5MB
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 1.5 * 1024 * 1024) {
      setErrorMessage("Total file size exceeds 1.5MB. Please choose smaller files.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Extract only the base64 data
      setFormData(prevData => ({
        ...prevData,
        images: [...prevData.images, base64Image]
      }));
    };

    files.forEach(file => reader.readAsDataURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sellerName, productName, category, description, price, images, hostel, quantity, telegramUsername } = formData;

    const productData = {
      sellerName,
      productName,
      category,
      description,
      price: Number(price), // Ensure price is converted to number
      images,
      hostel,
      quantity: Number(quantity), // Ensure quantity is converted to number
      telegramUsername,
      uid: user.uid
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
        const responseData = await response.json();
        setSuccessMessage(responseData.message || "Product Uploaded");
        setErrorMessage("");
        setFormData({
          sellerName: "",
          productName: "",
          category: "",
          description: "",
          price: "",
          images: [], // Reset images array
          hostel: "",
          quantity: "",
          telegramUsername: ""
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
            label="Telegram Username *"
            id="telegramUsername"
            name="telegramUsername"
            type="text"
            required
            value={formData.telegramUsername}
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
            required
            value={formData.category}
            onChange={handleChange}
            options={[
              "Electronics", "Clothing", "Books", "Sports", "Stationery", "Services", "Furniture", "Kitchenware",
              "Accessories", "Art Supplies", "Bicycles", "Musical Instruments", "Room Decor", "Food Items",
              "Health & Fitness", "Beauty & Personal Care", "Others"
            ]}
          />
          <FormField
            label="Description *"
            id="description"
            name="description"
            type="textarea"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <FormField
            label="Price *"
            id="price"
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <FormField
            label="Images *"
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple // Allow multiple image selection
            required
            onChange={handleFileChange}
          />
          <FormField
            label="Hostel *"
            id="hostel"
            name="hostel"
            type="select"
            required
            value={formData.hostel}
            onChange={handleChange}
            options={[
              "A", "B", "C", "D", "E", "G", "H", "I", "J", "K", "L", "M", "N", "O", "PG", "Q"
            ]}
          />
          <FormField
            label="Quantity *"
            id="quantity"
            name="quantity"
            type="number"
            required
            value={formData.quantity}
            onChange={handleChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Upload</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

const FormField = ({ label, id, name, type, value, onChange, required, accept, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select id={id} name={name} value={value} onChange={onChange} required={required}>
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          accept={accept}
        />
      )}
    </div>
  );
};

export default SellProduct;
