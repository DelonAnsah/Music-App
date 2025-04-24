import React, { useContext, useEffect, useRef, useState } from 'react';
import LyricsContext from '../Context/LyricsContext';
import Loader from '../Loader';

const formatReleaseDate = (dateStr) => {
  const options = { month: 'long', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', options);
};

const formatMinutes = (ms) => {
  const totalMinutes = Math.round(ms / 60000);
  return `${totalMinutes} min`;
};

const EpisodesList = () => {
  const { searchResults, loading } = useContext(LyricsContext);
  const [visibleEpisodes, setVisibleEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  const loaderRef = useRef(null);
  const pageSize = 12;
  const allEpisodes = searchResults.episodes?.items || [];

  useEffect(() => {
    const newEpisodes = allEpisodes.slice(0, page * pageSize);
    setVisibleEpisodes(newEpisodes);
  }, [page, allEpisodes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleEpisodes.length < allEpisodes.length) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: '100px',
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [visibleEpisodes, allEpisodes]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {visibleEpisodes.map((episode) => (
          <div key={episode.id} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            {episode.images?.[0]?.url && (
              <img
                src={episode.images[0].url}
                alt={episode.name}
                className="w-full h-48 object-cover rounded-md mb-3"
                loading='lazy'
              />
            )}
            <a href={episode.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <p className="text-lg font-semibold hover:underline truncate">{episode.name}</p>
            </a>
            <p className="text-sm text-gray-400 mt-1 truncate">{episode.publisher}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <p>{formatReleaseDate(episode.release_date)}</p>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <p>{formatMinutes(episode.duration_ms)}</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="h-10 mt-10 flex justify-center items-center">
        {visibleEpisodes.length < allEpisodes.length && (
          <span className="text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  );
};

export default EpisodesList;
