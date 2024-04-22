import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import "./Cart.css";

const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise-cancellation feature.",
      imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1687660671097",
      price: 9999,
      category: "Electronics",
      seller: "ElectroTech",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest smartphone with a large display, powerful processor, and dual-camera setup.",
      imageUrl: "https://images-cdn.ubuy.co.in/633ac057a9a3195e41204746-5-45-inch-smartphone-hd-full-screen].jpg",
      price: 69999,
      category: "Electronics",
      seller: "TechZone",
    },
    {
      id: 3,
      name: "Coffee Maker",
      description: "Automatic coffee maker with programmable settings and built-in grinder.",
      imageUrl: "https://rukminim2.flixcart.com/image/850/1000/xif0q/coffee-maker/5/5/g/-original-imagtct3x2g5e3zb.jpeg?q=90&crop=false.jpg",
      price: 54999,
      category: "Home & Kitchen",
      seller: "HomeSolutions",
    },
    {
      id: 4,
      name: "Running Shoes",
      description: "Lightweight running shoes with breathable mesh upper and responsive cushioning.",
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2023/09/running-shoes-2048px-5946.jpg?auto=webp&quality=75&width=1024.jpg",
      price: 7999,
      category: "Sports & Fitness",
      seller: "SportyGear",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65j1bwFl5sY1f5U9NollUJJ4eEPljl_jTSAG3JUCeDg&s.jpg",
      price: 39998,
      category: "Electronics",
      seller: "AudioTech",
    },
    {
      id: 6,
      name: "Smart Watch",
      description: "Fitness tracker smartwatch with heart rate monitor and GPS functionality.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Ent2MB8RYcwLSJzF7OlKTZou4TCWxomqRg&s.jpg",
      price: 12999,
      category: "Electronics",
      seller: "TechWearables",
    },
    {
      id: 7,
      name: "Backpack",
      description: "Durable backpack with multiple compartments and padded laptop sleeve.",
      imageUrl: "https://5.imimg.com/data5/WV/TF/ED/SELLER-11112323/players-final-side-500x500.jpg",
      price: 7895,
      category: "Travel & Outdoor",
      seller: "AdventureGear",
    },
    {
      id: 8,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with adjustable DPI and long battery life.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfWvRni1MZmsjVRyBJWusBRhJJwO6A-aEFQ&s.jpg",
      price: 9898,
      category: "Electronics",
      seller: "TechAccessories",
    },
  ];
  
  const paymentHandler = async (productId) => {
    const product = products.find((p) => p.id === productId);
    const amount = product.price;
    const currency = "INR"; // Assuming your currency is Indian Rupees
    const receiptId = "receipt_" + productId; // Generate a unique receipt ID for each product

    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_ndC1btUPLA6hmz",
      amount,
      currency,
      name: "UniMart",
      description: product.name,
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        name: "Web Dev Matrix",
        email: "webdevmatrix@example.com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const renderProducts = () => {
    return products.map((product, index) => (
      <div key={product.id} className="product-item">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Category: {product.category}</p>
          <p>Seller: {product.seller}</p>
          <button className="buy-button" onClick={() => paymentHandler(product.id)}>Buy</button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="products-container">
        <br/><br/><br/><br/>
        {/* <h1>Products</h1> */}
        <div className="products-list">{renderProducts()}</div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;