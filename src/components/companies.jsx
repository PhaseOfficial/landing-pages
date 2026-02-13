import React from 'react';
import logo1 from '../assets/logos/d30.png';
import logo2 from '../assets/logos/d31.png';
import logo3 from '../assets/logos/d9.png';
import logo4 from '../assets/logos/d32.png';
import logo5 from '../assets/logos/d33.png';
import logo6 from '../assets/logos/d35.png';
import logo7 from '../assets/logos/d36.png';
import logo8 from '../assets/logos/d13.png';
import logo9 from '../assets/Vybrant.png';
import Marquee from 'react-fast-marquee';

const LogoMarquee = () => {
  return (
    <div className='mt-10'>
      {/* Added 'text-center' to this line */}
      <h2 className="text-red-800 font-bold mb-4 text-2xl text-center">Brands We interacted with</h2>
      
      <Marquee gradient={false} speed={50}>
        <div className="flex items-center space-x-8 py-4 px-4">
          {/* Logo Images */}
          <img src={logo1} alt="Logo 1" className="h-40 bg-white p-2 rounded shadow-md" />
          <img src={logo2} alt="Logo 2" className="h-40 bg-gray-500 p-2 rounded shadow-md" />
          <img src={logo3} alt="Logo 3" className="h-40 bg-white p-2 rounded shadow-md" />
          <img src={logo4} alt="Logo 4" className="h-40 bg-gray-500 p-2 rounded shadow-md" />
          <img src={logo5} alt="Logo 5" className="h-40 bg-white p-2 rounded shadow-md" />
          <img src={logo6} alt="Logo 6" className="h-40 bg-gray-500 p-2 rounded shadow-md" />
          <img src={logo7} alt="Logo 7" className="h-40 bg-white p-2 rounded shadow-md" />
          <img src={logo8} alt="Logo 8" className="h-40 bg-gray-400 p-2 rounded shadow-md" />
          <img src={logo9} alt="Vybrant Logo" className="h-40 bg-gray-400 p-2 rounded shadow-md" />
          
          {/* Note: react-fast-marquee handles looping automatically, 
              so you don't strictly need to manually duplicate the images 
              unless the total width is less than the screen width. 
              I kept the structure clean here. */}
        </div>
      </Marquee>
    </div>
  );
};

export default LogoMarquee;