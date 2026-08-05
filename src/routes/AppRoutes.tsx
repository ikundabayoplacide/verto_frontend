import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../components/common/ProtectedRoute.tsx";
import { DashboardLayout } from "../components/layout/DashboardLayout.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.tsx";
import LandingPage from "../pages/LandingPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import MediaPage from "../pages/MediaPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import OurTeamPage from "../pages/OurTeamPage.tsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.tsx";
import ServicesPage from "../pages/ServicesPage.tsx";
import SustainabilityPage from "../pages/SustainabilityPage.tsx";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage.tsx";
import ContactsPage from "../pages/dashboard/ContactsPage.tsx";
import DashboardHome from "../pages/dashboard/DashboardHome.tsx";
import DashboardMediaPage from "../pages/dashboard/MediaPage.tsx";
import DashboardServicesPage from "../pages/dashboard/ServicesPage.tsx";
import PartnersPage from "../pages/dashboard/PartnersPage.tsx";
import ProfilePage from "../pages/dashboard/ProfilePage.tsx";
import StatsPage from "../pages/dashboard/StatsPage.tsx";
import TeamPage from "../pages/dashboard/TeamPage.tsx";
import TestimonialsPage from "../pages/dashboard/TestimonialsPage.tsx";
import UsersPage from "../pages/dashboard/UsersPage.tsx";
import CoreValuesPage from "../pages/dashboard/CoreValuesPage";
import HeroSlidesPage from "../pages/dashboard/HeroSlidesPage";
import CertificatesPage from "../pages/dashboard/CertificatesPage";
import ImpactNumbersPage from "../pages/dashboard/ImpactNumbersPage";
import PillarsPage from "../pages/dashboard/PillarsPage";
import SustainabilityActionPage from "../pages/dashboard/SustainabilityActionPage";
import OurCommitmentsPage from "../pages/dashboard/OurCommitmentsPage";
import NewsHighlightsPage from "../pages/dashboard/NewsHighlightsPage";
import TimelinePage from "../pages/dashboard/TimelinePage";
import SettingsPage from "../pages/dashboard/SettingsPage.tsx";
import EmailSettingsPage from "../pages/dashboard/EmailSettingsPage.tsx";
import { NotificationsPage } from "../pages/dashboard/NotificationsPage.tsx";
import {
  ClientsPage,
} from "../pages/dashboard/PlaceholderPages.tsx";

export default function AppRoutes() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <Routes>
      {/* ── Public ── */}
      <Route path="/"               element={<LandingPage />} />
      <Route path="/about"          element={<AboutPage />} />
      <Route path="/our-team"       element={<OurTeamPage />} />
      <Route path="/services"       element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServicesPage />} />
      <Route path="/sustainability"  element={<SustainabilityPage />} />
      <Route path="/contact"        element={<ContactPage />} />
      <Route path="/media"          element={<MediaPage />} />
      <Route path="/login"          element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* ── Dashboard — single layout, role guard per route ── */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "editor"]} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* admin + editor */}
          <Route index                 element={<DashboardHome />} />
          <Route path="profile"        element={<ProfilePage />} />
          <Route path="services"       element={<DashboardServicesPage />} />
          <Route path="team"           element={<TeamPage />} />
          <Route path="testimonials"   element={<TestimonialsPage />} />
          <Route path="media"          element={<DashboardMediaPage />} />
          <Route path="partners"       element={<PartnersPage />} />
          <Route path="notifications"  element={<NotificationsPage />} />
          <Route path="core-values"    element={<CoreValuesPage />} />
          <Route path="hero-slides"    element={<HeroSlidesPage />} />
          <Route path="timeline"       element={<TimelinePage />} />
          <Route path="certificates"        element={<CertificatesPage />} />
          <Route path="impact-numbers"      element={<ImpactNumbersPage />} />
          <Route path="pillars"             element={<PillarsPage />} />
          <Route path="sustainability-action" element={<SustainabilityActionPage />} />
          <Route path="commitments"         element={<OurCommitmentsPage />} />
          <Route path="news-highlights"     element={<NewsHighlightsPage />} />

          {/* admin only — nested ProtectedRoute redirects editors to /dashboard */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="analytics"    element={<AnalyticsPage />} />
            <Route path="contacts"     element={<ContactsPage />} />
              <Route path="clients"      element={<ClientsPage />} />
            <Route path="stats"        element={<StatsPage />} />
            <Route path="users"        element={<UsersPage />} />
            <Route path="settings"         element={<SettingsPage />} />
            <Route path="settings/email"  element={<EmailSettingsPage />} />
          </Route>

        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
