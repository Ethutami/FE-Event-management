"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imageslides = [
    { image: '/slide1.png' },
    { image: '/slide2.png' },
    { image: '/slide3.png' }
]

export const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const prevSlide = (): void => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + imageslides.length) % imageslides.length
        );
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageslides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full mx-auto m-8 lg:m-16 items-center justify-around">
            <button onClick={prevSlide} className="hidden md:flex mb-4 md:mb-0">
                <ChevronLeft className="text-gray-400" size={32} />
            </button>
            <div className="flex flex-col items-center justify-center relative w-full md:w-4/6 lg:w-3/6">
                <div className="flex items-center justify-center w-full">
                    <Image
                        src={imageslides[currentIndex].image}
                        alt={`Slider Image ${currentIndex + 1}`}
                        className="object-contain rounded-md responsive-image"
                        style={{ width: "80%", height: "auto" }}
                        width={800}
                        height={800}
                    />
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                    {imageslides.map((_, i) => (
                        <span
                            key={i}
                            className="dot-indicator w-3 h-3 rounded-full transition-colors duration-300"
                            data-active={i === currentIndex}
                        />
                    ))}
                </div>
            </div>
            <button onClick={nextSlide} className="hidden md:flex mb-4 md:mb-0">
                <ChevronRight className="text-gray-400" size={32} />
            </button>
        </div>
    )
}
