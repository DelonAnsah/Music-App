import React from "react";
import Hero from "../../assets/Hero 10.jpg";

const LyricsHero = () => {
  return (
    <section
      className="bg-cover bg-center min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] relative flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-white max-w-2xl text-center sm:text-left">
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
