import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Search from '../contents/Search';
import LyricsSearch from '../contents/LyricsSearch';
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
    <nav className="bg-gray-900 shadow-lg p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={goToHomePage}
          className="text-base mr-3 sm:mr-0 sm:text-2xl md:text-3xl font-bold text-white cursor-pointer"
        >
          <span className="text-yellow-400">MUSIC</span>HUB
        </div>

        {/* Desktop Search */}
        <div className="justify-center hidden md:block w-full max-w-md">
          {location.pathname === '/lyrics' ? <LyricsSearch /> : <Search />}
        </div>

        {/* Mobile Search and Hamburger */}
        <div className="flex xl:hidden items-center space-x-4">
          {/* Search Icon */}
          <div className="relative h-12 flex items-center justify-center md:hidden">
            {showMobileSearch ? (
              location.pathname === '/lyrics' ? (
                <LyricsSearch onClose={() => setShowMobileSearch(false)} isMobile />
              ) : (
                <Search onClose={() => setShowMobileSearch(false)} isMobile />
              )
            ) : (
              <button
                onClick={() => setShowMobileSearch(true)}
                className="text-yellow-400 text-xl"
              >
                <FaSearch />
              </button>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button className="text-white" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Nav Menu */}
        <div className="hidden xl:flex items-center space-x-8 text-lg font-medium text-white">
          <div className="relative">
            <span
              onClick={toggleDropdown}
              className="cursor-pointer hover:text-yellow-400 transition duration-300"
            >
              DISCOVER
            </span>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 space-y-2 bg-gray-800 text-white flex flex-col p-4 rounded-md w-36 z-50">
                <NavLink to="/trending-songs" className="text-sm hover:text-yellow-400">Trending Songs</NavLink>
                <NavLink to="/trending-albums" className="text-sm hover:text-yellow-400">Trending Albums</NavLink>
                <NavLink to="/trending-shows" className="text-sm hover:text-yellow-400">Trending Shows</NavLink>
                <NavLink to="/top-songs" className="text-sm hover:text-yellow-400">Top Songs</NavLink>
                <NavLink to="/top-albums" className="text-sm hover:text-yellow-400">Top Albums</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/lyrics" className="hover:text-yellow-400 transition duration-300">
            LYRICS
          </NavLink>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden xl:flex space-x-6 items-center text-white">
          <Link to="/signup" className="font-semibold hover:text-yellow-400 transition duration-300">
            Sign Up
          </Link>
          <span className="text-yellow-400 font-bold">|</span>
          <Link to="/login" className="font-semibold hover:text-yellow-400 transition duration-300">
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