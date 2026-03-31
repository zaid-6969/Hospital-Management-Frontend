import { NavLink } from "react-router-dom";
import { Icon, icons } from "./Icon";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", path: "/doctor" },
  { id: "doctors", label: "Doctors", icon: "doctors", path: "/doctor/overview" },
  { id: "tools", label: "Medical Tools", icon: "tools", path: "/admin/tools" },
  { id: "appointments", label: "Appointments", icon: "appointments", path: "/admin/appointments" },
  { id: "settings", label: "Settings", icon: "settings", path: "/admin/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-[240px] min-h-screen flex flex-col bg-card border-r bg-card border border-border border border-border dark:border-gray-700">

      {/* LOGO */}
      <div className="px-6 py-6 border-b bg-card border border-border border border-border dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center bg-card border-r border border-border border border-border font-bold">
            M
          </div>
          <div>
            <div className="text-text font-semibold">MedAdmin</div>
            <div className="text-xs text-text/50">Healthcare Portal</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">

        <div className="px-3 text-xs text-text/40 mb-2">MAIN MENU</div>

        {navItems.slice(0, 3).map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-primary bg-card border-r border border-border border border-border shadow-md"
                  : "text-text/60 hover:text-text hover:bg-primary/10"
              }`
            }
          >
            <Icon d={icons[item.icon]} size={17} />
            {item.label}
          </NavLink>
        ))}

        <div className="px-3 text-xs text-text/40 mt-4 mb-2">SYSTEM</div>

        {navItems.slice(3).map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-primary bg-card border-r border border-border border border-border shadow-md"
                  : "text-text/60 hover:text-text hover:bg-primary/10"
              }`
            }
          >
            <Icon d={icons[item.icon]} size={17} />
            {item.label}
          </NavLink>
        ))}

      </nav>

      {/* PROFILE */}
      <div className="mx-3 mb-4 p-3 rounded-xl bg-primary/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center bg-card border-r border border-border border border-border text-sm">
          AD
        </div>
        <div>
          <div className="text-text text-sm">Admin</div>
          <div className="text-xs text-text/50">admin@mail.com</div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;