import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Import the main App component
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext"; // Import ShoppingCartProvider
import "./index.css"; // Import your global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="/">
      <ShoppingCartProvider>
        <App /> {/* Render App as the main component */}
      </ShoppingCartProvider>
    </Router>
  </React.StrictMode>
);
