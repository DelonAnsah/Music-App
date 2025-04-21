import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaGlobe, FaUserAlt } from 'react-icons/fa';

const navLinks = [
  { to: '/', label: 'Home', icon: <FaHome />, exact: true },
  { to: '/trending-songs', label: 'Trending Songs', icon: <FaChartLine /> },
  { to: '/trending-albums', label: 'Trending Albums', icon: <FaChartLine /> },
  { to: '/trending-shows', label: 'Trending Shows', icon: <FaChartLine /> },
  { to: '/top-songs', label: 'Top Songs', icon: <FaChartLine /> },
  { to: '/top-albums', label: 'Top Albums', icon: <FaChartLine /> },
  { to: '/top-artists', label: 'Top Artists', icon: <FaGlobe /> },
  { to: '/profile', label: 'Profile', icon: <FaUserAlt /> },
];

const Sidebar = () => {
  return (
    <>
      {/* Mobile - Horizontal Scroll */}
      <div className="block lg:hidden mb-4 overflow-x-auto no-scrollbar mt-6">
        <ul className="flex gap-3 px-2 whitespace-nowrap justify-center w-max mx-auto">
          {navLinks.map(({ to, label }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1 rounded-full text-xs transition-all duration-200 border ${
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

      {/* Desktop - Vertical Sidebar */}
      <aside className="hidden lg:block w-full md:w-64 bg-gray-800 text-white p-6 rounded-lg mt-4 mb-6 shadow-lg border border-gray-700">
      <div className="overflow-y-auto max-h-[calc(100vh-100px)] pr-2 custom-scrollbar">
        <nav>
          <h6 className="text-xl font-semibold text-yellow-400 mb-6 border-b border-gray-700 pb-2 flex items-center">
            <FaHome className="mr-2" />
            Navigation
          </h6>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaHome className="text-lg" />
                <span className="text-sm">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trending-songs"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaChartLine className="text-lg" />
                <span className="text-sm">Trending Songs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trending-albums"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaChartLine className="text-lg" />
                <span className="text-sm">Trending Albums</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trending-shows"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaChartLine className="text-lg" />
                <span className="text-sm">Trending Shows</span>
              </NavLink>
            </li>
          </ul>

          <h6 className="text-xl font-semibold text-yellow-400 mt-8 mb-4 border-b border-gray-700 pb-2 flex items-center">
            <FaChartLine className="mr-2" />
            Charts
          </h6>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/top-songs"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaChartLine className="text-lg" />
                <span className="text-sm">Top Songs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/top-albums"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaChartLine className="text-lg" />
                <span className="text-sm">Top Albums</span>
              </NavLink>
            </li>
          </ul>

          <h6 className="text-xl font-semibold text-yellow-400 mt-8 mb-4 border-b border-gray-700 pb-2 flex items-center">
            <FaGlobe className="mr-2" />
            Discover
          </h6>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/top-artists"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                      : 'hover:bg-gray-700 text-white'
                  }`
                }
              >
                <FaGlobe className="text-lg" />
                <span className="text-sm">Top Artists</span>
              </NavLink>
            </li>
          </ul>

          <div className="mt-3 pt-4 border-t border-gray-700">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-900 font-bold shadow-md'
                    : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaUserAlt className="text-lg" />
              <span className="text-sm">Profile</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>

    </>
  );
};

export default Sidebar;
