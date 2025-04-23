import React, { useState } from "react";

const LyricsHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 overflow-hidden">
      
      {/* Blurry Placeholder */}
      <img
        src="https://res.cloudinary.com/dqfgklund/image/upload/e_blur:1000,q_10,f_auto,w_1200/v1745437668/Hero_10_bmb6jz.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Responsive Full-Res Image */}
      <picture>
        <source
          srcSet="https://res.cloudinary.com/dqfgklund/image/upload/q_auto,f_auto,dpr_auto/v1745437668/Hero_10_bmb6jz.webp"
          type="image/webp"
        />
        <img
          src="https://res.cloudinary.com/dqfgklund/image/upload/q_auto,f_auto,dpr_auto/v1745437668/Hero_10_bmb6jz.jpg"
          alt="Lyrics Hero Background"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          srcSet="
            https://res.cloudinary.com/dqfgklund/image/upload/w_400,q_auto,f_auto,dpr_auto/v1745437668/Hero_10_bmb6jz.jpg 400w,
            https://res.cloudinary.com/dqfgklund/image/upload/w_800,q_auto,f_auto,dpr_auto/v1745437668/Hero_10_bmb6jz.jpg 800w,
            https://res.cloudinary.com/dqfgklund/image/upload/w_1200,q_auto,f_auto,dpr_auto/v1745437668/Hero_10_bmb6jz.jpg 1200w
          "
          sizes="(max-width: 480px) 400px,
                 (max-width: 768px) 800px,
                 (max-width: 1280px) 1200px,
                 1200px"
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-60 z-20" />

      {/* Text Content */}
      <div className="relative z-30 text-white max-w-2xl text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug">
          "Find the Lyrics <br />
          That Speak to Your Soul"
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300">
          Sing along, vibe out, and feel the music.
        </p>
      </div>
    </section>
  );
};

export default LyricsHero;
