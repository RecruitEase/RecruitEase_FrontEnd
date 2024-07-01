import React, { useState } from 'react';
import { Image } from '@nextui-org/react';

const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpaY0tF99xM90L3_GHqKLapOUSu70Nu3iozdE20Qdvo7aHF5P65_nb2n2Ww&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpaY0tF99xM90L3_GHqKLapOUSu70Nu3iozdE20Qdvo7aHF5P65_nb2n2Ww&s',
    // \'/docs/images/carousel/carousel-3.svg\',\n' +
    // '    \'/docs/images/carousel/carousel-4.svg\',\n' +
    // '    \'/docs/images/carousel/carousel-5.svg',
];

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative w-full" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`${index === currentIndex ? 'block' : 'hidden'} duration-700 ease-in-out`}
                        data-carousel-item={index === currentIndex ? 'active' : ''}
                    >
                        <Image
                            src={src}
                            alt={`Carousel ${index + 1}`}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'}`}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        data-carousel-slide-to={index}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={prevSlide}
            >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
              className="w-4 h-4 text-white transform rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
          >
            <path
                fillRule="evenodd"
                d="M10 3.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 3.586zM4.293 7.293a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 4.414 5.707 8.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={nextSlide}
            >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
          >
            <path
                fillRule="evenodd"
                d="M10 3.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 3.586zM4.293 7.293a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 4.414 5.707 8.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
            </button>
        </div>
    );
};

export default Carousel;
