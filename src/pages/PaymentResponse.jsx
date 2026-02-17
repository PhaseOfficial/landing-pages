import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import axios from 'axios';

// Admin email for notifications (TODO: Replace with actual email, ideally from env)
const ADMIN_EMAIL = 'admin@example.com'; 

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'success', 'failed'
  const [message, setMessage] = useState('Processing your payment...');
  const [clientReference, setClientReference] = useState(null); 
  const [user, setUser] = useState(null); // Add user state

  // Effect for user authentication
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // User not logged in, redirect to login page
        navigate('/auth'); 
      } else {
        setUser(session.user);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    // ... existing logic ...
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get('clientReference'); 

    if (ref && user) { // Only verify payment if user is loaded
      setClientReference(ref);
      verifyPayment(ref, user); // Pass user to verifyPayment
    } else if (!user) {
        // If user is not logged in, wait for user effect to redirect
        // Or if ref is missing, set failed status
        if (!ref) {
            setPaymentStatus('failed');
            setMessage('Payment verification failed: No client reference found.');
        }
    }
  }, [location.search, user]); // Add user to dependencies

  const sendEmailNotification = async (emailDetails) => {
    try {
      const { data, error } = await supabase.functions.invoke('send_email', {
        body: emailDetails,
      });
      if (error) throw error;
      if (!data.success) throw new Error(data.message || 'Failed to send email.');
      console.log('Email sent successfully:', data.message);
    } catch (err) {
      console.error('Error sending email notification:', err.message);
      // Do not block the main payment flow if email sending fails
    }
  };

  const verifyPayment = async (ref, user) => { // Accept user as parameter
    try {
      // 1. Fetch status directly from ClicknPay
      const clicknPayUrl = `https://backendservices.clicknpay.africa:2081/payme/orders/top-paid/${encodeURIComponent(ref)}`;
      const gatewayResponse = await fetch(clicknPayUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!gatewayResponse.ok) {
        throw new Error(`ClicknPay API returned status ${gatewayResponse.status}`);
      }
      const gatewayData = await gatewayResponse.json();

      let displayStatus = 'Unknown';
      const statusUpper = gatewayData.status ? gatewayData.status.toUpperCase() : 'UNKNOWN';

      if (statusUpper === 'SUCCESS' || statusUpper === 'PAID') {
        displayStatus = 'Paid';
      } else if (statusUpper === 'FAILED') {
        displayStatus = 'Failed';
      } else if (statusUpper === 'PENDING') {
        displayStatus = 'Pending';
      }

      // 2. Display status on frontend
      setPaymentStatus(displayStatus === 'Paid' ? 'success' : 'failed');
      setMessage(`Payment ${displayStatus.toLowerCase()}!`);

      // 3. Directly update database from client-side
      const { data, error } = await supabase
        .from('invoices')
        .update({ 
          status: displayStatus, 
          updated_at: new Date() 
        })
        .eq('id', ref); // Use ref (clientReference) to identify the invoice

      if (error) {
        console.error("Error updating database from client:", error.message);
        setMessage(prev => prev + " (Database update failed)");
        setPaymentStatus('failed'); // Critical failure: set to failed
        // Send email on DB update failure (client side)
        await sendEmailNotification({ // Await to ensure emails are sent before finishing
          recipient: user?.email, // Assuming user is available from context
          subject: `Payment Failed & DB Update Failed - Reference: ${ref}`,
          body_html: `<p>Dear ${user?.email},</p><p>Your payment for reference ${ref} failed and we also encountered an issue updating your payment status in our records.</p><p>Please contact support for assistance.</p>`,
          body_text: `Dear ${user?.email},\nYour payment for reference ${ref} failed and we also encountered an issue updating your payment status in our records.\nPlease contact support for assistance.`,
          is_admin_notification: false,
        });
        await sendEmailNotification({ // Await to ensure emails are sent before finishing
          recipient: ADMIN_EMAIL,
          subject: `ADMIN ALERT: Payment Failed & DB Update Failed - Reference: ${ref}`,
          body_html: `<p>A client payment for reference ${ref} failed, and the database update also failed. Client email: ${user?.email}.</p>`,
          body_text: `ADMIN ALERT: A client payment for reference ${ref} failed, and the database update also failed. Client email: ${user?.email}.`,
          is_admin_notification: true,
          admin_email: ADMIN_EMAIL,
        });
      } else {
        // If DB update is successful, we can finalize the message if needed.
        // For example, if displayStatus was 'Pending' and DB update confirms it,
        // message remains 'Payment pending!'.

        // Send emails based on displayStatus
        if (displayStatus === 'Paid') {
          // Send success email to client
          await sendEmailNotification({ // Await to ensure emails are sent before finishing
            recipient: user?.email,
            subject: `Payment Successful - Reference: ${ref}`,
            body_html: `<p>Dear ${user?.email},</p><p>Your payment for reference ${ref} was successful! Thank you for your purchase.</p><p>You can view your purchase history <a href="${window.location.origin}/purchase-history">here</a>.</p>`,
            body_text: `Dear ${user?.email},\nYour payment for reference ${ref} was successful! Thank you for your purchase.\nYou can view your purchase history at ${window.location.origin}/purchase-history.`,
            is_admin_notification: false,
          });
          // Send success email to admin
          await sendEmailNotification({ // Await to ensure emails are sent before finishing
            recipient: ADMIN_EMAIL,
            subject: `ADMIN ALERT: Payment Successful - Reference: ${ref}`,
            body_html: `<p>A client payment for reference ${ref} was successful. Client email: ${user?.email}.</p>`,
            body_text: `ADMIN ALERT: A client payment for reference ${ref} was successful. Client email: ${user?.email}.`,
            is_admin_notification: true,
            admin_email: ADMIN_EMAIL,
          });
        } else if (displayStatus === 'Failed') {
          // Send failure email to client
          await sendEmailNotification({ // Await to ensure emails are sent before finishing
            recipient: user?.email,
            subject: `Payment Failed - Reference: ${ref}`,
            body_html: `<p>Dear ${user?.email},</p><p>Your payment for reference ${ref} failed. Please try again or contact support.</p><p>You can review your purchases <a href="${window.location.origin}/purchase-history">here</a>.</p>`,
            body_text: `Dear ${user?.email},\nYour payment for reference ${ref} failed. Please try again or contact support.\nYou can review your purchases at ${window.location.origin}/purchase-history.`,
            is_admin_notification: false,
          });
        }
        // No email for 'Pending' unless specifically requested
      }

    } catch (error) {
      console.error("Error during payment verification:", error);
      setPaymentStatus('failed');
      setMessage(`An error occurred during payment verification: ${error.message}. Please contact support.`);
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

            <Link to="/purchase-history" className="mt-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-y-1 transition-all duration-300">
              Review My Purchases
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResponse;
