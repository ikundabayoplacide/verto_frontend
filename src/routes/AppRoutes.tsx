import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
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

      {/* ── Dashboard routes (protected, shared layout) ── */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
