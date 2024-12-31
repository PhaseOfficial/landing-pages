import React, { useEffect, useState } from 'react';

const TrackingLine = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed left-8 top-0 h-full w-1 bg-gray-300">
            <div
                className="w-4 h-4 bg-gray-800 rounded-full absolute"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            ></div>
        </div>
    );
};

export default TrackingLine;

