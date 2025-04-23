import React, { useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative min-h-[50vh] sm:min-h-[70vh] lg:min-h-[70vh] flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 overflow-hidden">

      {/* Blurred placeholder background */}
      <img
        src="https://res.cloudinary.com/dqfgklund/image/upload/e_blur:1000,q_10,f_auto,w_1200/v1745437703/Hero_ughpkn.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Full quality image with transition */}
      <picture>
        <source
          srcSet="https://res.cloudinary.com/dqfgklund/image/upload/q_auto,f_auto,dpr_auto/v1745437703/Hero_ughpkn.webp"
          type="image/webp"
        />
        <img
          src="https://res.cloudinary.com/dqfgklund/image/upload/q_auto,f_auto,dpr_auto/v1745437703/Hero_ughpkn.jpg"
          alt="Headphones and Music"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          srcSet="
            https://res.cloudinary.com/dqfgklund/image/upload/w_400,q_auto,f_auto,dpr_auto/v1745437703/Hero_ughpkn.jpg 400w,
            https://res.cloudinary.com/dqfgklund/image/upload/w_800,q_auto,f_auto,dpr_auto/v1745437703/Hero_ughpkn.jpg 800w,
            https://res.cloudinary.com/dqfgklund/image/upload/w_1200,q_auto,f_auto,dpr_auto/v1745437703/Hero_ughpkn.jpg 1200w
          "
          sizes="(max-width: 480px) 400px,
                 (max-width: 768px) 800px,
                 (max-width: 1280px) 1200px,
                 1200px"
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-20" />

      {/* Text content */}
      <div className="relative z-30 text-white max-w-xl text-center sm:text-right">
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
