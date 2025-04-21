import React, { useContext, useRef, useState } from 'react';
import LyricsContext from '../Context/LyricsContext';
import { FaPlayCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Loader from '../Loader';

const StaticHomeContent = () => {
  const {
    trendingSongs,
    trendingAlbums,
    topTracks,
    topAlbums,
    shows,
    recommendedAudiobooks,
    loading,
  } = useContext(LyricsContext);

  const [hoveredId, setHoveredId] = useState(null);

  const scrollRefs = {
    audiobooks: useRef(null),
    songs: useRef(null),
    albums: useRef(null),
    shows: useRef(null),
    topSongs: useRef(null),
    topAlbums: useRef(null),
  };

  const scroll = (refKey, direction) => {
    const ref = scrollRefs[refKey];
    if (ref?.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <Loader />;

  const renderCarousel = (title, data, type, refKey) => (
    <div className="pt-3">
      <h3 className="text-white uppercase font-bold text-base sm:text-lg leading-6 mb-3 sm:mb-4">
        {title}
      </h3>
      <div className="relative flex flex-col group">
        <div
          ref={scrollRefs[refKey]}
          className="flex overflow-x-scroll no-scrollbar mb-10 space-x-3 sm:space-x-4 scroll-smooth snap-x snap-mandatory"
        >
          {data.map((item) => {
            const isHovered = hoveredId === item.id;
            const imageUrl =
              type === 'song' || type === 'topSong'
                ? item.album?.images?.[0]?.url
                : item.images?.[0]?.url;

            const name = item.name;
            const artists = item.artists?.map((a) => a.name).join(', ') || '';
            const subtitle =
              type === 'audiobook' || type === 'show'
                ? item.publisher
                : artists;

            return (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] snap-start"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative w-full h-[200px] sm:h-[220px] md:h-[230px] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300"
                  />
                  <div
                    className={`absolute bottom-4 right-2 transition-opacity duration-200 flex items-center justify-center ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ zIndex: 10 }}
                  >
                    <a
                      href={item.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2"
                    >
                      <FaPlayCircle className="text-4xl sm:text-5xl text-yellow-400" />
                    </a>
                  </div>
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <p className="text-center text-white mt-2 text-sm sm:text-base hover:text-yellow-500 truncate">
                  {name}
                </p>
                <h3 className="text-center font-bold text-white text-sm sm:text-base hover:text-yellow-500 truncate">
                  {subtitle}
                </h3>
              </div>
            );
          })}

          {/* Scroll buttons only on sm and up */}
          <button
            onClick={() => scroll(refKey, 'left')}
            className="hidden sm:flex absolute left-2 top-[50%] transform -translate-y-1/2 bg-yellow-400 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft className="text-xl text-gray-900" />
          </button>
          <button
            onClick={() => scroll(refKey, 'right')}
            className="hidden sm:flex absolute right-2 top-[50%] transform -translate-y-1/2 bg-yellow-400 p-2 rounded-full shadow-lg hover:bg-yellow-500 transition opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight className="text-xl text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      {renderCarousel('RECOMMENDED FOR YOU', recommendedAudiobooks, 'audiobook', 'audiobooks')}
      {renderCarousel('TRENDING SONGS', trendingSongs, 'song', 'songs')}
      {renderCarousel('TRENDING ALBUMS', trendingAlbums, 'album', 'albums')}
      {renderCarousel('SPOTLIGHT ON SHOWS', shows, 'show', 'shows')}
      {renderCarousel('TOP SONGS IN GHANA', topTracks, 'topSong', 'topSongs')}
      {renderCarousel('TOP ALBUMS IN GHANA', topAlbums, 'topAlbum', 'topAlbums')}
    </div>
  );
};

export default StaticHomeContent;
