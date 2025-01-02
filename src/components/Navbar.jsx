import { useState } from 'react';
import mysite from '../assets/weblogo.png';
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 w-full bg-navigation bg-opacity-40 text-primary py-4 px-6 backdrop-blur-md z-10">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold"><img src={mysite} alt='logo' className="w-32 "/></h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-white">Home</a>
                    <a href="#Shop" className="hover:text-white">Shop</a>
                    <a href="/Services" className="hover:text-white">Services</a>
                    <a href="/About" className="hover:text-white">About</a>
                    <a href="#contact" className="hover:text-white">Contact</a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center px-3 py-2 border rounded text-black border-red hover:text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* Icon for mobile menu (hamburger) */}
                    <GiHamburgerMenu />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-navigation bg-opacity-60 text-primary mt-2 py-4 rounded-lg shadow-lg">
                    <a href="/" className="block px-4 py-2 hover:bg-white/70">Home</a>
                    <a href="#home" className="block px-4 py-2 hover:bg-white/70">Shop</a>
                    <a href="#services" className="block px-4 py-2 hover:bg-white/70">Services</a>
                    <a href="/About" className="block px-4 py-2 hover:bg-white/70">About</a>
                    <a href="#contact" className="block px-4 py-2 hover:bg-white/70">Contact</a>
                </div>
            )}
        </nav>
    );
}
