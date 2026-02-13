import { useState } from 'react';
import mysite from '../assets/weblogo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { X } from "lucide-react"; // I added X for a close icon, or you can use GiHamburgerMenu again
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Shared Link Styles for Desktop
    const navLinkClass = "px-4 py-2 rounded-full text-sm font-medium text-gray-800 transition-all duration-300 hover:bg-white/40 hover:text-black hover:shadow-sm hover:backdrop-blur-lg";

    return (
        // Wrapper to center and float the navbar
        <div className="fixed top-0 w-full z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
            
            {/* The Glass Bar (Pointer events auto enables clicking inside) */}
            <nav className="pointer-events-auto w-full max-w-5xl bg-white/30 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-2xl rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300">
                
                {/* Logo Section */}
                <Link to="/" className="flex-shrink-0">
                    <img src={mysite} alt='logo' className="h-10 w-auto object-contain drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    <Link to="/" className={navLinkClass}>Home</Link>
                    <Link to="/Store" className={navLinkClass}>Shop</Link>
                    <Link to="/Services" className={navLinkClass}>Services</Link>
                    <Link to="/About" className={navLinkClass}>About</Link>
                    <Link to="/Contact" className={navLinkClass}>Contact</Link>
                    <Link to="/Games" className={navLinkClass}>Games</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/20 hover:bg-white/40 border border-white/10 transition-all text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <span className="font-bold text-xl">✕</span> : <GiHamburgerMenu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown (Floating Glass Card) */}
            {isOpen && (
                <div className="pointer-events-auto md:hidden mt-2 w-full max-w-5xl bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col p-4 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">Home</Link>
                        <Link to="/store" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">Shop</Link>
                        <Link to="/services" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">Services</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">About</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">Contact</Link>
                        <Link to="/games" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">Games</Link>
                    </div>
                </div>
            )}
        </div>
    );
}