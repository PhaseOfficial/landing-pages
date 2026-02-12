import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import Contactus from '../components/Contactus';
import { cn } from '../lib/utils'; // Ensure you have this, or remove cn() usage if not

// Icons
import { FaLinkedin } from "react-icons/fa";
import { 
  Rocket, 
  Target, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle,
  Lightbulb,
  Heart
} from 'lucide-react';

// Images
import Logo from "../assets/d10.png"; 
import CIPZLogo from '../assets/CIPZ Logo (1).png';
import PAmhonde from '../assets/pamhonde.png';
import Cvutete from '../assets/cvutete.png';
import Cchadiwa from '../assets/cchadiwa.png';
import gowani from '../assets/gowani.jpg';

// Team data
const teamMembers = [
  {
    name: "Arthur Mhonde",
    role: "CEO",
    bio: "A visionary leader with a passion for digital innovation and strategic growth, guiding Red Cup Series to new heights.",
    image: PAmhonde,
    linkedin: "https://www.linkedin.com/in/panashe-arthur-mhonde-2917b6261/",
  },
  {
    name: "Christopher Vutete",
    role: "Managing Director",
    bio: "With extensive experience in operations and management, Christopher ensures the smooth and efficient running of all projects.",
    image: Cvutete,
    linkedin: "https://www.linkedin.com/in/christopher-vutete-603b8166/",
  },
  {
    name: "Craig Chadiwa",
    role: "CTO",
    bio: "A brilliant technologist leading our development teams, constantly exploring new frontiers in web technology.",
    image: Cchadiwa,
    linkedin: "https://www.linkedin.com/in/craig-chadiwa-16485724a/",
  },
  {
    name: "Gamuchirai Gowani",
    role: "Head of Marketing",
    bio: "Driving our brand's voice and outreach, Gamuchirai connects Red Cup Series with clients and communities.",
    image: gowani,
    linkedin: "https://www.linkedin.com/in/",
  },
];

const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "Projects Shipped", value: "150+" },
  { label: "Happy Clients", value: "30+" },
];

const About = () => {
  // Removed useThemeClasses hook

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-gray-50 text-gray-900">
      <Navbar />

      {/* === HERO SECTION === */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/10 blur-[120px] rounded-full mix-blend-screen" />
           <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={Logo} alt="Red Cup Series Logo" className="h-24 w-auto mx-auto mb-8" />
            <span className="inline-block py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border bg-red-50 text-red-600 border-red-100">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
              Mindset is <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Everything.</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-600">
              We believe technology is more than just a tool it's a lifestyle. We combine innovation with everyday essentials to enrich lives.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 py-8 border-y border-gray-100"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold mb-1 text-gray-900">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === STORY & MISSION GRID === */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Our Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6 text-red-600 font-bold">
                <Rocket className="w-5 h-5" />
                <span className="uppercase tracking-widest text-sm">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Free vibes, Happy vibes, <br className="hidden md:block"/> Serious Innovation.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-600">
                <p>
                  At <strong className="text-red-600">Red Cup Series</strong>, our name is derived from the iconic party solo cups to associate the brand with free and happy vibes. But our mission is grounded in purpose.
                </p>
                <p>
                  Founded with a vision to improve livelihoods, we blend <strong className="text-red-600">cutting-edge innovation</strong> with everyday essentials. From high-quality clothing to advanced technological devices, we source and deliver the best.
                </p>
                <p>
                  Our expertise spans app development, AI & data science, and creative design. We don't just build software; we craft solutions that address daily challenges, making life simpler and more efficient.
                </p>
              </div>
            </motion.div>

            {/* Right: Mission Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-orange-500 rounded-[2rem] rotate-2 opacity-10 blur-xl" />
              <div className="relative p-8 md:p-12 rounded-[2rem] border shadow-xl bg-white border-gray-100">
                <div className="flex items-center gap-2 mb-8 text-orange-600 font-bold">
                  <Target className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-sm">Our Mission & Vision</span>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
                        <Lightbulb className="w-5 h-5 text-yellow-500" /> Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        To enhance livelihoods by delivering innovative, high-quality technology and lifestyle solutions that empower individuals and businesses to thrive in a rapidly evolving world.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
                        <Heart className="w-5 h-5 text-red-500" /> Core Values
                    </h3>
                    <ul className="space-y-3 mt-4">
                    {[
                        "Innovation in every solution.",
                        "Uncompromising Quality.",
                        "Collaboration that empowers.",
                        "Seamless Tech & Lifestyle integration."
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">{item}</span>
                        </li>
                    ))}
                    </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === TEAM SECTION === */}
      {/* <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <span className="text-red-600 font-bold tracking-widest uppercase text-sm">The Minds Behind The Magic</span>
                <h2 className="text-4xl font-bold mt-2 text-gray-900">Meet the Team</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group rounded-2xl p-6 text-center border transition-all duration-300 hover:shadow-xl bg-white border-gray-100"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg" />
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover rounded-full border-2 border-gray-100 shadow-sm relative z-10"
                            />
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                        <p className="text-red-600 text-sm font-medium mb-4">{member.role}</p>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            {member.bio}
                        </p>
                        {member.linkedin && (
                            <a 
                                href={member.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                <FaLinkedin size={18} />
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
      </section> */}

      {/* === CIPZ TRUST SECTION === */}
      <section className="py-24 px-6 relative overflow-hidden bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] border transition-all duration-500 bg-white border-gray-200 shadow-2xl"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -mr-20 -mt-20" />
            
            <div className="relative p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em]">
                    Compliance & Security
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
                  A Fully Registered <br /> Creative Agency.
                </h2>
                
                <p className="text-lg max-w-lg mb-8 text-gray-600 leading-relaxed">
                  We take professional accountability seriously. Red Cup Series is a legally recognized entity in Zimbabwe, verified through the <strong>Companies and Intellectual Property Zimbabwe (CIPZ)</strong> portal.
                </p>

                <motion.a 
                  href="https://cipz.pfms.gov.zw:8090/Info/Checkacompany?=70276A02122025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-3 text-blue-600 font-bold text-lg hover:underline"
                >
                  Verify Registry Status <ExternalLink className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Logo / Badge Side */}
              <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-125 group-hover:bg-blue-500/20 transition-colors" />
                <div className="relative p-10 md:p-14 rounded-[2.5rem] border backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 bg-gray-50/50 border-gray-100">
                  <img 
                    src={CIPZLogo} 
                    alt="CIPZ Official Logo" 
                    className="h-28 md:h-36 w-auto object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === CONTACT SECTION === */}
      <Contactus className="mt-12" />
      
      <Footer />
    </div>
  );
};

export default About;