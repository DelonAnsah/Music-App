import React from 'react'
import MediaCard from '../contents/MediaCard'

const Section = ({ title, items, type }) => {
  return (
    <section className='px-4 rounded-lg mb-10'>
      <h3 className="text-white text-xl uppercase font-extrabold leading-6 py-2">{title}</h3>
      <div className="grid grid-cols">
        {items.map(item => (
          <MediaCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </section>
  )
}

export default Section
