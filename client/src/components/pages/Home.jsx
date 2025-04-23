import React, { useContext, useState } from 'react';
import Hero from '../layout/Hero';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';
import SearchSidebar from '../contents/SearchSidebar';
import LyricsContext from '../Context/LyricsContext';
import SpotifyPlayer from '../contents/SpotifyPlayer';

const Home = () => {
  const { searchResults } = useContext(LyricsContext);
  const isSearchActive = Object.keys(searchResults || {}).length > 0;

  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Hero />
      <div className='flex-1 w-full max-w-screen-2xl mx-auto px-4'>
        <div className="flex flex-col lg:flex-row h-screen gap-2">
          {isSearchActive ? <SearchSidebar /> : <Sidebar />}
          
          <main className="lg:bg-gray-800/60 mt-4 flex-1 sm:px-8 sm:py-6 overflow-y-auto rounded-2xl mb-6 shadow-xl lg:border border-gray-700 backdrop-blur-md no-scrollbar transition-all duration-300">
            <Outlet context={{ setSelectedContent }} />
          </main>
        </div>
      </div>

      {/*  Global Spotify Player */}
      {selectedContent && (
       <SpotifyPlayer uri={selectedContent} onClose={() => setSelectedContent(null)} />
      )}
    </div>
  );
};

export default Home;
