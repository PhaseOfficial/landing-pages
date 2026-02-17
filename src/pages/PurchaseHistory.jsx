import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { supabase } from '../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, Clock, RotateCcw, ReceiptText } from 'lucide-react';

const PurchaseHistory = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
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
        navigate('/auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('invoices')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPurchases(data || []);
      } catch (err) {
        console.error('Error fetching purchase history:', err.message);
        setError('Failed to load purchase history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
            <CheckCircle2 size={12} className="mr-1" /> Successful
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
            <XCircle size={12} className="mr-1" /> Failed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
            <Clock size={12} className="mr-1" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const handleTryAgain = (invoiceId) => {
    navigate(`/checkout?invoiceId=${invoiceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans flex flex-col items-center justify-center bg-gray-50">
        <Loader2 size={48} className="animate-spin text-red-600" />
        <p className="mt-4 text-lg font-medium text-gray-600">Retrieving your history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 font-sans flex flex-col">
      <Navbar />
      
      {/* Optimized Container Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Purchase History</h1>
            <p className="text-gray-500 mt-1">Manage and track your Red Cup Series orders.</p>
          </div>
          <Link to="/store" className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
            Continue Shopping →
          </Link>
        </div>

        {error ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center max-w-2xl mx-auto">
            <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Something went wrong</h2>
            <p className="text-gray-600 mt-2 mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all">
              Try Refreshing
            </button>
          </div>
        ) : purchases.length === 0 ? (
          <div className="text-center bg-white/80 backdrop-blur-md p-16 rounded-[2.5rem] shadow-xl border border-white max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ReceiptText size={40} className="text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No Orders Yet</h2>
            <p className="text-gray-500 mb-10 text-lg">Your purchases and service invoices will appear here once you place an order.</p>
            <Link to="/store" className="bg-red-600 text-white font-black py-4 px-10 rounded-2xl shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-xs">
              Explore the Store
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">ID</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-400 group-hover:text-gray-900">
                        #{purchase.id.substring(0, 8).toUpperCase()}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{purchase.item_name || 'Generic Purchase'}</div>
                        {purchase.item_description && (
                          <div className="text-xs text-gray-400 mt-0.5 max-w-xs truncate" title={purchase.item_description}>
                            {purchase.item_description}
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm font-black text-gray-900">
                          ${purchase.amount ? parseFloat(purchase.amount).toFixed(2) : '0.00'}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        {getStatusDisplay(purchase.status)}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                        {new Date(purchase.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        {(purchase.status === 'Failed' || purchase.status === 'Pending' || purchase.status === 'Unpaid') && (
                          <button
                            onClick={() => handleTryAgain(purchase.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ml-auto uppercase tracking-wider"
                          >
                            <RotateCcw size={12} /> Retry
                          </button>
                        )}
                        {purchase.status === 'Paid' && (
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseHistory;