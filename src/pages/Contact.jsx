import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ContactForm from "../components/ContactForm"; 
import SEO from "../components/SEO";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-red-500 selection:text-white">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Red Cup Series. Call, email, or visit us in Harare. We are ready to start a conversation about your next project."
      />
      <Navbar />
      
      {/* === HEADER SECTION === */}
      <div className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-40">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100 blur-[100px] rounded-full mix-blend-multiply" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 blur-[100px] rounded-full mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
                    Let's Start a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Conversation.</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Have a project in mind or just want to say hi? We'd love to hear from you. 
                    Fill out the form below or reach out directly.
                </p>
            </motion.div>
        </div>
      </div>

      {/* === MAIN CONTENT SECTION === */}
      <div className="container mx-auto px-6 pb-24 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Contact Info */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2 space-y-8"
            >
                {/* Contact Cards */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                        Contact Details
                    </h3>
                    
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                                <a href="mailto:info@redcupseries.co.zw" className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors">
                                    info@redcupseries.co.zw
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                                <a href="tel:+263771234567" className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                    +263 77 123 4567
                                </a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Visit Us</p>
                                <p className="text-lg font-medium text-gray-900 leading-snug">
                                    Harare, Zimbabwe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Hours (Optional) */}
                <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 text-gray-300">
                            <Clock size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest">Business Hours</span>
                        </div>
                        <p className="text-2xl font-bold mb-1">Mon - Fri: 8am - 5pm</p>
                        <p className="text-gray-400">Sat - Sun: Closed</p>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT COLUMN: Contact Form */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-3"
            >
                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-blue-500"></div>
                    
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                        <p className="text-gray-500">We usually respond within 24 hours.</p>
                    </div>

                    {/* Integrating your existing ContactForm component */}
                    <ContactForm />
                </div>
            </motion.div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactUs;