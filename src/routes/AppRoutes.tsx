import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import ServicesPage from "../pages/ServicesPage.tsx";
import SustainabilityPage from "../pages/SustainabilityPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";
import MediaPage from "../pages/MediaPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

export default function AppRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* ── Public routes ── */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServicesPage />} />
      <Route path="/sustainability" element={<SustainabilityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/media" element={<MediaPage />} />

      {/* ── Dashboard routes (protected, shared layout) ── */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
