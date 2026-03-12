import { supabase } from "../lib/supabaseClient";
import { getVisitorId } from "./visitor";
import { hashString } from "./hash";

export const trackVisit = async () => {
  try {
    const visitor_id = getVisitorId();
    if (!visitor_id || visitor_id === "null") {
      console.warn("trackVisit: skipping logging due to invalid visitor_id:", visitor_id);
      return;
    }

    // Get IP
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const { ip } = await ipResponse.json();

    const ip_hash = await hashString(ip);

    // Country lookup (GDPR safe – country only)
    const country = await fetch(`https://ipapi.co/${ip}/country_name/`)
      .then(res => res.text())
      .catch(() => "Unknown");

    // Save to Supabase
    const { error } = await supabase.from("website_visits").insert({
      ip_hash,
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      country,
      visitor_id
    });

    if (error) {
       // Ignore duplicate key conflicts on non-primary keys (409)
       if (error.code === "23505" || error.status === 409) {
          console.warn("trackVisit: visit already logged or conflict occurred (409)");
       } else {
          console.error("trackVisit: insert error:", error.message);
       }
    } else {
       console.log("✅ GDPR visit logged with country:", country);
    }

  } catch (err) {
    console.error("❌ Visit logging error:", err);
  }
};