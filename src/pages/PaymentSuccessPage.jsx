import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 max-w-md w-full">
          <CheckCircle2 size={60} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been placed and will be processed shortly.</p>
          <Link to="/store" className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
