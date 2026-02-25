import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import InstallBanner from "./pwa/InstallBanner";

// Landing & Auth
import LandingPage from "./pages/landing/LandingPage";
import DriverApplyPage from "./pages/landing/DriverApplyPage";
import LoginPage from "./pages/auth/LoginPage";

// Admin layout & pages
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DriversPage from "./pages/drivers/DriversPage";
import DriverDetailPage from "./pages/drivers/DriverDetailPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import VehicleDetailPage from "./pages/vehicles/VehicleDetailPage";
import PaymentsPage from "./pages/payments/PaymentsPage";
import MaintenancePage from "./pages/maintenance/MaintenancePage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SettingsPage from "./pages/settings/SettingsPage";

// Driver dashboard
import DriverDashboardPage from "./pages/driver/DriverDashboardPage";

function AppRoutes() {
  const { isAuthenticated, userRole } = useApp();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<DriverApplyPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={userRole === "driver" ? "/driver" : "/dashboard"}
              replace
            />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Driver portal */}
      <Route
        path="/driver"
        element={
          isAuthenticated && userRole === "driver" ? (
            <DriverDashboardPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Admin routes */}
      <Route
        element={
          isAuthenticated && userRole === "admin" ? (
            <AppLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/drivers/:id" element={<DriverDetailPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <InstallBanner />
    </AppProvider>
  );
}
