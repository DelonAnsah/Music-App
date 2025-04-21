import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import LyricsContext from '../Context/LyricsContext';
import { useNavigate } from 'react-router-dom';

const Search = ({ isMobile = false, onClose }) => {
  const [query, setQuery] = useState("");

  const { setSearchResults, clearSearch, setLoading } = useContext(LyricsContext);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const { data } = await axios.get("http://localhost:5000/api/spotify-search", {
        params: { q: query },
      });      
      setSearchResults(data);
      navigate('/search/all')
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (query.trim() === '') {
      clearSearch();
    }
  }, [query]);

  return (
    <div className={`relative w-full ${isMobile ? 'max-w-xs' : 'sm:max-w-sm md:max-w-md'
      } transition-all duration-300`}>
      <input
        type="text"
        placeholder={isMobile ? 'Find your vibe. ' : "Discover your next favorite sound..."}
        className={`w-full ${isMobile ? 'py-2 pl-10 pr-10 text-sm' : 'py-3 pl-12 pr-4 text-base'} 
          text-white bg-gray-800 backdrop-blur-md rounded-full 
          outline-none focus:ring-2 focus:ring-yellow-400 
          transition duration-300 shadow-lg`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <span
        className={`absolute ${isMobile ? 'left-3' : 'left-4'} top-1/2 transform -translate-y-1/2 
        text-yellow-400 text-base cursor-pointer hover:scale-110 transition duration-300`}
        onClick={handleSearch}
      >
        <FaSearch />
      </span>


      {/* Close Button on Mobile */}
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-base hover:text-red-400 transition duration-300"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;
