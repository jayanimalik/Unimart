import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Loading.css";
import logo from "../assets/logo.png"; // Ensure correct path

const Loading = ({ setInitialLoad }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
      navigate("/home");
    }, 3000); // Display for 3 seconds

    return () => clearTimeout(timer);
  }, [navigate, setInitialLoad]);

  return (
    <div className="loading-container">
      <img src={logo} alt="UniPal Logo" className="loading-logo" />
    </div>
  );
};

export default Loading;
