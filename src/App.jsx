import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import DownloadPreview from "./pages/DownloadPreview";
import Price from "./pages/price";

import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  /*
    The universal download preview is a full-screen page.

    Hide the normal Navbar and Footer on:
    1. New universal routes
       /download/:category/:slug

    2. Old logo routes kept for backward compatibility
       /logo-download/:slug
  */
  const isDownloadPreviewPage =
    location.pathname.startsWith("/download/") ||
    location.pathname.startsWith("/logo-download/");

  const appRoutes = (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

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

      {/*
        Universal download-preview route used by every design
        category now and by all future categories.
      */}
      <Route
        path="/download/:category/:slug"
        element={<DownloadPreview />}
      />

      <Route
        path="/price"
        element={<Price />}
      />

      {/*
        Optional legacy route.

        Keep this temporarily so old bookmarks and old logo links
        still open the universal preview page.
      */}
      <Route
        path="/logo-download/:slug"
        element={
          <DownloadPreview fixedCategory="logo-design" />
        }
      />
      
      {/*
        Keep the generic service route after all specific service
        routes so specific pages are matched first.
      */}
      <Route
        path="/services/:slug"
        element={<ServicePage />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );

  return (
    <>
      <ScrollToTop />

      {!isDownloadPreviewPage && <Navbar />}

      {/*
        DownloadPreview already renders its own <main> element.
        Rendering routes directly here prevents nested <main> tags.
      */}
      {isDownloadPreviewPage ? (
        appRoutes
      ) : (
        <main>{appRoutes}</main>
      )}

      {!isDownloadPreviewPage && <Footer />}
    </>
  );
}

export default App;