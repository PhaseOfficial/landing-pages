import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { Link } from 'react-router-dom';
import { XCircle, PlusCircle, MinusCircle, ShoppingCart as ShoppingCartIcon } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeItem, increaseQuantity, decreaseQuantity, cartTotal, clearCart } = useShoppingCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 max-w-md w-full">
            <ShoppingCartIcon size={60} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/store" className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Go to Store
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 font-sans flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                <img src={item.image_url || "https://via.placeholder.com/100x100?text=No+Image"} alt={item.title} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.type === 'service' ? 'Service' : 'Product'}</p>
                  <p className="text-red-600 font-bold mt-1">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQuantity(item.id)} className="text-gray-500 hover:text-red-600 transition-colors">
                    <MinusCircle size={24} />
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="text-gray-500 hover:text-green-600 transition-colors">
                    <PlusCircle size={24} />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 transition-colors ml-4">
                  <XCircle size={24} />
                </button>
              </div>
            ))}
            <button
                onClick={clearCart}
                className="mt-6 text-red-600 hover:text-red-800 font-semibold flex items-center gap-2 transition-colors"
            >
                <XCircle size={20} /> Clear Cart
            </button>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-700">Subtotal:</p>
              <p className="font-semibold text-lg text-gray-900">${cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
              <p className="text-xl font-bold text-gray-900">Total:</p>
              <p className="text-xl font-bold text-red-600">${cartTotal.toFixed(2)}</p>
            </div>
            <Link to="/checkout" className="mt-8 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              Proceed to Checkout
              <ShoppingCartIcon size={20} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
