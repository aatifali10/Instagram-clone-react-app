import React from "react";
import Logo from "../Images/instagramLogo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__first">
        <div className="navbar__first-logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="navbar__middle">
        <div className="navbar__middle-search">
          <input type="text" className="navbar__search" placeholder="Search" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
