import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import axios from 'axios';

const PaymentResponse = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'success', 'failed'
  const [message, setMessage] = useState('Processing your payment...');
  const [clientReference, setClientReference] = useState(null); // To store and potentially update order in DB

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get('clientReference'); // This is usually passed back by Clicknpay

    if (ref) {
      setClientReference(ref);
      verifyPayment(ref);
    } else {
      setPaymentStatus('failed');
      setMessage('Payment verification failed: No client reference found.');
    }
  }, [location.search]);

  const verifyPayment = async (ref) => {
    try {
      // In a real application, you would make a secure backend call to verify the payment
      // with Clicknpay using their API, passing the clientReference.
      // For this example, we'll simulate a verification.

      // Simulate API call to your backend or directly to Clicknpay (less secure client-side)
      // The WEBRCS example doesn't show explicit verification in PaymentResponse.jsx,
      // implying it might be handled server-side or on a subsequent user action.
      // For a robust solution, a server-side endpoint would be ideal to prevent tampering.

      // For demonstration, let's assume successful verification for now
      // In a real app:
      // const response = await axios.post('/api/verify-clicknpay', { clientReference: ref });
      // if (response.data.status === 'success') {
      //    setPaymentStatus('success');
      //    setMessage('Your payment was successful!');
      //    // Update order status in Supabase using clientReference
      // } else {
      //    setPaymentStatus('failed');
      //    setMessage(response.data.message || 'Payment verification failed.');
      // }

      // --- SIMULATION START ---
      setTimeout(async () => {
        // Simulate a database update for the order associated with clientReference
        // In a real app, you'd have an 'orders' table with clientReference
        // const { data, error } = await supabase
        //   .from('orders')
        //   .update({ status: 'completed', payment_ref: ref })
        //   .eq('client_reference_id', ref);

        // if (error) {
        //   console.error("Error updating order status:", error.message);
        //   setPaymentStatus('failed');
        //   setMessage('Payment successful, but order update failed. Please contact support.');
        // } else {
          setPaymentStatus('success');
          setMessage('Your payment was successful!');
        // }
      }, 2000); // Simulate 2-second verification delay
      // --- SIMULATION END ---

    } catch (error) {
      console.error("Error during payment verification:", error);
      setPaymentStatus('failed');
      setMessage('An error occurred during payment verification. Please contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        {paymentStatus === 'pending' && (
          <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 max-w-md w-full">
            <Loader2 size={60} className="mx-auto text-red-600 animate-spin mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Processing Payment</h2>
            <p className="text-gray-600 mb-8">{message}</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 max-w-md w-full">
            <CheckCircle2 size={60} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link to="/store" className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Continue Shopping
            </Link>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 max-w-md w-full">
            <XCircle size={60} className="mx-auto text-red-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Failed</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link to="/cart" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Review Cart
            </Link>
            <Link to="/checkout" className="mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-y-1 transition-all duration-300">
              Try Checkout Again
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResponse;
