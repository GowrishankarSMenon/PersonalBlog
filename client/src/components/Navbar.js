import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full backdrop-blur-lg bg-black/50 border-b border-neutral-800 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            DeJaVu
          </Link>
          <ul className="flex space-x-12">
            <li>
              <Link to="/" className="text-lg text-neutral-400 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-lg text-neutral-400 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;