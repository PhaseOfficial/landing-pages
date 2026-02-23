import { useState } from 'react';
import RevealSection from '../components/RevealSection';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import SEO from '../components/SEO';

const Services = () => {
  const [expandedSections, setExpandedSections] = useState({
    mobileApps: false,
    generalGraphics: false,
    fashionGraphics: false,
    aiSolutions: false,
    digitalMarketing: false,
    webDevelopment: false,
    productSourcing: false
  });

  const toggleContent = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Button Style
  const buttonClass = "w-full mt-4 bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition text-center block";
  
  // Card Style (Glass-like effect on gradient background)
  const cardClass = "bg-white/80 backdrop-blur-sm border border-white/50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full";

  return (
    <div className=''>
      <SEO 
        title="Our Services" 
        description="Explore our professional services: Mobile App Development, Graphic Design, AI Solutions, Digital Marketing, Web Development, and Product Sourcing."
      />
      <Navbar />
      
      {/* Header */}
      <div className="relative pt-32 pb-12 text-center px-4">
        <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-4'>Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our wide range of professional services designed to help you grow.
        </p>
      </div>
      
      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. Mobile Apps (LINKED) */}
          <RevealSection>
            <div className={cardClass}>
              <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHNoeXd6ZnZtbmd5NzJsaTQ5ZTllMzNpeDF1dzFwdGwyYzl0MnN3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JPgbfjx4d2sAAkQabX/giphy.webp"
                  alt="Mobile Apps"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Mobile App Dev</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Powerful, user-friendly apps for business or e-commerce. We build sleek solutions that engage users.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('mobileApps')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.mobileApps ? '-' : '+'}</span>
                 </div>
                 {expandedSections.mobileApps && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• Custom iOS & Android builds</li>
                        <li>• High performance & speed</li>
                        <li>• Intuitive User Experience</li>
                    </ul>
                 )}
              </div>
              <a href="https://web.redcupseries.co.zw" target="_blank" rel="noopener noreferrer" className={buttonClass}>Get Started</a>
            </div>
          </RevealSection>

          {/* 2. General Graphics */}
          <RevealSection>
            <div className={cardClass}>
              <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                   src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDNudWllMjl0eWNvM3Z1bzRhZDUzNHBnYzVzZWc1ancyd3FwdmYxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bpmNf92LmkoMw/giphy.webp"
                   alt="Graphics"
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Graphic Design</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Uncaged creativity. We craft compelling posters, packaging, and brand elements that captivate.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('generalGraphics')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.generalGraphics ? '-' : '+'}</span>
                 </div>
                 {expandedSections.generalGraphics && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• Attention-grabbing visuals</li>
                        <li>• Concept to Reality</li>
                        <li>• Aesthetic development</li>
                    </ul>
                 )}
              </div>
              <button className={buttonClass}>Get Started</button>
            </div>
          </RevealSection>

          {/* 3. Fashion Graphics */}
          <RevealSection>
            <div className={cardClass}>
              <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWY2MGZpcGUwdHpibWY2NWphYnRleWFxMmMzeXFtZzEyaHY0cnUwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41m3lEXGK65TkQHm/giphy.webp"
                  alt="Fashion"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Fashion Graphics</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Where style meets imagination. Unique logos and stunning visuals tailored for your fashion brand.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('fashionGraphics')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.fashionGraphics ? '-' : '+'}</span>
                 </div>
                 {expandedSections.fashionGraphics && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• Trend-setting designs</li>
                        <li>• Brand identity focus</li>
                        <li>• Custom apparel prints</li>
                    </ul>
                 )}
              </div>
              <button className={buttonClass}>Get Started</button>
            </div>
          </RevealSection>

          {/* 4. AI Solutions (LINKED) */}
          <RevealSection>
            <div className={cardClass}>
              <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzN5NjYwcmN0amg4cnNybjdocXZnZTM1bXFoOHNrbmM2azd1bGNmNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PjJ1cLHqLEveXysGDB/giphy.webp"
                  alt="AI"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">AI Solutions</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Intelligent innovation. Predictive analytics, automation, and data science to empower decisions.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('aiSolutions')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.aiSolutions ? '-' : '+'}</span>
                 </div>
                 {expandedSections.aiSolutions && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• Business Process Automation</li>
                        <li>• Predictive Analytics</li>
                        <li>• Data-driven insights</li>
                    </ul>
                 )}
              </div>
              <a href="https://web.redcupseries.co.zw" target="_blank" rel="noopener noreferrer" className={buttonClass}>Get Started</a>
            </div>
          </RevealSection>

          {/* 5. Digital Marketing */}
          <RevealSection>
            <div className={cardClass}>
              <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZnYmxieGxjeXMza2J2Y3h1cDdlbzB5OXVvcW83aXB4dXI4cGJzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/huyZxIJvtqVeRp7QcS/giphy.webp"
                  alt="Marketing"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Digital Marketing</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Amplify your brand. Social media, SEO, and campaigns that connect, engage, and convert.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('digitalMarketing')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.digitalMarketing ? '-' : '+'}</span>
                 </div>
                 {expandedSections.digitalMarketing && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• SEO & Visibility</li>
                        <li>• Targeted Campaigns</li>
                        <li>• Audience Engagement</li>
                    </ul>
                 )}
              </div>
              <button className={buttonClass}>Get Started</button>
            </div>
          </RevealSection>

          {/* 6. Web Development (LINKED) */}
          <RevealSection>
            <div className={cardClass}>
              <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                   src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTdlN3dxMGQyODdhaWkxN3NxOWJld3RjMmo3NmoxbmwwMDAweW0yaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zgduo4kWRRDVK/giphy.webp"
                   alt="Web Dev"
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Web Development</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Websites that inspire. Sleek portfolios, robust e-commerce, and platforms that perform.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('webDevelopment')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.webDevelopment ? '-' : '+'}</span>
                 </div>
                 {expandedSections.webDevelopment && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• Responsive Design</li>
                        <li>• Custom Functionality</li>
                        <li>• User-Centric UI/UX</li>
                    </ul>
                 )}
              </div>
              <a href="https://web.redcupseries.co.zw" target="_blank" rel="noopener noreferrer" className={buttonClass}>Get Started</a>
            </div>
          </RevealSection>

          {/* 7. Product Sourcing */}
          <RevealSection>
            <div className={cardClass}>
               <div className="h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnExemFiN3NrdTRlamMzZzI2czNsb3IycW5kcGQzc2R0YWtrNnpmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHOezvV1v2GN07S/giphy.webp"
                  alt="Sourcing"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Sourcing</h2>
              <p className="text-gray-600 text-sm flex-grow">
                Delivering perfection. We find, evaluate, and purchase quality goods on your behalf.
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                 <div onClick={() => toggleContent('productSourcing')} className="cursor-pointer flex justify-between items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                    <span>View Features</span>
                    <span>{expandedSections.productSourcing ? '-' : '+'}</span>
                 </div>
                 {expandedSections.productSourcing && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li>• Market Scouting</li>
                        <li>• Quality Assurance</li>
                        <li>• Logistics Handling</li>
                    </ul>
                 )}
              </div>
              <button className={buttonClass}>Get Started</button>
            </div>
          </RevealSection>

        </div>
      </div>

      {/* --- SEPARATE BANKING SECTION --- */}
      <div className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider text-blue-400">Official Banking Details</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-2xl mx-auto">
                <div className="space-y-4 text-lg">
                   <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 pb-2">
                       <span className="text-gray-400">Account Name</span> 
                       <span className="font-bold text-white">RED CUP SERIES PVT LTD</span>
                   </div>
                   <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 pb-2">
                       <span className="text-gray-400">Bank</span> 
                       <span className="font-semibold">FBC Bank</span>
                   </div>
                   <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 pb-2">
                       <span className="text-gray-400">USD Account</span> 
                       <span className="font-mono text-xl text-green-400">6880389312020</span>
                   </div>
                   <div className="flex flex-col sm:flex-row justify-between items-center">
                       <span className="text-gray-400">ZIG Account</span> 
                       <span className="font-mono text-xl text-yellow-400">4480389310001</span>
                   </div>
                   <div className="pt-4 text-sm text-gray-500 italic">
                        Branch: Leopold Takawira
                   </div>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;