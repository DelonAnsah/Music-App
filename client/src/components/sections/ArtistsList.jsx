import React, { useContext, useEffect, useRef, useState } from 'react';
import LyricsContext from '../Context/LyricsContext';
import { FaPlayCircle } from 'react-icons/fa';
import Loader from '../Loader';

const ArtistsList = () => {
  const { searchResults, loading } = useContext(LyricsContext);
  const [visibleArtists, setVisibleArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);
  const pageSize = 12;
  const allArtists = searchResults.artists?.items || [];

  // Update visible artists when page
  useEffect(() => {
    const newArtists = allArtists.slice(0, page * pageSize);
    setVisibleArtists(newArtists);
    setLoadingMore(false);
  }, [page, allArtists]);

  // Set up IntersectionObserver 
  useEffect(() => {
    if (loadingMore || loading || visibleArtists.length >= allArtists.length) return;

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
  }, [loadingMore, loading, visibleArtists.length, allArtists.length]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {visibleArtists.map((artist) => (
          <div
            key={artist.id}
            className="relative p-4 bg-gray-800 rounded-lg group hover:bg-gray-700 transition text-center"
          >
            {artist.images?.[0]?.url && (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
            )}
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-lg font-semibold hover:underline truncate">{artist.name}</h2>
            </a>
            <p className="text-sm text-gray-400 capitalize">{artist.type}</p>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlayCircle className="text-3xl text-yellow-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="h-10 mt-10 flex justify-center items-center">
        {visibleArtists.length < allArtists.length && (
          <span className="text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  );
};

export default ArtistsList;