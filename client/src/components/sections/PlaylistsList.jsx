import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import LyricsContext from '../Context/LyricsContext';
import { FaPlayCircle } from 'react-icons/fa';
import Loader from '../Loader';

const PlaylistsList = () => {
  const { searchResults, loading } = useContext(LyricsContext);
  const [visiblePlaylists, setVisiblePlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);
  const pageSize = 12;
  const filteredPlaylists = useMemo(
    () => (searchResults.playlists?.items || []).filter(Boolean),
    [searchResults.playlists?.items]
  );

  // Update visible playlists when page 

  useEffect(() => {
    const newPlaylists = filteredPlaylists.slice(0, page * pageSize);
    setVisiblePlaylists(newPlaylists);
    setLoadingMore(false);
  }, [page, filteredPlaylists]);

  // Set up IntersectionObserver 
  useEffect(() => {
    if (loadingMore || loading || visiblePlaylists.length >= filteredPlaylists.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLoadingMore(true);
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '100px' }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadingMore, loading, visiblePlaylists.length, filteredPlaylists.length]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Playlists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {visiblePlaylists.map((playlist) => (
          <div key={playlist.id} className="relative p-4 bg-gray-800 rounded-lg group hover:bg-gray-700 transition">
            {playlist.images?.[0]?.url && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-full h-48 object-cover rounded-md mb-3"
                loading='lazy'
              />
            )}
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <p className="text-lg font-semibold hover:underline truncate">{playlist.name}</p>
            </a>
            <p className="text-sm text-gray-400 truncate">By {playlist.owner?.display_name}</p>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100">
              <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <FaPlayCircle className="text-3xl text-yellow-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="h-10 mt-10 flex justify-center items-center">
        {visiblePlaylists.length < filteredPlaylists.length && (
          <span className="text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  );
};

export default PlaylistsList;