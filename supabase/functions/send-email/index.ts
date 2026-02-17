// Follow this setup guide to integrate the Deno runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { recipient, subject, body_html, body_text, is_admin_notification, admin_email } = await req.json()

    if (!recipient || !subject || (!body_html && !body_text)) {
      throw new Error('Missing required email parameters: recipient, subject, body_html/body_text.')
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('Resend API Key not found in environment variables.')
    }

    const RESEND_SENDER_EMAIL = Deno.env.get('RESEND_SENDER_EMAIL') || 'onboarding@resend.dev'; // Default sender for Resend

    let toEmail = recipient;
    if (is_admin_notification && admin_email) {
      toEmail = admin_email; // Send to admin if it's an admin notification
    } else if (is_admin_notification && !admin_email) {
      console.warn("Admin email requested but admin_email parameter is missing.");
      throw new Error("Admin email is required for admin notifications.");
    }
    
    // Construct email payload for Resend API
    const resendPayload = {
      from: RESEND_SENDER_EMAIL,
      to: toEmail,
      subject: subject,
      html: body_html,
      text: body_text,
    };

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendPayload),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API Error:', errorData);
      throw new Error(`Failed to send email via Resend: ${JSON.stringify(errorData)}`);
    }

    const data = await resendResponse.json()

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully', data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error("send_email Edge Function Error:", error.message)
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
