import React from 'react';
import headphone from '../../assets/Hero.jpg';

const Hero = () => {
  return (
    <section
      className="bg-cover bg-center min-h-[50vh] sm:min-h-[70vh] lg:min-h-[70vh] relative flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20"
      style={{ backgroundImage: `url(${headphone})` }}
    >

      <div className="absolute inset-0 bg-black opacity-60" />

      <div className="relative z-10 text-white max-w-xl text-center sm:text-right">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight">
          Feel the Beat, <br />
          <span className="text-yellow-400">Live the Music 🎶</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300">
          Your favorite tunes, lyrics, and vibes – all in one place.
        </p>
      </div>
    </section>
  );
};

export default Hero;
