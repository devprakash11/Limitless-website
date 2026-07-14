import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicePage from "./pages/ServicePage";

import LogoDesign from "./pages/LogoDesign";
import SocialMediaBanner from "./pages/SocialMediaBanner";
import PhotoFrame from "./pages/PhotoFrame";
import PosterDesign from "./pages/PosterDesign";
import BusinessCardDesign from "./pages/BusinessCardDesign";
import BrandingMaterials from "./pages/BrandingMaterials";
import BrandingMaterialView from "./pages/BrandingMaterialView";


import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      {/* Globally scrolls every new page to the top */}
      <ScrollToTop />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/services/logo-design"
            element={<LogoDesign />}
          />

          <Route
            path="/services/social-media-banner"
            element={<SocialMediaBanner />}
          />

          <Route
            path="/services/photo-frame"
            element={<PhotoFrame />}
          />

          <Route
            path="/services/poster-design"
            element={<PosterDesign />}
          />

          <Route
            path="/services/business-card-design"
            element={<BusinessCardDesign />}
          />

          <Route
            path="/services/branding-materials"
            element={<BrandingMaterials />}
          />

          <Route
                path="/services/branding-materials/:brandSlug"
                element={<BrandingMaterialView />}
              />

          <Route
            path="/services/:slug"
            element={<ServicePage />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;