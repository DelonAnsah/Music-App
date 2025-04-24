import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import LyricsContext from '../Context/LyricsContext';
import Loader from '../Loader';

const SongsList = () => {
  const { searchResults, loading } = useContext(LyricsContext);
  const [visibleSongs, setVisibleSongs] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const pageSize = 12;
  const allSongs = searchResults.tracks?.items || [];

  // Update visible songs when page or searchResults change
  useEffect(() => {
    const newSongs = allSongs.slice(0, page * pageSize);
    setVisibleSongs(newSongs);
  }, [page, allSongs]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleSongs.length < allSongs.length) {
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
  }, [visibleSongs, allSongs]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      <div className="flex flex-col gap-4">
        {visibleSongs.map((song) => (
          <div key={song.id} className="flex items-center bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
            <img
              src={song.album.images[0]?.url}
              alt={song.name}
              className="w-16 h-16 rounded-md"
              loading='lazy'
            />
            <div className="ml-4 flex-1">
              <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <p className="text-lg font-semibold hover:underline">{song.name}</p>
              </a>
              <p className="text-gray-400 text-sm">
                {song.artists
                  .map((a, i) => (
                    <a
                      key={i}
                      href={a.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {a.name}
                    </a>
                  ))
                  .reduce((prev, curr) => [prev, ', ', curr])}
              </p>
            </div>
            <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <FaPlayCircle className="text-2xl text-yellow-400 ml-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Invisible loader trigger at bottom for IntersectionObserver */}
      <div ref={loaderRef} className="h-10 mt-10 flex justify-center items-center">
        {visibleSongs.length < allSongs.length && (
          <span className="text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  );
};

export default SongsList;
