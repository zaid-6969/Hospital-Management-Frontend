import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AppointmentTable from "../components/AppointmentTable";
import RightPanel from "../components/RightPanel";
import BookingModal from "../components/Bookingmodal";

const ReceptionDashboard = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-bg">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 lg:relative lg:z-auto
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onBookAppointment={() => setBookingOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
            <div className="xl:col-span-9">
              <AppointmentTable />
            </div>
            <div className="xl:col-span-3">
              <RightPanel />
            </div>
          </div>
        </main>
      </div>

      {bookingOpen && (
        <BookingModal
          onClose={() => setBookingOpen(false)}
          onSuccess={() => setBookingOpen(false)}
        />
      )}
    </div>
  );
};

export default ReceptionDashboard;