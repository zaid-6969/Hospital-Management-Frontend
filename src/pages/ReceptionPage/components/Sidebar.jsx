import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BedDouble,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Queue", icon: CalendarCheck },
  { label: "Patients", icon: Users },
  { label: "Rooms", icon: BedDouble },
  { label: "Dashboard", icon: LayoutDashboard },
];

const Sidebar = () => {
  const [active, setActive] = useState("Queue");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-56"
      } bg-card border-r border-violet-100 flex flex-col transition-all duration-300 min-h-screen shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-violet-100">
        {!collapsed && (
          <div>
            <span className="text-sm font-extrabold text-violet-600 tracking-wide">
              MedLab
            </span>
            <p className="text-[10px] text-violet-300 font-medium">Reception Desk</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 text-violet-400 hover:bg-violet-100 hover:text-violet-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              active === label
                ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                : "text-violet-400 hover:bg-violet-50 hover:text-violet-600"
            }`}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-violet-100">
          <div className="bg-violet-50 rounded-xl px-3 py-2.5">
            <p className="text-xs font-bold text-violet-600">Need help?</p>
            <p className="text-[10px] text-violet-300 mt-0.5">Contact support team</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;