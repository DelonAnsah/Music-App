import React from 'react'

const SpotifyPlayer = ({ uri, onClose }) => {
  if (!uri) return null;

  
  return (
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-4 shadow-lg z-50">
      <div className="max-w-screen-2xl mx-auto relative">
        <iframe
          src={`https://open.spotify.com/embed?uri=${uri}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
          className="rounded-lg"
          allowTransparency="true"
        ></iframe>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:text-yellow-400"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}

export default SpotifyPlayer
