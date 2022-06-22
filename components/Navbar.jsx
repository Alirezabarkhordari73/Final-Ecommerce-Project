import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Mobile Phone</Link>
      </p>
      <button type="button" onClick="" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty">2</span>
      </button>
    </div>
  );
};

export default Navbar;
