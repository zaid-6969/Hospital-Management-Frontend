import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Wrench, CalendarCheck,
  Settings, ChevronLeft, ChevronRight, Shield,
  Sun, Moon, X
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../redux/Slices/themeSlice";

const mainNav = [
  { label: "Dashboard",     icon: LayoutDashboard, path: "/admin/admin" },
  { label: "Doctors",       icon: Users,           path: "/admin/doctors" },
  { label: "Medical Tools", icon: Wrench,          path: "/admin/tools" },
];
const systemNav = [
  { label: "Appointments", icon: CalendarCheck, path: "/admin/appointments" },
  { label: "Settings",     icon: Settings,      path: "/admin/settings" },
];

const Sidebar = ({ onClose }) => {
  // On desktop: can be collapsed to icon-only
  // On mobile: always full width when open (controlled by parent drawer)
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile]   = useState(window.innerWidth < 1024);

  const dispatch  = useDispatch();
  const mode      = useSelector((s) => s.theme.mode);
  const location  = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false); // never collapsed in drawer mode
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile drawer on nav
  const handleNavClick = () => {
    if (isMobile && onClose) onClose();
  };

  const isCollapsed = !isMobile && collapsed;

  const navLinkStyle = (isActive) => isActive
    ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 14px rgba(106,90,205,.30)", color: "white" }
    : {};

  const navLinkClass = (isActive) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive ? "text-white" : "hover:bg-[rgba(106,90,205,0.08)]"
    }`;

  return (
    <aside
      className={`${isCollapsed ? "w-[68px]" : "w-[230px]"} h-full flex flex-col transition-all duration-300 shrink-0 relative`}
      style={{ background: "var(--card)", borderRight: "1px solid var(--border)", minHeight: "100vh" }}
    >
      {/* Purple top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6,transparent)" }} />

      {/* ── LOGO ROW ── */}
      <div className="flex items-center justify-between px-4 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}>

        {/* Logo — always shown on mobile, toggled on desktop */}
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 12px rgba(106,90,205,.35)" }}>
              <Shield size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight" style={{ color: "var(--text)" }}>MedAdmin</p>
              <p className="text-[10px] font-medium" style={{ color: "var(--text)", opacity: .4 }}>Healthcare Portal</p>
            </div>
          </div>
        )}

        {/* Mobile: X close button / Desktop: collapse chevron */}
        {isMobile ? (
          <button onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg transition"
            style={{ background: "rgba(106,90,205,.12)", color: "#6a5acd" }}>
            <X size={15} />
          </button>
        ) : (
          <button onClick={() => setCollapsed(!collapsed)}
            className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg transition shrink-0"
            style={{ background: "rgba(106,90,205,.12)", color: "#6a5acd" }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[10px] font-bold uppercase tracking-widest px-3 mb-2"
            style={{ color: "var(--text)", opacity: .3 }}>Main Menu</p>
        )}

        {mainNav.map(({ label, icon: Icon, path }) => (
          <NavLink key={label} to={path} onClick={handleNavClick}
            title={isCollapsed ? label : ""}
            className={({ isActive }) => navLinkClass(isActive)}
            style={({ isActive }) => ({ ...navLinkStyle(isActive), color: isActive ? "white" : "var(--text)", opacity: isActive ? 1 : .6 })}
          >
            <Icon size={16} className="shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {!isCollapsed
          ? <p className="text-[10px] font-bold uppercase tracking-widest px-3 mt-5 mb-2"
              style={{ color: "var(--text)", opacity: .3 }}>System</p>
          : <div className="my-3" style={{ borderTop: "1px solid var(--border)" }} />
        }

        {systemNav.map(({ label, icon: Icon, path }) => (
          <NavLink key={label} to={path} onClick={handleNavClick}
            title={isCollapsed ? label : ""}
            className={({ isActive }) => navLinkClass(isActive)}
            style={({ isActive }) => ({ ...navLinkStyle(isActive), color: isActive ? "white" : "var(--text)", opacity: isActive ? 1 : .55 })}
          >
            <Icon size={16} className="shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── BOTTOM ── */}
      <div className="px-2 py-3 space-y-1" style={{ borderTop: "1px solid var(--border)" }}>
        {/* Theme toggle */}
        <button onClick={() => dispatch(toggleTheme())}
          title={isCollapsed ? "Toggle theme" : ""}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition hover:bg-[rgba(106,90,205,0.08)]"
          style={{ color: "var(--text)", opacity: .6 }}>
          {mode === "dark"
            ? <Sun size={16} className="shrink-0 text-amber-400" />
            : <Moon size={16} className="shrink-0" style={{ color: "#6a5acd" }} />}
          {!isCollapsed && <span>{mode === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* Profile chip */}
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(106,90,205,.08)", border: "1px solid rgba(106,90,205,.15)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>Admin User</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text)", opacity: .4 }}>admin@medlab.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
              AD
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;