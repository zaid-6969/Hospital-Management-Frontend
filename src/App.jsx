import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import DoctorPage from "./pages/DoctorPage/DoctorPage";
import ReceptionPage from "./pages/ReceptionPage/ReceptionDashboard"

import ProtectedRoute from "./routes/ProtectedRoute";

// USER PAGES
import MainLayout from "./pages/UserPage/layout/MainLayout";
import UserPage from "./pages/UserPage/pages/UserPage";
import ServicePage from "./pages/UserPage/pages/ServicePage";
import AboutPage from "./pages/UserPage/pages/AboutPage";
import ContactPage from "./pages/UserPage/pages/ContactPage";
import AppointmentPage from "./pages/UserPage/pages/AppointmentPage";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<AuthPage />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* DOCTOR */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="DOCTOR">
            <DoctorPage />
          </ProtectedRoute>
        }
      />

      {/* RECEPTION */}
      <Route
        path="/reception"
        element={
          <ProtectedRoute role="RECEPTIONIST">
            <ReceptionPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ USER ROUTES WITH LAYOUT */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="PATIENT">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserPage />} />
        <Route path="services" element={<ServicePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="appointment" element={<AppointmentPage />} />
      </Route>
    </Routes>
  );
}

export default App;