"use client"
import React, { useState } from 'react';
import { Image,Card } from '@nextui-org/react';

interface CarouselProps {
    images: string[];
    visibleCount: number; // Number of images to display at once
}

const Carousel: React.FC<CarouselProps> = ({ images, visibleCount }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    const calculateVisibleImages = () => {
        const endIndex = Math.min(currentIndex + visibleCount, images.length);
        const endPart = images.slice(currentIndex, endIndex);
        const startPart = images.slice(0, Math.max(endIndex - images.length, 0));
        return [...endPart, ...startPart];
    };

    return (
        <Card className={"bg-gray-200"}>
         <div className="relative w-full overflow-hidden">
                <div className="relative flex gap-2 p-4">
                    {calculateVisibleImages().map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full md:w-1/4 transition-opacity duration-700 ease-in-out"
                        >
                            <Image
                                src={src}
                                alt={`Carousel ${index + 1}`}
                                className="h-full w-11/12 object-cover"
                            />
                        </div>
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
                        <path d="M15 19l-7-7 7-7"/>
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
                        <path d="M9 5l7 7-7 7"/>
                    </svg>
                </button>



            </div>
        </Card>
    );
};

export default Carousel;
