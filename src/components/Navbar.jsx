import React, { useState } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import logo from "../assets/yellowlogo.png";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook
import LoginButton from "./LoginButton";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const [clicked, setClicked] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClick = () => {
    setClicked(!clicked);
    document.body.classList.toggle('no-scroll', clicked);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <nav className="NavbarItems">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img alt="UniPal Logo" src={logo} width={110} />
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cname} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
        <li className="login-button-container">
          {isAuthenticated ? (
            <Link className="nav-links login-button" to="/profile">
              Profile
            </Link>
          ) : (
            <LoginButton className="nav-links login-button" />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
