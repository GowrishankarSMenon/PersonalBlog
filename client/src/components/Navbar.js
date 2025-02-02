import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for the menu toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed w-full backdrop-blur-lg bg-black/50 border-b border-neutral-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link
              to="/"
              className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400"
            >
              DeJaVu
            </Link>
            <ul className="flex space-x-12">
              <li>
                <Link
                  to="/"
                  className="text-lg text-neutral-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-lg text-neutral-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-black/30 backdrop-blur-md border border-neutral-800 rounded-xl z-50 p-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400"
          >
            DeJaVu
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col space-y-2">
            <Link
              to="/"
              className="text-lg text-neutral-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-lg text-neutral-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
