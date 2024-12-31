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
                <div className="h-screen bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                    <h1 className="text-red-800 text-2xl font-bold mb-10">We offer a wide range of services</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="flex flex-col items-center">
      <BiSolidTShirt className='text-9xl'/>
        <span className="mt-2 text-muted-foreground"  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Web design and Development</span>
      </div>
      <div className="flex flex-col items-center">
      <MdDesignServices className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">App designs and Development</span>
      </div>
      <div className="flex flex-col items-center">
      <FaBrain className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">AI Solutions</span>
      </div>
      <div className="flex flex-col items-center">
      <FaBrain className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">Fashion graphics design</span>
      </div>
      <div className="flex flex-col items-center">
      <FaBrain className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">General Graphics Design</span>
      </div>
      <div className="flex flex-col items-center">
      <FaBrain className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">Product fix and supply</span>
      </div>
      <div className="flex flex-col items-center">
      <FaDesktop className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">Digital Marketing</span>
      </div>
      <div className="flex flex-col items-center">
      <FaBrain className='text-9xl'/>
        <span className="mt-2 text-muted-foreground">Digital Products creation</span>
      </div>
      
    </div>
                </div>
            </ParallaxSection>
            <div className="space-y-16 p-8">
                <RevealSection>
                    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Service 1</h2>
                        <p className="text-gray-600">Details about the service...</p>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
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
