import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <div>
    <Navbar />
    <div>
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-lg md:text-xl">
            We believe 
          </p><p className="text-4xl mb-4 font-black typewriter-text">Mindset is Everything</p>
        </div>
        
      </section>

      {/* Company Description */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <p className="text-lg leading-relaxed text-center md:text-left">
            Our company was founded with a vision to provide exceptional services 
            and create innovative solutions. We are passionate about delivering 
            quality and value to our clients and making a positive impact on the world.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="mx-auto rounded-full w-32 h-32 mb-4"
              />
              <h3 className="text-xl font-bold">Jane Doe</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="mx-auto rounded-full w-32 h-32 mb-4"
              />
              <h3 className="text-xl font-bold">John Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="mx-auto rounded-full w-32 h-32 mb-4"
              />
              <h3 className="text-xl font-bold">Alice Brown</h3>
              <p className="text-gray-600">Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <p className="text-center text-lg">
            Have questions or want to work with us? Reach out at{' '}
            <a href="mailto:info@example.com" className="text-blue-600 underline">
              info@example.com
            </a>
          </p>
        </div>
      </section>
    </div>
    </div>
    <Footer />
    </div>
  )
}
