// ─── Navbar.jsx ───
// Add the `onBookAppointment` prop and a "Book Appointment" button.
// Merge this into your existing Navbar — only the relevant addition is shown.
//
// Find wherever your Navbar renders its right-side actions and add:

import { CalendarPlus } from "lucide-react";

// Inside your Navbar component, add this prop:
// const Navbar = ({ onOpen, onBookAppointment }) => { ... }

// Then add this button in the right-side action area of your Navbar JSX:
//
// <button
//   onClick={onBookAppointment}
//   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-colors shadow-md shadow-violet-200"
// >
//   <CalendarPlus size={15} />
//   Book Appointment
// </button>
//
// ─────────────────────────────────────────────────────────────────────────────
// If you share your Navbar.jsx I can give you the fully merged file.
// For now, here is a standalone example Navbar with the button integrated:

const Navbar = ({ onOpen, onBookAppointment }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-violet-100 bg-card sticky top-0 z-30">
      {/* Left — page title */}
      <div>
        <h1 className="text-sm font-bold text-text">Reception Dashboard</h1>
        <p className="text-xs text-violet-400">Manage appointments &amp; patients</p>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-3">
        {/* Add Patient button (your existing one) */}
        <button
          onClick={onOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-200 bg-violet-50 text-violet-600 text-sm font-semibold hover:bg-violet-100 transition-colors"
        >
          + New Patient
        </button>

        {/* ✅ Book Appointment button */}
        <button
          onClick={onBookAppointment}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-colors shadow-md shadow-violet-200"
        >
          <CalendarPlus size={15} />
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Navbar;