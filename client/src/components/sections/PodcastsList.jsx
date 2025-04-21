import React, { useContext, useEffect, useRef, useState } from 'react';
import LyricsContext from '../Context/LyricsContext';
import Loader from '../Loader';

const PodcastsList = () => {
  const { searchResults, loading } = useContext(LyricsContext);
  const [visibleShows, setVisibleShows] = useState([]);
  const [page, setPage] = useState(1);

  const loaderRef = useRef(null);
  const pageSize = 12;
  const allShows = searchResults.shows?.items || [];

  useEffect(() => {
    const newShows = allShows.slice(0, page * pageSize);
    setVisibleShows(newShows);
  }, [page, allShows]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleShows.length < allShows.length) {
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
  }, [visibleShows, allShows]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Podcasts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {visibleShows.map((show) => (
          <div key={show.id} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            {show.images?.[0]?.url && (
              <img
                src={show.images[0].url}
                alt={show.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
            )}
            <a href={show.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <p className="text-lg font-semibold hover:underline truncate">{show.name}</p>
            </a>
            <p className="text-sm text-gray-400 mt-1 truncate">{show.publisher}</p>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="h-10 mt-10 flex justify-center items-center">
        {visibleShows.length < allShows.length && (
          <span className="text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  );
};

export default PodcastsList;
