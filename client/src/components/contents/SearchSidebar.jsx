import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaMusic,
  FaUser,
  FaCompactDisc,
  FaList,
  FaPodcast,
  FaMicrophoneAlt,  
} from 'react-icons/fa';

const searchLinks = [
  { label: 'All', to: '/search/all', icon: <FaSearch /> },
  { label: 'Songs', to: '/search/songs', icon: <FaMusic /> },
  { label: 'Artists', to: '/search/artists', icon: <FaUser /> },
  { label: 'Albums', to: '/search/albums', icon: <FaCompactDisc /> },
  { label: 'Playlists', to: '/search/playlists', icon: <FaList /> },
  { label: 'Podcasts', to: '/search/podcasts', icon: <FaPodcast /> },
  { label: 'Episodes', to: '/search/episodes', icon: <FaMicrophoneAlt /> },
];

const SearchSidebar = () => {
  return (
    <>
      {/* Mobile version - horizontal scroll */}
      <div className="block lg:hidden mb-4 overflow-x-auto no-scrollbar mt-6">
  <ul className="flex gap-3 px-2 whitespace-nowrap justify-center md:justify-center w-max mx-auto">
    {searchLinks.map(({ label, to }) => (
      <li key={label}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-full text-xs transition-all duration-200 border ${
              isActive
                ? 'bg-yellow-400 text-gray-900 font-bold shadow'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`
          }
        >
          {label}
        </NavLink>
      </li>
    ))}
  </ul>
</div>


      {/* Desktop version - vertical sidebar */}
      <aside className="hidden lg:block md:w-64 bg-gray-800 text-white p-6 rounded-lg mt-4 mb-6 shadow-lg border border-gray-700">
        <nav>
          <h6 className="text-xl font-semibold text-yellow-400 mb-6 border-b border-gray-700 pb-2">
            Search Filters
          </h6>
          <ul className="space-y-3">
            {searchLinks.map(({ label, to, icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                        : 'hover:bg-gray-700 text-white'
                    }`
                  }
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SearchSidebar;
