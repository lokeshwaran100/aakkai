"use client";

// components/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Aakkai
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/work" className="text-gray-600 hover:text-gray-800">
              Work
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNav}
              className="text-gray-800 focus:outline-none"
            >
              {navOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${navOpen ? "block" : "hidden"} bg-white`}>
        <div className="space-y-2 p-4">
          <Link
            href="/"
            onClick={toggleNav}
            className="block text-gray-600 hover:text-gray-800"
          >
            Home
          </Link>
          <Link
            href="/work"
            onClick={toggleNav}
            className="block text-gray-600 hover:text-gray-800"
          >
            Work
          </Link>
          <Link
            href="/about"
            onClick={toggleNav}
            className="block text-gray-600 hover:text-gray-800"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={toggleNav}
            className="block text-gray-600 hover:text-gray-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
