import React from 'react'
import spinner from '../assets/Spinner.gif'

const Loader = ({ size = 64, centered = true }) => {
  return (
    <div className={centered ? 'flex justify-center items-center h-96' : ''}>
      <img src={spinner}
        alt="Loading..."
        style={{ width: size, height: size }}
        className="animate-pulse" />
    </div>
  )
}

export default Loader
