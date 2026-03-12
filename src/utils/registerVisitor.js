import { supabase } from "../lib/supabaseClient";
import { getVisitorId } from "./visitor";

export const registerVisitor = async () => {
  const visitor_id = getVisitorId();

  try {
    // Try to upsert the visitor. If RLS is enabled and doesn't allow UPDATE, 
    // it might fail with 401 or 403.
    const { error } = await supabase
      .from("visitors")
      .upsert({ visitor_id }, { onConflict: "visitor_id" });

    if (error) {
      // If 401/403 or other auth issues, just log and try a simple insert
      if (error.code === "42501" || error.status === 401 || error.status === 403) {
        console.warn("registerVisitor: upsert unauthorized, trying insert fallback");
        const { error: insertError } = await supabase
          .from("visitors")
          .insert({ visitor_id });
        
        // If conflict (23505), it's already registered, so we're good
        if (insertError && insertError.code !== "23505") {
          console.error("registerVisitor: insert fallback failed:", insertError.message);
        }
      } else if (error.code !== "23505") {
        console.warn("registerVisitor: upsert error:", error.message);
      }
    }
  } catch (err) {
    console.error("registerVisitor: unexpected error:", err);
  }
};