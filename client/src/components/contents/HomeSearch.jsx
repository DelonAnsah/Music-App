import React, { useContext } from 'react'
import LyricsContext from '../Context/LyricsContext'
import { FaPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../Loader';


const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const formatReleaseDate = (dateStr) => {
  const options = { month: 'long', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', options);
};

const formatMinutes = (ms) => {
  const totalMinutes = Math.round(ms / 60000);
  return `${totalMinutes} min`;
};


const HomeSearch = () => {

  const { searchResults, loading } = useContext(LyricsContext);

  if (loading) return <Loader />;


  const artist = searchResults.artists?.items?.[0];
  const songs = searchResults.tracks?.items || [];
  const artists = searchResults.artists?.items || [];
  const albums = searchResults.albums?.items || [];
  const playlists = (searchResults.playlists?.items || []).filter(Boolean);
  const shows = searchResults.shows?.items || [];
  const episodes = searchResults.episodes?.items || [];



  if (artist) {
    const { images, description, name } = artist;
  }


  return (
    <section className="container mx-auto max-w-screen-xl text-white">
      <div className="sm:px-6">
        <div className='flex flex-col lg:flex-row gap-6 sm:mt-6 flex-wrap'>
          {artist && (
            <div className="flex flex-col w-full p-3 sm:p-0 lg:w-[400px] h-full justify-between">
              <div className='hidden lg:flex'>
                <h3 className='text-xl sm:text-2xl font-bold mb-2'>Top result</h3>
              </div>
              <div className='relative sm:bg-gray-800 p-4 rounded-lg flex flex-col flex-1 lg:max-w-md group hover:bg-gray-700'>
                {/* Artist Image */}
                <div className="w-36 h-36 mb-4 mx-auto ">
                  {artist.images?.[0]?.url && (
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>

                {/* Artist Info */}
                <div className="flex-1 mb-6 text-center">
                  <a
                    href={artist.external_urls?.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 hover:underline">
                      {artist.name}
                    </h2>
                  </a>
                  <p className="text-base text-gray-300 capitalize">
                    <span className="font-medium">{artist.type}</span>
                  </p>
                </div>

                {/* Play Icon */}
                <div className='absolute bottom-5 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <a
                    href={artist.external_urls?.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPlayCircle className="text-5xl text-yellow-400" />
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className='flex-1'>
            <div>
              <Link to="/search/songs">
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-white hover:underline'>Songs</h3>
              </Link>

              {/* Mobile View */}
              <div className="block sm:hidden">
                <div className="flex flex-col gap-4">
                  {songs.slice(0, 8).map((song) => (
                    <div key={song.id} className="flex items-center bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                      <img
                        src={song.album.images[0]?.url}
                        alt={song.name}
                        className="w-16 h-16 rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                          <p className="text-lg font-semibold hover:underline">{song.name}</p>
                        </a>
                        <p className="text-gray-400 text-sm truncate">
                          {song.artists.map((a, i) => (
                            <a
                              key={i}
                              href={a.external_urls.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {a.name}
                            </a>
                          )).reduce((prev, curr) => [prev, ', ', curr])}
                        </p>
                      </div>
                      <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        <FaPlayCircle className="text-2xl text-yellow-400 ml-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View*/}
              <div className="hidden sm:block">
                <div className="flex flex-col gap-3">
                  {songs.slice(0, 4).map((song) => (
                    <div key={song.id} className='flex items-center bg-gray-800 hover:bg-gray-700 transition p-3 rounded-lg'>
                      <img
                        src={song.album.images[0]?.url}
                        alt={song.name}
                        className='w-16 h-16 object-cover rounded-md'
                      />
                      <div className='flex justify-between items-center w-full ml-4'>
                        <div className='flex flex-col truncate max-w-[70%]'>
                          <a href={song.external_urls?.spotify}>
                            <p className='text-white font-semibold truncate hover:underline'>{song.name}</p>
                          </a>
                          <p className='text-gray-300 text-sm truncate'>
                            {song.artists.map((artist, index) => (
                              <a
                                key={index}
                                href={artist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {artist.name}
                              </a>
                            )).reduce((prev, curr) => [prev, ', ', curr])}
                          </p>
                        </div>
                        <div className='flex items-center gap-4'>
                          <p className='text-sm text-gray-400'>{formatDuration(song.duration_ms)}</p>
                          <a href={song.external_urls?.spotify} target='_blank' rel='noopener noreferrer'>
                            <FaPlayCircle className='text-2xl text-yellow-400 hover:scale-110 transition-transform' />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artists */}
      <div className="mt-10 w-full px-6">
        <Link to="/search/artists">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white hover:underline">Artists</h3>
        </Link>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {artists.slice(0, 5).map((artist) => (
            <div
              key={artist.id}
              className="relative p-4 bg-gray-800 rounded-lg group hover:bg-gray-700 transition duration-300 flex flex-col items-center text-center"
            >
              {/* Artist Image */}
              {artist.images?.[0]?.url && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
              )}

              {/* Artist Info */}
              <div className="flex flex-col items-center">
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-lg font-semibold text-white hover:underline truncate w-40">{artist.name}</h2>
                </a>
                <p className="text-sm text-gray-400 capitalize mt-1">{artist.type}</p>
              </div>

              {/* Play Icon */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={artist.external_urls?.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPlayCircle className="text-4xl text-yellow-400 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Albums */}
      <div className="mt-10 w-full px-6">
        <Link to="/search/albums">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white hover:underline">Albums</h3>
        </Link>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide scroll-smooth no-scrollbar">
          {albums.slice(0, 4).map((album) => (
            <div
              key={album.id}
              className="min-w-[250px] sm:min-w-0 relative p-4 rounded-lg group hover:bg-gray-700 transition duration-300"
            >
              <div className="mb-4 relative">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <p className="text-white font-semibold text-lg truncate hover:underline">{album.name}</p>
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <p>{album.release_date.slice(0, 4)}</p>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <p className="text-gray-300 text-sm truncate">
                    {album.artists.map((artist, index) => (
                      <a
                        key={index}
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {artist.name}
                      </a>
                    )).reduce((prev, curr) => [prev, ', ', curr])}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={album.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <FaPlayCircle className="text-4xl text-yellow-400 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Playlist */}
      <div className="mt-10 w-full px-6">
        <Link to="/search/playlists">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white hover:underline">Playlists</h3>
        </Link>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide scroll-smooth no-scrollbar">
          {playlists.slice(0, 4).map((playlist) => (
            <div
              key={playlist.id}
              className="min-w-[250px] sm:min-w-0 relative p-4 rounded-lg group hover:bg-gray-700 transition duration-300"
            >
              <div className="mb-4 relative">
                {playlist.images?.[0]?.url && (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <p className="text-white font-semibold text-lg truncate hover:underline">{playlist.name}</p>
                </a>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  By {playlist.owner?.display_name || 'Unknown'}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={playlist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <FaPlayCircle className="text-4xl text-yellow-400 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Podcasts */}
      <div className="mt-10 w-full px-6">
        <Link to="/search/podcasts">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white hover:underline">Podcasts</h3>
        </Link>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide scroll-smooth no-scrollbar">
          {shows.slice(0, 4).map((podcast) => (
            <div
              key={podcast.id}
              className="min-w-[250px] sm:min-w-0 relative p-4 rounded-lg group hover:bg-gray-700 transition duration-300"
            >
              <div className="mb-4 relative">
                {podcast.images?.[0]?.url && (
                  <img
                    src={podcast.images[0].url}
                    alt={podcast.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <a href={podcast.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <p className="text-white font-semibold text-lg truncate hover:underline">{podcast.name}</p>
                </a>
                <a href={podcast.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <p className="text-xs text-gray-500 mt-1 truncate">{podcast.publisher}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Episodes */}
      <div className="my-10 w-full px-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white hover:underline">Episodes</h3>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide scroll-smooth no-scrollbar">
          {episodes.slice(0, 4).map((episode) => (
            <div
              key={episode.id}
              className="min-w-[250px] sm:min-w-0 relative p-4 rounded-lg group hover:bg-gray-700 transition duration-300"
            >
              <div className="mb-4 relative">
                {episode.images?.[0]?.url && (
                  <img
                    src={episode.images[0].url}
                    alt={episode.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <a href={episode.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <p className="text-white font-semibold text-lg truncate hover:underline">{episode.name}</p>
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <p>{formatReleaseDate(episode.release_date)}</p>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <p>{formatMinutes(episode.duration_ms)}</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={episode.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <FaPlayCircle className="text-4xl text-yellow-400 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>

  )
}

export default HomeSearch
