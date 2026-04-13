import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import AuthPage from "./pages/AuthPage/AuthPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// USER PAGES
import UserMainLayout from "./pages/UserPage/layout/UserMainLayout";
import UserPage from "./pages/UserPage/pages/UserPage";
import ServicePage from "./pages/UserPage/pages/ServicePage";
import AboutPage from "./pages/UserPage/pages/AboutPage";
import ContactPage from "./pages/UserPage/pages/ContactPage";
import AppointmentPage from "./pages/UserPage/pages/AppointmentPage";
import DoctorDetails from "./pages/UserPage/components/DoctorDetails";
import PatientDetailsPage from "./pages/UserPage/pages/PatientDetailsPage";
import BookingSuccessPage from "./pages/UserPage/pages/BookingSuccessPage";

// ADMIN PAGE
import AdminMainLayout from "./pages/AdminPage/Layout/AdminMainLayout";
import Dashboard from "./pages/AdminPage/page/Dashboard";
import Doctors from "./pages/AdminPage/page/Doctors";
import AdminDoctorDetails from "./pages/AdminPage/page/AdminDoctorDetails";

// RECEPTION PAGE
import ReceptionPage from "./pages/ReceptionPage/pages/ReceptionDashboard";
import DoctorAvailability from "./pages/ReceptionPage/pages/ReceptionDashboard";

// DOCTOR PAGE
import DoctorSchedule from "./pages/DoctorPage/pages/DoctorSchedule";
import DoctorOverview from "./pages/DoctorPage/pages/DoctorOverview";
import DoctorMainLayout from "./pages/DoctorPage/Layout/DoctorMainLayout";
import DoctorCalendar from "./pages/DoctorPage/pages/DoctorCalendar";

import React from "react";

const App = () => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="bg-bg text-text min-h-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
          },
        }}
      />

      <Routes>
        {/* 🔓 AUTH (BLOCK AFTER LOGIN) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* 🔒 ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminMainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="list" element={<Doctors />} />
          <Route path="doctor-details" element={<AdminDoctorDetails />} />
        </Route>

        {/* 🔒 DOCTOR */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorMainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorSchedule />} />
          <Route path="overview" element={<DoctorOverview />} />
          <Route path="calendar" element={<DoctorCalendar />} />
        </Route>

        {/* 🔒 RECEPTION */}
        <Route
          path="/reception"
          element={
            <ProtectedRoute role="RECEPTIONIST">
              <ReceptionPage />
            </ProtectedRoute>
          }
        >
          <Route path="doctors" element={<DoctorAvailability />} />
        </Route>

        {/* 🔒 USER */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="PATIENT">
              <UserMainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
          <Route path="doctor/:id" element={<DoctorDetails />} />
          <Route path="patient-details" element={<PatientDetailsPage />} />
          <Route path="booking-success" element={<BookingSuccessPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;