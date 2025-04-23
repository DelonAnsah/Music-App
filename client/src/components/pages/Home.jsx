import React, { useContext } from 'react'
import Hero from '../layout/Hero'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'
import SearchSidebar from '../contents/SearchSidebar'
import LyricsContext from '../Context/LyricsContext'


const Home = () => {

  const { searchResults } = useContext(LyricsContext);

  const isSearchActive = Object.keys(searchResults || {}).length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Hero />
      <div className='flex-1 w-full max-w-screen-2xl mx-auto px-4'>
        {isSearchActive ? (
          <div className="flex flex-col lg:flex-row h-screen gap-2">
            <SearchSidebar />
            <main className="lg:bg-gray-800/60 sm:mt-4 flex-1 sm:px-4 md:px-8 sm:py-4 md:py-6 overflow-y-auto rounded-2xl mb-6 shadow-xl lg:border border-gray-700 backdrop-blur-md no-scrollbar transition-all duration-300">
              <Outlet />
            </main>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-screen gap-2">
            <Sidebar />
            <main className="lg:bg-gray-800/60 mt-4 flex-1 sm:px-8 sm:py-6 overflow-y-auto rounded-2xl mb-6 shadow-xl lg:border border-gray-700 backdrop-blur-md no-scrollbar transition-all duration-300">
              <Outlet />
            </main>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home
