import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import logo from "../assets/yellowlogo.png";
import LoginButton from "./LoginButton"; // Import the LoginButton component

class Navbar extends Component {
  state = {
    clicked: false,
    searchText: "",
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img alt="Unimart Logo" src={logo} width={110} />
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={this.state.searchText}
              onChange={this.handleSearchChange}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>

        </div>
        <div className="menu-icons" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => (
            <li key={index}>
              <Link className={item.cname} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          ))}
          <li >
            <LoginButton className="nav-links" />
          </li>

        </ul>
      </nav>
    );
  }
}

export default Navbar;
