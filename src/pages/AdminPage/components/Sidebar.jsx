import { NavLink } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard",  path: "/admin/admin" },
  { id: "doctors", label: "Doctors",  path: "/admin/doctors" },
  { id: "tools", label: "Medical Tools",  path: "/admin/tools" },
  { id: "appointments", label: "Appointments",  path: "/admin/appointments" },
  { id: "settings", label: "Settings",  path: "/admin/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-[240px] min-h-screen flex-shrink-0 flex flex-col bg-[#1a1630]">

      {/* LOGO (same UI) */}
      <div className="px-6 py-7 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#6a5acd] flex items-center justify-center text-white">
            M
          </div>
          <div>
            <div className="text-white font-bold">MedAdmin</div>
            <div className="text-xs text-white/40">Healthcare Portal</div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">

        {/* MAIN MENU */}
        <div className="px-3 text-xs text-white/30 mb-2">
          MAIN MENU
        </div>

        {navItems.slice(0, 3).map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-[#6a5acd] text-white shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`
            }
          >
            
            {item.label}
          </NavLink>
        ))}

        {/* SYSTEM */}
        <div className="px-3 text-xs text-white/30 mt-4 mb-2">
          SYSTEM
        </div>

        {navItems.slice(3).map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-[#6a5acd] text-white shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

      </nav>

      {/* PROFILE (same UI) */}
      <div className="mx-3 mb-4 p-3 rounded-xl bg-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#6a5acd] flex items-center justify-center text-white text-sm">
          AD
        </div>
        <div>
          <div className="text-white text-sm">Admin</div>
          <div className="text-xs text-white/40">admin@mail.com</div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;