import React from 'react'
import { FaCheckCircle, FaPlayCircle, FaRegHeart, FaRegListAlt, FaShareSquare } from 'react-icons/fa';


const MediaCard = ({ item, type }) => {
  const isShow = type === 'show';
  const isAlbumOrSong = type === 'album' || type === 'song';

  return (
    <div className='flex break-words gap-3 md:gap-6 justify-start items-center mb-11'>
      <div className='relative w-[110px] h-[110px] md:w-[210px] md:h-[210px]'>
        <img src={
          (type === 'song' && item.album?.images?.[0]?.url) ||
          item.images?.[0]?.url ||
          ''
        } alt={item.name} className='w-full h-full object-cover' loading='lazy' />
        <div className='absolute inset-0 bg-black bg-opacity-20 transition-opacity' />
      </div>
      <div className='flex flex-1 flex-col'>
        {isAlbumOrSong && (
          <>
            <p className="text-white text-xs md:text-base mt-1 md:mt-2  hover:text-yellow-500 truncate">{item.artists.map(artist => artist.name).join(', ')}</p>
            <h3 className="text-sm md:text-lg   font-bold text-white hover:text-yellow-500 truncate">{item.name}</h3>
            <span className='hidden md:flex '>
              <p className="text-white mt-2">
                Release Date:{' '}
                {new Date(
                  item.album?.release_date || item.release_date || Date.now()
                ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}{' '}
                by <span className="text-yellow-500 font-bold">{item.name}</span>
              </p>
              <span className='mt-3 text-yellow-400'><FaCheckCircle /></span>
            </span>

          </>
        )}

        {isShow && (
          <>
            <p className="text-white text-xs sm:text-sm md:text-base mt-1 md:mt-2 whitespace-normal overflow-hidden line-clamp-2 md:line-clamp-none">
              {item.description.split('. ').slice(0,1).join('. ') + '.'}
            </p>
            <h3 className="text-sm md:text-lg font-bold text-white mt-1 md:mt-2 hover:text-yellow-500 overflow-hidden">{item.name}</h3>
          </>
        )}

        <div className='flex text-white gap-5 mt-2 md:mt-3 items-center text-center'>
          <a href={item.external_urls.spotify} target="_blank" rel="noopener noreferrer" className='text-3xl md:text-5xl  hover:text-yellow-400'>
            <FaPlayCircle />
          </a>
          <button className='hidden md:block  hover:text-yellow-400'>
            <FaRegHeart />
            <p className='text-gray-200 mt-2'>Like</p>
          </button>
          <button className='hidden md:block  hover:text-yellow-400'>
            <FaRegListAlt />
            <p className='text-gray-200 mt-2'>PlayList</p>
          </button>
          <button className='hidden md:block  hover:text-yellow-400'>
            <FaShareSquare />
            <p className='text-gray-200 mt-2'>Share</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaCard
