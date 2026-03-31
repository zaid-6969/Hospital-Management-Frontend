import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  CalendarCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/admin" },
  { label: "Doctors", icon: Users, path: "/admin/doctors" },
  { label: "Medical Tools", icon: Wrench, path: "/admin/tools" },
  { label: "Appointments", icon: CalendarCheck, path: "/admin/appointments" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-56"
      } bg-card border-r border-border flex flex-col transition-all duration-300 min-h-screen shrink-0`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-border">
        {!collapsed && (
          <div>
            <span className="text-sm font-extrabold text-primary tracking-wide">
              MedAdmin
            </span>
            <p className="text-[10px] text-text/50 font-medium">
              Admin Panel
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-text/60 hover:bg-primary/10 hover:text-text"
              }`
            }
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-border">
          <div className="bg-primary/10 rounded-xl px-3 py-2.5">
            <p className="text-xs font-bold text-primary">
              Need help?
            </p>
            <p className="text-[10px] text-text/60 mt-0.5">
              Contact support team
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;