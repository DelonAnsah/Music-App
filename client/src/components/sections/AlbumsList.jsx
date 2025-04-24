import React, { useContext, useEffect, useRef, useState } from 'react';
import LyricsContext from '../Context/LyricsContext';
import { FaPlayCircle } from 'react-icons/fa';
import Loader from '../Loader';

const AlbumsList = () => {
  const { searchResults, loading } = useContext(LyricsContext);
  const [visibleAlbums, setVisibleAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);
  const pageSize = 12;
  const allAlbums = searchResults.albums?.items || [];

  // Load new albums when page changes
  useEffect(() => {
    const newAlbums = allAlbums.slice(0, page * pageSize);
    setVisibleAlbums(newAlbums);
    setLoadingMore(false);
  }, [page, allAlbums]);

  // Intersection observer to load more
  useEffect(() => {
    if (loadingMore) return; 

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleAlbums.length < allAlbums.length) {
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
  }, [visibleAlbums.length, allAlbums.length, loadingMore]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Albums</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleAlbums.map((album) => (
          <div
            key={album.id}
            className="relative p-4 bg-gray-800 rounded-lg group hover:bg-gray-700 transition"
          >
            <img
              src={album.images[0]?.url}
              alt={album.name}
              className="w-full h-48 object-cover rounded-md mb-3"
              loading='lazy'
            />
            <a
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-lg font-semibold hover:underline truncate">
                {album.name}
              </p>
            </a>
            <p className="text-sm text-gray-400 mt-1 truncate">
              {album.artists
                .map((artist, i) => (
                  <a
                    key={i}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {artist.name}
                  </a>
                ))
                .reduce((prev, curr) => [prev, ', ', curr])}
            </p>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlayCircle className="text-3xl text-yellow-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Observer Trigger */}
      <div
        ref={loaderRef}
        className="h-10 mt-10 flex justify-center items-center"
      >
        {visibleAlbums.length < allAlbums.length && (
          <span className="text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  );
};

export default AlbumsList;
