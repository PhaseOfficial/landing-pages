import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { CheckCircle2, XCircle, Loader2, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import vybrantLogo from '../assets/Vybrant brand logo.png';

// --- CONFIGURATION ---
const SUCCESS_TEMPLATE_ID = "payment-confirmation";
const FAILED_TEMPLATE_ID = "payment-failed-retry";
const ADMIN_EMAIL = 'admin@redcupseries.co.zw'; 

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const generateInvoicePdf = async (invoice, userDetails, type = 'Invoice') => {
  const invoiceHtmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: auto; background: white;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px;">
            <div>
                <h1 style="font-size: 2.5em; font-weight: 800; color: #1e293b; margin: 0;">${type.toUpperCase()}</h1>
                <p style="color: #64748b; margin-top: 5px;">Ref: #${invoice.id.substring(0, 8).toUpperCase()}</p>
            </div>
            <div style="text-align: right;">
                <img src="${vybrantLogo}" alt="Logo" style="height: 50px;"/>
                <p style="font-size: 0.8em; color: #94a3b8; margin-top: 10px;">Red Cup Series<br/>Harare, Zimbabwe</p>
            </div>
        </div>
        <div style="margin-bottom: 30px;">
            <h3 style="font-size: 0.8em; color: #94a3b8; text-transform: uppercase;">Billed To:</h3>
            <p style="font-weight: bold; margin: 5px 0;">${userDetails?.email}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                <th style="padding: 12px; text-align: left;">Description</th>
                <th style="padding: 12px; text-align: right;">Amount</th>
            </tr>
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f1f5f9;">${invoice.item_name || 'Service/Product'}</td>
                <td style="padding: 12px; text-align: right; font-weight: bold;">${formatCurrency(invoice.amount)}</td>
            </tr>
        </table>
        <div style="text-align: right; font-size: 1.2em; font-weight: 800; color: #1e293b;">
            Total: ${formatCurrency(invoice.amount)}
        </div>
    </div>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = invoiceHtmlContent;
  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    const base64PDF = pdf.output('datauristring').split(',')[1];
    document.body.removeChild(tempDiv);

    return {
      filename: `${type}_${invoice.id.substring(0, 8).toUpperCase()}.pdf`,
      content: base64PDF,
    };
  } catch (error) {
    document.body.removeChild(tempDiv);
    throw error;
  }
};

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your transaction...');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return navigate('/auth');
      setUser(session.user);
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get('clientReference');

    if (ref && user) {
      verifyPayment(ref, user);
    } else if (!ref && !user) {
      setPaymentStatus('failed');
      setMessage('No payment reference found.');
    }
  }, [location.search, user]);

  const sendEmailNotification = async (emailDetails) => {
    try {
      await supabase.functions.invoke('send_email', { body: emailDetails });
    } catch (err) {
      console.error('Email error:', err.message);
    }
  };

  const verifyPayment = async (ref, currentUser) => {
    try {
      const clicknPayUrl = `https://backendservices.clicknpay.africa:2081/payme/orders/top-paid/${encodeURIComponent(ref)}`;
      const gatewayResponse = await fetch(clicknPayUrl);
      const gatewayData = await gatewayResponse.json();

      const statusUpper = gatewayData.status?.toUpperCase();
      let displayStatus = 'Pending';
      if (statusUpper === 'SUCCESS' || statusUpper === 'PAID') displayStatus = 'Paid';
      else if (statusUpper === 'FAILED') displayStatus = 'Failed';

      // 1. Update Database
      const { data: invoice, error: dbError } = await supabase
        .from('invoices')
        .update({ status: displayStatus, updated_at: new Date() })
        .eq('id', ref)
        .select()
        .single();

      if (dbError) throw dbError;

      // 2. Set UI State
      setPaymentStatus(displayStatus === 'Paid' ? 'success' : 'failed');
      setMessage(`Payment ${displayStatus.toLowerCase()}!`);

      // 3. Trigger Professional Emails via Resend
      if (displayStatus === 'Paid') {
        const pdfData = await generateInvoicePdf(invoice, currentUser);

        await sendEmailNotification({
          recipient: currentUser.email,
          subject: `Payment Confirmed: #${ref.substring(0, 8).toUpperCase()}`,
          template_id: SUCCESS_TEMPLATE_ID,
          variables: {
            userName: currentUser.email.split('@')[0],
            reference: ref.substring(0, 8).toUpperCase(),
            amount: formatCurrency(invoice.amount),
            historyLink: `${window.location.origin}/purchase-history`
          },
          attachments: [{ filename: pdfData.filename, content: pdfData.content }]
        });

        // Admin Notification
        await sendEmailNotification({
          recipient: ADMIN_EMAIL,
          subject: `ADMIN ALERT: New Payment Received [${ref.substring(0, 8).toUpperCase()}]`,
          template_id: SUCCESS_TEMPLATE_ID, // You can use the same or a specific admin template
          variables: {
            userName: "Admin",
            reference: ref,
            amount: formatCurrency(invoice.amount),
            historyLink: `${window.location.origin}/admin/invoices`
          }
        });

      } else if (displayStatus === 'Failed') {
        await sendEmailNotification({
          recipient: currentUser.email,
          subject: `Payment Failed: #${ref.substring(0, 8).toUpperCase()}`,
          template_id: FAILED_TEMPLATE_ID,
          variables: {
            userName: currentUser.email.split('@')[0],
            reference: ref.substring(0, 8).toUpperCase(),
            amount: formatCurrency(invoice.amount),
            retryLink: `${window.location.origin}/purchase-history`,
            errorMessage: "Transaction was declined by the gateway."
          }
        });
      }

    } catch (error) {
      console.error("Verification Error:", error);
      setPaymentStatus('failed');
      setMessage("Critical error during verification. Our team has been notified.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="text-center bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 max-w-md w-full">
          {paymentStatus === 'pending' && (
            <>
              <Loader2 size={64} className="mx-auto text-slate-900 animate-spin mb-6" />
              <h2 className="text-3xl font-black text-slate-900 mb-3 italic">Verifying...</h2>
              <p className="text-slate-500 font-medium">{message}</p>
            </>
          )}

          {paymentStatus === 'success' && (
            <>
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">SUCCESS!</h2>
              <p className="text-slate-500 mb-10 font-medium">Your invoice has been paid. Check your email for the receipt.</p>
              <Link to="/purchase-history" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-lg">
                View My Purchases
              </Link>
            </>
          )}

          {paymentStatus === 'failed' && (
            <>
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle size={40} className="text-red-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">FAILED</h2>
              <p className="text-slate-500 mb-8 font-medium">{message}</p>
              <div className="flex flex-col gap-3">
                <Link to="/store" className="bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-all">
                  Try Again
                </Link>
                <Link to="/purchase-history" className="text-slate-400 font-bold text-sm hover:text-slate-600">
                  Return to Dashboard
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResponse;