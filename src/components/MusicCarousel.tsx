import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Album {
  cover: string;
  name: string;
  artist: string;
}

const albums: Album[] = [
  {
    cover: '/albums/neverenough.webp',
    name: 'NEVER ENOUGH',
    artist: 'Daniel Caesar'
  },
  {
    cover: '/albums/takecare.webp',
    name: 'Take Care',
    artist: 'Drake'
  },
  {
    cover: '/albums/always.webp',
    name: 'ALWAYS',
    artist: 'keshi'
  }
];

export const MusicCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % albums.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % albums.length);
  }, []);

  const currentAlbum = useMemo(() => albums[currentIndex], [currentIndex]);

  return (
    <div
      className="relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Music carousel"
    >
      {/* Album Display */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
        {albums.map((album, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={album.cover}
              alt={`${album.name} by ${album.artist}`}
              className="w-full h-full object-cover"
              loading={index === currentIndex ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 z-10"
          aria-label="Previous album"
        >
          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 z-10"
          aria-label="Next album"
        >
          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Album Info */}
      <div className="mt-4 text-center">
        <h4 className="text-gray-900 font-semibold text-lg md:text-xl transition-all duration-700">
          {currentAlbum.name}
        </h4>
        <p className="text-gray-600 text-sm md:text-base transition-all duration-700">
          {currentAlbum.artist}
        </p>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {albums.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 bg-gray-900'
                : 'w-1.5 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to album ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
};
