export const getVisitorId = () => {
  try {
    let id = localStorage.getItem("visitor_id");
    
    // Check if id is missing, or is the string "null"/"undefined"
    if (!id || id === "null" || id === "undefined") {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("visitor_id", id);
    }
    return id;
  } catch (err) {
    // Fallback if localStorage is blocked
    console.warn("localStorage is blocked or unavailable:", err);
    return crypto.randomUUID ? crypto.randomUUID() : "v-" + Math.random().toString(36).substring(2);
  }
};