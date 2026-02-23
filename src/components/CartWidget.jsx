import React from 'react';
import { ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

const CartWidget = () => {
    const { cartQuantity } = useShoppingCart();

    return (
        <Link 
            to="/cart" 
            className="md:hidden fixed bottom-28 right-6 z-50 bg-white/90 backdrop-blur-xl border border-white/20 p-4 rounded-full shadow-2xl flex items-center justify-center text-gray-800 transition-all active:scale-95 border-b-2 border-r-2 border-gray-200"
        >
            <ShoppingCart size={24} />
            {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                    {cartQuantity}
                </span>
            )}
        </Link>
    );
};

export default CartWidget;
