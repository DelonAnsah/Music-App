import React, { useContext } from 'react';
import LyricsContext from '../Context/LyricsContext';
import Loader from '../Loader';

const TopArtists = () => {
  const { topArtists, loading } = useContext(LyricsContext);

  if (loading || topArtists.length === 0) {
    return <Loader />;
  }
  

  return (
    <div className="px-6 text-white min-h-screen">
      <h3 className="text-white uppercase font-bold text-lg mb-4 leading-6">TOP ARTISTS</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4  gap-8">
        {Array.isArray(topArtists) && topArtists.map((artist) => (
          <div key={artist.id} className="relative bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden p-5 group shadow-md hover:shadow-xl transition duration-300">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="rounded-full w-full h-full object-cover border-4 border-gray-700 group-hover:border-yellow-400 transition"
              />
            </div>
            <div className="text-center">
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-semibold truncate hover:text-yellow-400 transition">{artist.name}</h2>
              </a>
              <p className="text-sm text-gray-400 capitalize">{artist.type}</p>

              {/* Genre tags */}
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {artist.genres.slice(0, 3).map((genre, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div >

              <div className="mt-4">
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="absolute top-0 left-0" width="64" height="64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#374151"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#facc15"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="176"
                      strokeDashoffset={176 - (176 * artist.popularity) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm text-yellow-400 font-bold">
                    {artist.popularity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Popularity</p>
              </div>
            </div >

          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
