import { CalendarPlus } from "lucide-react";

const Navbar = ({ onOpen, onBookAppointment }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-violet-100 bg-card sticky top-0 z-30">
      {/* Left — page title */}
      <div>
        <h1 className="text-sm font-bold text-text">Reception Dashboard</h1>
        <p className="text-xs text-violet-400">
          Manage appointments &amp; patients
        </p>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-3">
        {/* ✅ Book Appointment button */}
        <button
          onClick={onBookAppointment}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 bg-card border-r border border-border border border-border text-sm font-bold transition-colors shadow-md shadow-violet-200"
        >
          <CalendarPlus size={15} />+ New Patient
        </button>
      </div>
    </div>
  );
};

export default Navbar;
