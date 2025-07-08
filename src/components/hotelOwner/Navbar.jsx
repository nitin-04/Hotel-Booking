import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-betweenpx-4 md:px-8 border-b border-gray-200 py-3 bg-white transition-all">
      <Link to="/">
        <img />
      </Link>
      <UserButton />
    </div>
  );
};

export default Navbar;
