import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
       
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 mb-8 text-left">
          {/* Company */}
          <div className="px-4">
            <h3 className="text-yellow-400 text-xl font-bold mb-4 tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">Home</a></li>
              <li><a href="#explore" className="hover:text-yellow-500 transition-colors duration-200">Explore</a></li>
              <li><a href="#top-songs" className="hover:text-yellow-500 transition-colors duration-200">Top Songs</a></li>
              <li><a href="#artists" className="hover:text-yellow-500 transition-colors duration-200">Artists</a></li>
              <li><a href="#contact" className="hover:text-yellow-500 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="px-4">
            <h3 className="text-yellow-400 text-xl font-bold mb-4 tracking-wide">Support</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-yellow-500 transition-colors duration-200">FAQ</a></li>
              <li><a href="#terms" className="hover:text-yellow-500 transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-yellow-500 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#help" className="hover:text-yellow-500 transition-colors duration-200">Help Center</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="px-4">
            <h3 className="text-yellow-400 text-xl font-bold mb-4 tracking-wide">Follow Us</h3>
            <div className="flex sm:justify-start gap-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://x.com/ansahdelon?s=21" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/delon_ansah" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/delon-ansah" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400 text-center">
          <p>&copy; 2025 MusicHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
