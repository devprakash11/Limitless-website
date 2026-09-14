import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import ContentProtection from "./components/security/ContentProtection";
import "./styles/design-system.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ContentProtection />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
