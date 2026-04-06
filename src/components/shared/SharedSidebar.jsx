import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, Sun, Moon, X, LogOut,
  ChevronUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/Slices/themeSlice";
import { logoutUser } from "../../redux/Slices/authApiSlice";


const SharedSidebar = ({ logo, mainNav = [], systemNav = [], onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const user = useSelector((s) => s.auth.user);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  const handleNavClick = () => {
    if (isMobile && onClose) onClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isCollapsed = !isMobile && collapsed;

  const navLinkStyle = (isActive) =>
    isActive
      ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 14px rgba(106,90,205,.30)", color: "white" }
      : {};

  const navLinkClass = (isActive) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive ? "text-white" : "hover:bg-[rgba(106,90,205,0.08)]"
    }`;

  const LogoIcon = logo?.icon;

  // Build initials from user name
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  return (
    <aside
      className={`${isCollapsed ? "w-[68px]" : "w-[230px]"} h-full flex flex-col transition-all duration-300 shrink-0 relative`}
      style={{ background: "var(--card)", borderRight: "1px solid var(--border)", minHeight: "100vh" }}
    >
      {/* Purple top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6,transparent)" }} />

      {/* LOGO ROW */}
      <div className="flex items-center justify-between px-4 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 12px rgba(106,90,205,.35)" }}>
              {LogoIcon && <LogoIcon size={14} className="text-white" />}
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
                {logo?.label}
              </p>
              <p className="text-[10px] font-medium" style={{ color: "var(--text)", opacity: 0.4 }}>
                {logo?.sub}
              </p>
            </div>
          </div>
        )}

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

      {/* NAVIGATION */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[10px] font-bold uppercase tracking-widest px-3 mb-2"
            style={{ color: "var(--text)", opacity: 0.3 }}>Main Menu</p>
        )}

        {mainNav.map(({ label, icon: Icon, path, exact }) => (
          <NavLink key={label} to={path} end={exact} onClick={handleNavClick}
            title={isCollapsed ? label : ""}
            className={({ isActive }) => {
              const active = exact
                ? location.pathname === path
                : isActive;
              return navLinkClass(active);
            }}
            style={({ isActive }) => {
              const active = exact ? location.pathname === path : isActive;
              return { ...navLinkStyle(active), color: active ? "white" : "var(--text)", opacity: active ? 1 : 0.6 };
            }}
          >
            <Icon size={16} className="shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {systemNav.length > 0 && (
          <>
            {!isCollapsed
              ? <p className="text-[10px] font-bold uppercase tracking-widest px-3 mt-5 mb-2"
                  style={{ color: "var(--text)", opacity: 0.3 }}>System</p>
              : <div className="my-3" style={{ borderTop: "1px solid var(--border)" }} />
            }
            {systemNav.map(({ label, icon: Icon, path }) => (
              <NavLink key={label} to={path} onClick={handleNavClick}
                title={isCollapsed ? label : ""}
                className={({ isActive }) => navLinkClass(isActive)}
                style={({ isActive }) => ({ ...navLinkStyle(isActive), color: isActive ? "white" : "var(--text)", opacity: isActive ? 1 : 0.55 })}
              >
                <Icon size={16} className="shrink-0" />
                {!isCollapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* BOTTOM — User Profile (click for theme + logout) */}
      <div className="px-2 py-3" style={{ borderTop: "1px solid var(--border)" }} ref={profileRef}>

        {/* Profile popup */}
        {profileOpen && !isCollapsed && (
          <div className="mb-2 rounded-xl overflow-hidden"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
            {/* Theme toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition hover:bg-[rgba(106,90,205,0.08)]"
              style={{ color: "var(--text)", opacity: 0.8 }}
            >
              {mode === "dark"
                ? <Sun size={15} className="shrink-0 text-amber-400" />
                : <Moon size={15} className="shrink-0" style={{ color: "#6a5acd" }} />}
              <span>{mode === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition hover:bg-[rgba(239,68,68,0.08)]"
              style={{ color: "#dc2626" }}
            >
              <LogOut size={15} className="shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Profile chip — click to toggle popup */}
        {!isCollapsed ? (
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition hover:bg-[rgba(106,90,205,0.06)] group"
            style={{ background: "rgba(106,90,205,.08)", border: "1px solid rgba(106,90,205,.15)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
              {initials}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>
                {user?.name ?? "User"}
              </p>
              <p className="text-[10px] truncate" style={{ color: "var(--text)", opacity: 0.4 }}>
                {user?.email ?? ""}
              </p>
            </div>
            <ChevronUp
              size={13}
              className="shrink-0 transition-transform duration-200"
              style={{ color: "var(--text)", opacity: 0.4, transform: profileOpen ? "rotate(0deg)" : "rotate(180deg)" }}
            />
          </button>
        ) : (
          <div className="flex justify-center py-1">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              title={user?.name ?? "Profile"}
              className="relative"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
                {initials}
              </div>
              {/* collapsed popup */}
              {profileOpen && (
                <div className="absolute bottom-10 left-10 z-50 rounded-xl overflow-hidden shadow-xl min-w-[150px]"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); dispatch(toggleTheme()); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-medium hover:bg-[rgba(106,90,205,0.08)]"
                    style={{ color: "var(--text)" }}
                  >
                    {mode === "dark" ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} style={{ color: "#6a5acd" }} />}
                    {mode === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-medium hover:bg-[rgba(239,68,68,0.08)]"
                    style={{ color: "#dc2626" }}
                  >
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SharedSidebar;
