import { useState, useEffect } from 'react';
import d1 from '../assets/d1.png';
import d2 from '../assets/d2.png';
import d3 from '../assets/d3.png';
import d4 from '../assets/d4.png';
import d5 from '../assets/d5.png';
import d6 from '../assets/d6.png';
import d7 from '../assets/d7.png';
import d8 from '../assets/d8.png';
import d26 from '../assets/d26.png';
import d27 from '../assets/d27.png';
import weblogo from '../assets/d10.png';

export default function HeroSection() {
    // State for Image Slideshow
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [d1, d2, d3, d4, d5, d6, d7, d8, d26, d27];

    // State for Typewriter Effect
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Where Quality is Priority";

    // 1. Handle Image Slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // 2. Handle Typing Animation
    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100); // Adjust speed here (lower number = faster)

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section className="relative flex flex-col md:flex-row items-center mb-20 justify-center min-h-screen-0 bg-background text-primary pb-12">
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8">
                <h1 className="mb-4 flex justify-center">
                    <img src={weblogo} alt="logo" className="logo-home " />
                </h1>
                
                {/* Typewriter Text Container */}
                <div className="h-16 flex items-center justify-center"> {/* Fixed height to prevent layout shift */}
                    <p className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-600 font-montserrat text-center">
                        {displayedText}
                        {/* Blinking Cursor */}
                        <span className="animate-pulse text-purple-600">|</span>
                    </p>
                </div>
                
                {/* Button Container */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                    <a
                        href="#"
                        className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto text-center"
                    >
                        Shop Now
                    </a>
                    <a
                        href="https://web.redcupseries.co.zw"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all duration-300 w-full sm:w-auto text-center"
                    >
                        Web Services
                    </a>
                </div>
            </div>

            {/* Slideshow images */}
            <div className="relative w-full h-64 md:w-1/2">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className={`absolute top-0 left-0 pb-8 object-cover transition-opacity duration-500 ${
                            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}