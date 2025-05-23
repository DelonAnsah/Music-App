import React, { useContext, useState } from 'react'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import LyricsContext from '../Context/LyricsContext';

const LyricsSearch = ({ isMobile = false, onClose }) => {

  const { setTracksList } = useContext(LyricsContext);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search?q=${search}`);
      setTracksList(response.data.response.hits);
      setSearch('');
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
    setLoading(false);
  };



  return (
    <div className='relative w-full'>
      <input
        type="text"
        placeholder='Find the song behind your feels'
        className={`w-full ${isMobile ? 'py-2 pl-10 pr-10 text-sm' : 'py-3 pl-12 pr-4 text-base'} 
          text-white bg-gray-800 backdrop-blur-md rounded-full 
          outline-none focus:ring-2 focus:ring-yellow-400 
          transition duration-300 shadow-lg`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
  )
}

export default LyricsSearch
