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
import ServicesMarquee from '../components/servicesmarquee';

export const Services = () => {
  return (
    <div className=''>
    <Navbar />
    <div className="relative">
    <TrackingLine />
            <ParallaxSection speed={-0.1}>
                <div className="  flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8">

               


    <ServicesMarquee />
      

                </div>
            </ParallaxSection>
            <div className="space-y-16 p-8">
                <RevealSection>
                    <div className="flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/backgroundblk.png')` }}>
                    <section className="bg-black py-16 px-8">
                    <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6">
            Uncaged creativity inspires our designs
          </h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content 1*/}
        <div className="lg:w-1/2">
          
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDNudWllMjl0eWNvM3Z1bzRhZDUzNHBnYzVzZWc1ancyd3FwdmYxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bpmNf92LmkoMw/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                    <section className="bg-white py-16 px-8">0
                    <h1 className="text-6xl lg:text-8xl font-bold text-black mb-6">
            Uncaged creativity inspires our designs
          </h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      {/* Image Content */}
      <div className="lg:w-1/2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWY2MGZpcGUwdHpibWY2NWphYnRleWFxMmMzeXFtZzEyaHY0cnUwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41m3lEXGK65TkQHm/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        {/* Text Content 2 */}
        <div className="lg:w-1/2">
          
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

        
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/backgroundblk.png')` }}>
                    <section className="bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content 3*/}
        <div className="lg:w-1/2">
          <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6">
            Uncaged creativity inspires our designs
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzN5NjYwcmN0amg4cnNybjdocXZnZTM1bXFoOHNrbmM2azd1bGNmNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PjJ1cLHqLEveXysGDB/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
       {/* Image Content */}
       <div className="lg:w-1/2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZnYmxieGxjeXMza2J2Y3h1cDdlbzB5OXVvcW83aXB4dXI4cGJzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/huyZxIJvtqVeRp7QcS/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        {/* Text Content 4*/}
        <div className="lg:w-1/2">
          <h1 className="text-6xl lg:text-8xl font-bold text-black mb-6">
            Uncaged creativity inspires our designs
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

       
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className="  flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/backgroundblk.png')` }}>
                    <section className="bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content 5*/}
        <div className="lg:w-1/2">
          <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6">
            Uncaged creativity inspires our designs
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTdlN3dxMGQyODdhaWkxN3NxOWJld3RjMmo3NmoxbmwwMDAweW0yaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zgduo4kWRRDVK/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
{/* Image Content */}
<div className="lg:w-1/2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnExemFiN3NrdTRlamMzZzI2czNsb3IycW5kcGQzc2R0YWtrNnpmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHOezvV1v2GN07S/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content 6*/}
        <div className="lg:w-1/2">
          <h1 className="text-6xl lg:text-8xl font-bold text-black mb-6">
            Uncaged creativity inspires our designs
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

        
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                <RevealSection>
                    <div className=" bg-blue-500 flex items-center text-gray-800 bg-cover relative flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8" style={{ backgroundImage: `url('/src/assets/background.png')` }}>
                    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content 7*/}
        <div className="lg:w-1/2">
          <h1 className="text-6xl lg:text-8xl font-bold text-black mb-6">
            Uncaged creativity inspires our designs
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Rethink the web dev cycle with Webflow. Give your design and
            marketing teams the power to launch sophisticated sites quickly — so
            your dev team can focus on more complex work, not pixel-perfect
            revisions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get started — it's free
          </button>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHNoeXd6ZnZtbmd5NzJsaTQ5ZTllMzNpeDF1dzFwdGwyYzl0MnN3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JPgbfjx4d2sAAkQabX/giphy.webp" // Replace with your image path
            alt="Webflow design interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 text-gray-800">
        <ul className="space-y-8">
          <li>
            <strong className="block text-lg font-semibold">Design without limits</strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Create complex, rich interactions
            </strong>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Empower everyone to build on-brand sites
            </strong>
            <p className="mt-2 text-gray-600">
              Publish faster and strengthen your marketing team’s ability to
              collaborate, experiment, and iterate.
            </p>
          </li>
          <li>
            <strong className="block text-lg font-semibold">
              Get more done with the Webflow AI Assistant
            </strong>
          </li>
        </ul>
      </div>
    </section>
                    </div>
                </RevealSection>
                <RevealSection>
  <div
    className="bg-cover bg-center h-screen text-gray-800 flex flex-col justify-center items-center"
    style={{ backgroundImage: `url('/src/assets/background.png')` }}
  >
    <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Banking Details</h2>
      <p className="text-lg mb-2">
        <strong>Account Name:</strong> RED CUP SERIES PVT LTD
      </p>
      <p className="text-lg mb-2">
        <strong>Bank Name:</strong> FBC
      </p>
      <p className="text-lg mb-2">
        <strong>USD Account Number:</strong> 6880389312020
      </p>
      <p className="text-lg mb-2">
        <strong>Branch:</strong> Leopold Takawira Branch
      </p>
      <p className="text-lg">
        <strong>ZIG Account Number:</strong> 4480389310001
      </p>
    </div>
  </div>
</RevealSection>

            </div>
        </div>
        <Footer />
        </div>
  )
}
