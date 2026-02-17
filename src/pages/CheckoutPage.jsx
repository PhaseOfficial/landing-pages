import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { supabase } from '../lib/supabaseClient';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CreditCard, Loader2, ShoppingCart as ShoppingCartIcon } from 'lucide-react'; // Added ShoppingCartIcon

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart, setCartItemsFromInvoice } = useShoppingCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [existingInvoiceId, setExistingInvoiceId] = useState(null); // State to store invoice ID if retrying

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // User not logged in, redirect to login page
        localStorage.setItem('redirectTo', '/checkout'); // Store current path to redirect back after login
        navigate('/auth'); 
      } else {
        setUser(session.user);
        setCustomerPhoneNumber(session.user.phone || '');
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setCustomerPhoneNumber(session.user.phone || '');
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.search]); // Add location.search to dependencies

  // Effect to load invoice details if invoiceId is present in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('invoiceId');

    const loadInvoiceForRetry = async () => {
      if (id && user && !existingInvoiceId) { // Only fetch if id, user, and no existing invoice
        setLoading(true);
        try {
          const { data: invoice, error: fetchError } = await supabase
            .from('invoices')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id) // Ensure only current user's invoice can be retried
            .single();

          if (fetchError) throw fetchError;

          if (invoice && invoice.invoice_products) {
            setExistingInvoiceId(invoice.id);
            setCartItemsFromInvoice(invoice.invoice_products);
            // Optionally set amount and description from invoice if needed
          } else {
            setError('Invoice not found or no products to retry.');
            navigate('/purchase-history'); // Redirect if invoice not found
          }
        } catch (err) {
          console.error('Error loading invoice for retry:', err.message);
          setError('Failed to load invoice for retry.');
          navigate('/purchase-history'); // Redirect on error
        } finally {
          setLoading(false);
        }
      } else if (!id && cartItems.length === 0) {
        // If no invoiceId and cart is empty, redirect to store or history
        // This handles cases where user navigates directly to /checkout with empty cart
        // and no retry intention.
        navigate('/store');
      }
    };

    if (user) { // Only run if user is authenticated
      loadInvoiceForRetry();
    }
  }, [user, location.search, navigate, setCartItemsFromInvoice, cartItems.length]); // Dependencies

  if (loading) {
    return (
      <div className="min-h-screen font-sans flex flex-col items-center justify-center">
        <Loader2 size={48} className="animate-spin text-red-600" />
        <p className="mt-4 text-lg text-gray-700">Loading checkout...</p>
      </div>
    );
  }

  if (!user) {
    // Should be redirected by useEffect, but as a fallback
    return (
      <div className="min-h-screen font-sans flex flex-col items-center justify-center">
        <p className="text-xl text-gray-700">Redirecting to login...</p>
      </div>
    );
  }

  // Adjust this block: only redirect if cart is empty AND no invoiceId for retry
  if (cartItems.length === 0 && !existingInvoiceId) {
    return (
      <div className="min-h-screen mt-16 font-sans flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 max-w-md w-full">
            <ShoppingCartIcon size={60} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Please add items to your cart before checking out.</p>
            <Link to="/store" className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Go to Store
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true); // Indicate loading for payment processing
    setError(''); // Clear any previous errors

    if (!customerPhoneNumber) {
      setError('Please enter your phone number.');
      setLoading(false);
      return;
    }

    // Determine clientReference: use existingInvoiceId if present, otherwise generate new
    const currentClientReference = existingInvoiceId || uuidv4();

    const productsList = cartItems.map((item, index) => ({
      description: item.title,
      id: index,
      price: parseFloat(item.price),
      productName: item.title,
      quantity: item.quantity
    }));

    try {
      if (existingInvoiceId) {
        // Update existing invoice
        const { error: updateError } = await supabase
          .from('invoices')
          .update({
            status: 'Pending',
            updated_at: new Date().toISOString(),
            // Optionally update item_name, item_description, invoice_products
            // if cart contents could have changed on retry
            item_name: cartItems[0]?.title || 'Order from Store',
            item_description: cartItems[0]?.description || 'Multiple items purchased from the store.',
            invoice_products: productsList,
            amount: cartTotal, // Update amount if cartTotal changed
          })
          .eq('id', existingInvoiceId);

        if (updateError) {
          throw new Error(`Failed to update invoice: ${updateError.message}`);
        }
      } else {
        // Insert new invoice
        const { error: invoiceError } = await supabase
          .from('invoices')
          .insert({
            id: currentClientReference,
            user_id: user.id,
            amount: cartTotal,
            status: 'Pending',
            due_date: new Date().toISOString(),
            item_name: cartItems[0]?.title || 'Order from Store',
            item_description: cartItems[0]?.description || 'Multiple items purchased from the store.',
            invoice_products: productsList, // Save full product list
          });

        if (invoiceError) {
          throw new Error(`Failed to create invoice: ${invoiceError.message}`);
        }
      }
      
      const clicknPayId = import.meta.env.VITE_CLICKNPAY_ID; // Get from .env
      if (!clicknPayId) {
        throw new Error('Clicknpay ID is not configured. Please set VITE_CLICKNPAY_ID in your .env file.');
      }

      const orderPayload = {
        channel: "AUTOMATED",
        clientReference: currentClientReference, // Use currentClientReference here
        currency: cartItems[0].currency || 'USD',
        customerCharged: true,
        customerPhoneNumber: customerPhoneNumber,
        description: `Purchase from store - User: ${user.email}`,
        multiplePayments: true,
        orderYpe: "DYNAMIC",
        productsList: productsList,
        publicUniqueId: clicknPayId,
        returnUrl: `${window.location.origin}/payment-response?clientReference=${currentClientReference}`,
      };

      const response = await axios.post(
        'https://backendservices.clicknpay.africa:2081/payme/orders',
        orderPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.paymeURL) {
        clearCart(); // Clear cart after initiating payment
        window.location.href = response.data.paymeURL; // Redirect to Clicknpay
      } else {
        throw new Error('Failed to get payment URL from Clicknpay. Invalid response from gateway.');
      }
    } catch (error) {
      console.error("Clicknpay payment error:", error);
      setError(error.message || "Payment initiation failed. Please try again."); // Set error state
      setLoading(false); // Stop loading
      // Optionally display error message to user
    }
  };

  return (
    <div className="min-h-screen mt-16 font-sans flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Checkout</h1>

        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
          <h2 className="2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-4">
                  <img src={item.image_url || "https://via.placeholder.com/60x60?text=No+Image"} alt={item.title} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
             <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold text-gray-900">Total:</p>
              <p className="text-xl font-bold text-red-600">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
