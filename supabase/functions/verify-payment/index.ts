// Follow this setup guide to integrate the Deno runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS Headers: Allow your frontend to call this function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS Preflight Request (Browser Options check)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Parse the Request Body - Expect clientReference and status from frontend
    const { clientReference, status } = await req.json()

    if (!clientReference || !status) {
      throw new Error('Missing clientReference or status in request body')
    }

    console.log(`Updating status for Client Ref: ${clientReference} with status: ${status}`)

    // 5. Use status from frontend to update database
    let dbStatus = 'Unpaid' // Default
    const statusUpper = status.toUpperCase()

    if (statusUpper === 'PAID') { // assuming frontend will pass 'Paid', 'Failed', 'Pending'
        dbStatus = 'Paid'
    } else if (statusUpper === 'FAILED') {
        dbStatus = 'Failed'
    } else if (statusUpper === 'PENDING') {
        dbStatus = 'Pending'
    } else {
        // Handle unexpected status from frontend, or default to original 'Unpaid'
        console.warn(`Received unexpected status from frontend: ${status}`)
        dbStatus = 'Unpaid' 
    }

    // 6. Update Supabase Database (Using Service Role Key)
    // This bypasses RLS policies, allowing the update even if the user is restricted
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: dbError } = await supabaseAdmin
      .from('invoices')
      .update({ 
        status: dbStatus, 
        updated_at: new Date() 
      })
      .eq('id', clientReference)

    if (dbError) {
        console.error("Database Update Error:", dbError)
        throw new Error('Failed to update invoice in database')
    }

    // 7. Return Success Response to Frontend
    return new Response(
      JSON.stringify({ 
        success: true, 
        status: dbStatus,
        message: `Invoice status updated to: ${dbStatus}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error("Edge Function Error:", error.message)
    return new Response(
      JSON.stringify({ 
          success: false, 
          message: error.message 
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
