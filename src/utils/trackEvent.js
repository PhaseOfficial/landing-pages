import { supabase } from "../lib/supabaseClient";
import { getVisitorId } from "./visitor";

export const trackEvent = async (event_type, event_target) => {
  try {
    const visitor_id = getVisitorId();
    await supabase.from("website_events").insert({
      event_type,
      event_target,
      visitor_id
    });

    console.log(`✅ Event logged: ${event_type} - ${event_target}`);
  } catch (err) {
    console.error("❌ Event logging error:", err);
  }
};