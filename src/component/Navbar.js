import React from "react";
import "./Navbar.css";
import Logo from "../Images/instagramLogo.png";
import {
  FaSistrix,
  FaTelegramPlane,
  FaRegCompass,
  FaRegHeart,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { contextProvider } from "../global/Context";
import { useContext } from "react";

const Navbar = () => {
  const openForm = () => {
    openModel();
  };
  const { model, openModel } = useContext(contextProvider);
  console.log("my model", model);
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
          <FaSistrix className="searchIcon" />
        </div>
      </div>
      <div className="navbar__last">
        <li>
          <MdHome className="navbar__icons" />
        </li>
        <li>
          <FaTelegramPlane className="navbar__icons" />
        </li>
        <li>
          <FaRegCompass className="navbar__icons" />
        </li>
        <li>
          <FaRegHeart className="navbar__icons" />
        </li>
        <li onClick={openForm}>Register / Login</li>
      </div>
    </div>
  );
};

export default Navbar;
