import React from 'react';
import ParallaxSection from '../components/ParallaxSection';
import TrackingLine from '../components/TrackingLine';
import RevealSection from '../components/RevealSection';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { BiSolidTShirt } from 'react-icons/bi';
import { FaBrain } from 'react-icons/fa';
import { FaDesktop } from 'react-icons/fa6';
import { MdDesignServices } from 'react-icons/md';

export const Services = () => {
  return (
    <div className=''>
    <Navbar />
    <div className="relative">
            <TrackingLine />
            <ParallaxSection speed={-0.1}>
                <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/Artboard4.png')` }}>
                    <h1 className="text-white text-2xl font-bold mb-10">We offer a wide range of services</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      
      
    </div>
                </div>
            </ParallaxSection>
            <div className="space-y-16 p-8">
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 1</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                        <h2 className="text-2xl font-bold">Service 2</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
            </div>
        </div>
        <Footer />
        </div>
  )
}
