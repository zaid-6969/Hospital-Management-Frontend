import { useLocation } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import SharedTopbar from "../../../components/shared/SharedTopbar";

const PAGE_TITLES = {
  "/reception":              { title: "Dashboard",          sub: "Manage appointments & patients" },
  "/reception/doctors":      { title: "Doctor Availability", sub: "Live availability for all doctors" },
  "/reception/appointments": { title: "Appointments",       sub: "View and manage all appointments" },
  "/reception/patients":     { title: "Patients",           sub: "Patient records & details" },
  "/reception/rooms":        { title: "Rooms",              sub: "Room availability & assignment" },
  "/reception/queue":        { title: "Queue",              sub: "Today's patient queue" },
};

const Navbar = ({ onMenuClick, onBookAppointment }) => {
  const { pathname } = useLocation();
  const info = PAGE_TITLES[pathname] || { title: "Reception", sub: "Reception Portal" };

  const extra = (
    <button
      onClick={onBookAppointment}
      className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white transition"
      style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 12px rgba(106,90,205,.30)" }}
    >
      <CalendarPlus size={14} />
      <span className="hidden md:inline">New Patient</span>
    </button>
  );

  return (
    <SharedTopbar
      onMenuClick={onMenuClick}
      title={info.title}
      sub={info.sub}
      extra={extra}
    />
  );
};

export default Navbar;