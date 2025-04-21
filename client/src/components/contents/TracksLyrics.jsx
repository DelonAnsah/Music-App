import React, { useContext } from 'react';
import LyricsContext from '../Context/LyricsContext';
import { FaMusic, FaPlayCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; 

const TracksLyrics = () => {
  const { tracksList } = useContext(LyricsContext);


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-yellow-400">Lyrics Search Results</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Dive into the lyrics of your favorite songs with a single click.
        </motion.p>

        {tracksList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mb-6 text-yellow-400"
            >
              <FaMusic size={70} />
            </motion.div>
            <p className="text-xl text-gray-400 font-medium">
              No lyrics found yet. Search for a song to get started!{' '}
              <FaMusic className="inline-block text-yellow-400 ml-2" />
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tracksList.map((track, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="relative bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
              >
                <div className="relative group">
                  <img
                    src={track.result.song_art_image_url}
                    alt={track.result.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-900/80 to-transparent p-2 text-sm text-white rounded-tl-lg">
                    {track.result.release_date_for_display || 'Unknown'}
                  </div>
                
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <a
                      href={track.result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400"
                    >
                      <FaPlayCircle size={48} className="drop-shadow-lg" />
                    </a>
                  </motion.div>
                </div>

                <div className="mt-6 text-left">
                  <h3 className="text-xl font-bold text-yellow-400 truncate">{track.result.full_title}</h3>
                  <p className="text-sm text-gray-300 truncate">{track.result.artist_names}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {track.result.annotation_count || 0} Annotations
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={track.result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-300 hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      View Lyrics
                    </a>
                    <span className="text-xs text-gray-400">{track.result.stats?.pageviews?.toLocaleString() || 0} Views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TracksLyrics;