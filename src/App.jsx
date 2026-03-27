import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import AuthPage from "./pages/AuthPage/AuthPage";
import ProtectedRoute from "./routes/ProtectedRoute";

// USER PAGES
import UserMainLayout from "./pages/UserPage/layout/UserMainLayout";
import UserPage from "./pages/UserPage/pages/UserPage";
import ServicePage from "./pages/UserPage/pages/ServicePage";
import AboutPage from "./pages/UserPage/pages/AboutPage";
import ContactPage from "./pages/UserPage/pages/ContactPage";
import AppointmentPage from "./pages/UserPage/pages/AppointmentPage";
import DoctorDetails from "./pages/UserPage/components/DoctorDetails";

// ADMIN PAGE
import AdminMainLayout from "./pages/AdminPage/Layout/AdminMainLayout";
import Dashboard from "./pages/AdminPage/page/Dashboard";
import Doctors from "./pages/AdminPage/page/Doctors";
import ToolsView from "./pages/AdminPage/page/Tools";

// RECEPTION PAGE
import ReceptionPage from "./pages/ReceptionPage/pages/ReceptionDashboard";

// DOCTOR PAGE
import DoctorSchedule from "./pages/DoctorPage/pages/DoctorSchedule";
import DoctorOverview from "./pages/DoctorPage/pages/DoctorOverview";
import DoctorMainLayout from "./pages/DoctorPage/Layout/DoctorMainLayout";

function App() {
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
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthPage />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminMainLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="admin" element={<Dashboard />} />
          <Route path="/admin/doctor/:id" element={<Doctors />} />
          <Route path="tools" element={<ToolsView />} />
        </Route>

        {/* DOCTOR */}
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
        </Route>

        <Route
          path="/doctor/overview"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorOverview />
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

        {/* USER ROUTES*/}
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
