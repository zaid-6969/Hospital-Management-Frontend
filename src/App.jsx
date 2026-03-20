import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage"
import AdminPage from "./pages/AdminPage/AdminPage"
import DoctorPage from "./pages/DoctorPage/DoctorPage"
import UserPage from "./pages/UserPage/UserPage"
import ReceptionPage from "./pages/ReceptionPage/ReceptionPage"
import ProtectedRoute from "./routes/ProtectedRoute";
import ServicePage from "./pages/UserPage/ServicePage"

function App() {
  return (
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="PATIENT">
              <UserPage />
            </ProtectedRoute>
          }
        />

         <Route
          path="/service"
          element={
            <ProtectedRoute role="PATIENT">
              <ServicePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception"
          element={
            <ProtectedRoute role="RECEPTIONIST">
              <ReceptionPage />
            </ProtectedRoute>
          }
        />
      </Routes>

  );
}

export default App;