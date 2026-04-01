import { NavLink } from "react-router-dom";
import { CalendarCheck, Stethoscope } from "lucide-react";

const BottomNav = () => {
  const linkClass = (isActive) =>
    `flex flex-col items-center gap-1 px-5 py-2 rounded-xl text-xs font-medium transition-all ${
      isActive ? "text-white" : "opacity-50"
    }`;
  const linkStyle = (isActive) => isActive
    ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }
    : {};

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-4 md:hidden z-50"
      style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}
    >
      <NavLink to="/doctor" end
        className={({ isActive }) => linkClass(isActive)}
        style={({ isActive }) => linkStyle(isActive)}
      >
        <CalendarCheck size={18} />
        <span>Schedule</span>
      </NavLink>

      <NavLink to="/doctor/overview"
        className={({ isActive }) => linkClass(isActive)}
        style={({ isActive }) => linkStyle(isActive)}
      >
        <Stethoscope size={18} />
        <span>Overview</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
