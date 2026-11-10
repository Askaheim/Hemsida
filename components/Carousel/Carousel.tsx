'use client';

import React, { useState } from 'react';
import Image from 'next/image';


interface CarouselImage {
  url: string;
  description: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  const totalImages = images.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div className="relative mx-auto aspect-3/2 w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:aspect-[3/1]">
      {totalImages === 1 ? (
        <Image
          src={images[0].url}
          alt={images[0].description || 'Image 1'}
          className="h-full w-full object-cover"
          fill
        />
      ) : (
        <div className="flex h-full gap-2 p-2">
          {[-1, 0, 1].map((offset) => {
            const imageIndex = (currentIndex + offset + totalImages) % totalImages;
            const image = images[imageIndex];

            return (
              <div
                key={offset}
                className={`relative min-w-0 flex-1 overflow-hidden rounded-xl transition-opacity duration-300 ${offset === 0 ? 'opacity-100' : 'opacity-60'
                  }`}
              >
                <Image
                  src={image.url}
                  alt={image.description || `Image ${imageIndex + 1}`}
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
            );
          })}
        </div>
      )}

      {totalImages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bronze-1 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bronze-1 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${currentIndex === index
                  ? 'bg-white border-white scale-110'
                  : 'bg-white/40 border-transparent'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default ImageCarousel;