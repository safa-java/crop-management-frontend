import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

function NavbarSeller() {
  const handleLogout = () => {
    // Remove the user data from local storage
    localStorage.removeItem("userData");
    localStorage.removeItem("id");
  };

  return (
    <nav className="navbar">
      <div
        className="navbar__logo"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ marginRight: "10px" }}>
          <img
            src="https://cdn.dribbble.com/users/5146/screenshots/932935/mycogen_1.gif"
            style={{ width: "30px", height: "30px", borderRadius: "8px" }}
          />
        </div>
        Farm Fresh
      </div>

      <div className="navbar__menu">
        <div className="navbar__menu-item navbar__menu-item--active">
          <FontAwesomeIcon icon={faHome} className="icon" />

          <Link to="/">Home</Link>
        </div>

        <div className="navbar__menu-item navbar__menu-item--active">
          <FontAwesomeIcon icon={faShoppingCart} className="icon" />

          <Link to="/cart">My Cart</Link>
        </div>

        <div className="navbar__menu-item">
          <FontAwesomeIcon icon={faUser} className="icon" />

          <Link to="/userprofile">Profile</Link>
        </div>

        <div className="navbar__menu-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />

          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarSeller;