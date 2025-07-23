import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-betweenpx-4 md:px-8 border-b border-gray-200 py-3 bg-white transition-all">
      <UserButton />
      <Link
        to="/"
        className="flex items-center ml-10 gap-2 underline text-black hover:text-black transition-all duration-300"
      >
        <FaLongArrowAltLeft />
        Back To Home
      </Link>
    </div>
  );
};

export default Navbar;
