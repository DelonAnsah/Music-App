import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import LyricsSearch from '../contents/LyricsSearch';
import Search from '../contents/Search';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const goToHomePage = () => {
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div
        onClick={goToHomePage}
        className="text-2xl sm:2xl md:text-3xl font-bold tracking-wide cursor-pointer"
      >
        <span className="text-yellow-400">MUSIC</span>HUB
      </div>

      {/* Desktop Search */}
      <div className="flex-1 mx-10 hidden md:block w-full">
        {location.pathname === '/lyrics' ? <LyricsSearch /> : <Search />}
      </div>

      {/* Mobile Search and Hamburger */}
      <div className="flex xl:hidden space-x-4 items-center">
        {/* Search Icon */}
        <div className='flex md:hidden'>
          <button
            onClick={() => setShowMobileSearch(true)}
            className="text-yellow-400 text-xl"
          >
            <FaSearch />
          </button>
        </div>

        {/* Hamburger Menu Icon */}
        <button className="text-white" onClick={toggleMobileMenu}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-x-0 top-0 bg-gray-900/95 z-50 px-6 py-4 flex items-center xl:hidden">
          {location.pathname === '/lyrics' ? (
            <LyricsSearch onClose={() => setShowMobileSearch(false)} isMobile />
          ) : (
            <Search onClose={() => setShowMobileSearch(false)} isMobile />
          )}
        </div>
      )}

      {/* Desktop Nav Menu */}
      <div className="hidden xl:flex items-center space-x-6">
        {/* Nav Links */}
        <div className="relative">
          <span
            onClick={toggleDropdown}
            className="cursor-pointer hover:text-yellow-400 transition duration-300"
          >
            DISCOVER
          </span>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 space-y-2 bg-gray-800 text-white flex flex-col p-4 rounded-md w-36 z-50">
              <NavLink to="/trending-songs" className="text-sm hover:text-yellow-400">
                Trending Songs
              </NavLink>
              <NavLink to="/trending-albums" className="text-sm hover:text-yellow-400">
                Trending Albums
              </NavLink>
              <NavLink to="/trending-shows" className="text-sm hover:text-yellow-400">
                Trending Shows
              </NavLink>
              <NavLink to="/top-songs" className="text-sm hover:text-yellow-400">
                Top Songs
              </NavLink>
              <NavLink to="/top-albums" className="text-sm hover:text-yellow-400">
                Top Albums
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/lyrics" className="hover:text-yellow-400 transition duration-300">
          LYRICS
        </NavLink>

        {/* Desktop Auth Links */}
        <div className="hidden xl:flex space-x-6 items-center">
          <Link
            to="/signup"
            className="bg-transparent border border-yellow-400 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-500 hover:text-white transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-yellow-500 text-gray-900 px-4 py-1 rounded hover:bg-yellow-600 hover:text-white transition duration-300"
          >
            Log In
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-md z-50 flex flex-col xl:hidden transition-all duration-300 ease-in-out">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-yellow-400 hover:text-yellow-300 transition duration-200"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col pl-7 flex-grow space-y-6 text-white">
            <div className="w-full max-w-xs">
              <span className="block mb-4 text-lg font-bold text-yellow-400">DISCOVER</span>
              <div className="flex flex-col space-y-3 rounded-lg shadow-lg">
                <NavLink
                  to="/trending-songs"
                  className="text-base hover:text-yellow-400 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  Trending Songs
                </NavLink>
                <NavLink
                  to="/trending-albums"
                  className="text-base hover:text-yellow-400 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  Trending Albums
                </NavLink>
                <NavLink
                  to="/trending-shows"
                  className="text-base hover:text-yellow-400 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  Trending Shows
                </NavLink>
                <NavLink
                  to="/top-songs"
                  className="text-base hover:text-yellow-400 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  Top Songs
                </NavLink>
                <NavLink
                  to="/top-albums"
                  className="text-base hover:text-yellow-400 transition duration-200"
                  onClick={toggleMobileMenu}
                >
                  Top Albums
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/lyrics"
              className="text-lg font-semibold text-yellow-400 hover:text-yellow-400 transition duration-200"
              onClick={toggleMobileMenu}
            >
              LYRICS
            </NavLink>

            <div className="w-full max-w-xs border-t border-gray-700 pt-4">
              <Link
                to="/signup"
                className="block text-base font-semibold hover:text-yellow-400 transition duration-200 py-2"
                onClick={toggleMobileMenu}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block text-base font-semibold hover:text-yellow-400 transition duration-200 py-2"
                onClick={toggleMobileMenu}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;