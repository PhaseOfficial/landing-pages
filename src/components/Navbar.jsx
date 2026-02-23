import { useState, useEffect } from 'react'; // Added useEffect
import mysite from '../assets/weblogo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { X, ShoppingCart } from "lucide-react"; 
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { supabase } from '../lib/supabaseClient'; // Added supabase

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartQuantity } = useShoppingCart();
    const [user, setUser] = useState(null); // Added user state
    const navigate = useNavigate(); // Added useNavigate

    // Effect to check user session on mount and listen for auth state changes
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []); // Empty dependency array means this runs once on mount

    // Shared Link Styles for Desktop
    const navLinkClass = "px-4 py-2 rounded-full text-sm font-medium text-gray-800 transition-all duration-300 hover:bg-white/40 hover:text-black hover:shadow-sm hover:backdrop-blur-lg";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/auth'); // Redirect to auth page after logout
        setIsOpen(false); // Close mobile menu if open
    };

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
                    {user && <Link to="/purchase-history" className={navLinkClass}>My Purchases</Link>}
                    {user ? (
                        <button onClick={handleLogout} className={navLinkClass + " text-red-600 hover:text-white hover:bg-red-600"}>Logout</button>
                    ) : (
                        <Link to="/auth" className={navLinkClass + " text-green-600 hover:text-black hover:bg-green-600"}>Login</Link>
                    )}
                    <Link to="/cart" className="relative px-4 py-2 rounded-full text-sm font-medium text-gray-800 transition-all duration-300 hover:bg-white/40 hover:text-black hover:shadow-sm hover:backdrop-blur-lg">
                        <ShoppingCart size={20} />
                        {cartQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartQuantity}
                            </span>
                        )}
                    </Link>
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
                        {user && <Link to="/purchase-history" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/50 text-gray-900 font-medium transition-colors">My Purchases</Link>}
                        {user ? (
                            <button onClick={handleLogout} className="block px-4 py-3 rounded-xl hover:bg-red-600 hover:text-white text-red-600 font-medium transition-colors">Logout</button>
                        ) : (
                            <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-green-600 hover:text-white text-green-600 font-medium transition-colors">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}