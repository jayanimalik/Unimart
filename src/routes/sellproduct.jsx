import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./sellproduct.css";

function SellProduct() {
  return (
    <>
      <Navbar />
      <div className="sell-product-container">
        <h2>Sell Your Product</h2>
        < form className="sell-product-form" action="submit_form.php" method="post">
          <FormField
            label="Product Name *"
            id="productName"
            name="productName"
            type="text"
            required
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
              { value: "Home & Garden", label: "Home & Garden" },
              { value: "Others", label: "Others" },
            ]}
            required
          />
          <FormField
            label="Description *"
            id="description"
            name="description"
            type="textarea"
            rows="4"
            required
          />
          <FormField
            label="Price (Rupees) *"
            id="price"
            name="price"
            type="number"
            required
          />
          <FormField
            label="Image *"
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
          />
          <FormField
            label="Thapar Email *"
            id="email"
            name="email"
            type="email"
            required
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
          />
          <FormField
            label="Phone *"
            id="phone"
            name="phone"
            type="tel"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

const FormField = ({
  label,
  id,
  name,
  type,
  options,
  rows,
  accept,
  required,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select id={id} name={name} required={required}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea id={id} name={name} rows={rows} required={required}></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          accept={accept}
          required={required}
        />
      )}
    </div>
  );
};

export default SellProduct;
