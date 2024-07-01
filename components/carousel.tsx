import React, { useState } from 'react';
import { Image } from '@nextui-org/react';

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/79e09a107825591.5fafef7735182.png',
        'https://th.bing.com/th/id/R.7bc77e35761679a63b8eed1612d83e16?rik=Fd8Guusz74GhKw&pid=ImgRaw&r=0',
        // '/docs/images/carousel/carousel-3.svg',
        // '/docs/images/carousel/carousel-4.svg',
        // '/docs/images/carousel/carousel-5.svg',
    ];

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
        <div className="relative w-full">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={src}
                            alt={`Carousel ${index + 1}`}
                            className="h-full w-full"
                        />

                    </div>


                ))}

            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'}`}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
            <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 flex items-center justify-center w-12 h-12 bg-gray-800/50 text-white rounded-full focus:outline-none"
                onClick={prevSlide}
            >
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 flex items-center justify-center w-12 h-12 bg-gray-800/50 text-white rounded-full focus:outline-none"
                onClick={nextSlide}
            >
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Carousel;
