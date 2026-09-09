import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import ContentProtection from "./components/security/ContentProtection";
import "./styles/global.css";
import "./styles/security/ContentProtection.css";
import "./styles/componets/seo/ServiceContentSection.css";
import "./styles/componets/DiscountPopup.css";
import "./styles/componets/Footer.css";
import "./styles/componets/Navbar.css";
import "./styles/pages/About.css";
import "./styles/pages/BrandingMaterials.css";
import "./styles/pages/BusinessCardDesign.css";
import "./styles/pages/Contact.css";
import "./styles/pages/DownloadPreview.css";
import "./styles/pages/Home.css";
import "./styles/pages/LiveProjects.css";
import "./styles/pages/LogoDesign.css";
import "./styles/pages/PhotoFrame.css";
import "./styles/pages/PosterDesign.css";
import "./styles/pages/Price.css";
import "./styles/pages/ServicePage.css";
import "./styles/pages/SocialMediaBanner.css";
import "./styles/pages/UIDesign.css";

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
