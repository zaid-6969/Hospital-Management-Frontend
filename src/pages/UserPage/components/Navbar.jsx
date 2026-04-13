import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { logoutUser } from "../../../redux/Slices/authApiSlice";
import { toggleTheme } from "../../../redux/Slices/themeSlice";
import Image1 from "../../../assets/logo.png";

const NAV_LINKS = [
  { name: "Home", path: "/user" },
  { name: "About", path: "/user/about" },
  { name: "Services", path: "/user/services" },
  { name: "Contact", path: "/user/contact" },
  { name: "Appointment", path: "/user/appointment" },
];

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const user = useSelector((state) => state.auth.user);
  const displayName = user?.name || user?.email?.split("@")[0] || "Patient";
  const firstLetter = displayName.charAt(0).toUpperCase();

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => dispatch(logoutUser());
  const handleTheme = () => dispatch(toggleTheme());

  const desktopLink = (isActive) =>
    `text-sm font-medium pb-0.5 border-b-2 transition-colors ${
      isActive
        ? "border-[#6a5acd] font-bold"
        : "border-transparent hover:text-[#6a5acd]"
    }`;

  const mobileLink = (isActive) =>
    `text-left text-sm font-medium py-2.5 px-3 rounded-xl transition-all ${
      isActive ? "font-bold" : "hover:bg-[rgba(106,90,205,0.07)]"
    }`;

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          onClick={() => navigate("/user")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="wrounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0">
            <img className="w-15 h-9" src={Image1} alt="" />
          </div>
          <span
            className="font-extrabold text-lg"
            style={{ color: "var(--text)" }}
          >
            MedLab <span style={{ color: "#6a5acd" }}>Hospital</span>
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/user"}
              className={({ isActive }) => desktopLink(isActive)}
              style={({ isActive }) => ({
                color: isActive ? "#6a5acd" : "var(--text)",
                opacity: isActive ? 1 : 0.6,
              })}
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT — Avatar + Dropdown */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            {/* Avatar button */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all"
              style={{
                background: open
                  ? "rgba(106,90,205,0.10)"
                  : "rgba(106,90,205,0.07)",
                border: "1px solid rgba(106,90,205,0.15)",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{
                  background: "linear-gradient(135deg,#6a5acd,#8b5cf6)",
                }}
              >
                {firstLetter}
              </div>
              <span
                className="text-xs font-semibold max-w-[80px] truncate"
                style={{ color: "var(--text)" }}
              >
                {displayName}
              </span>
              <ChevronDown
                size={13}
                style={{
                  color: "var(--text)",
                  opacity: 0.4,
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {/* DROPDOWN */}
            {open && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                }}
              >
                {/* User info header */}
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#6a5acd,#8b5cf6)",
                      }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-xs font-bold truncate"
                        style={{ color: "var(--text)" }}
                      >
                        {displayName}
                      </p>
                      <p
                        className="text-[10px]"
                        style={{ color: "var(--text)", opacity: 0.4 }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Theme toggle */}
                <button
                  onClick={handleTheme}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:bg-[rgba(106,90,205,0.07)]"
                  style={{ color: "var(--text)", opacity: 0.8 }}
                >
                  {mode === "dark" ? (
                    <Sun size={15} className="shrink-0 text-amber-400" />
                  ) : (
                    <Moon
                      size={15}
                      className="shrink-0"
                      style={{ color: "#6a5acd" }}
                    />
                  )}
                  {mode === "dark" ? "Light mode" : "Dark mode"}
                </button>

                {/* Logout */}
                <div style={{ borderTop: "1px solid var(--border)" }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:bg-[rgba(239,68,68,0.07)]"
                    style={{ color: "#dc2626" }}
                  >
                    <LogOut size={15} className="shrink-0" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span
            className={`w-6 h-0.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ background: "var(--text)" }}
          />
          <span
            className={`w-6 h-0.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
            style={{ background: "var(--text)" }}
          />
          <span
            className={`w-6 h-0.5 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ background: "var(--text)" }}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-1"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* User chip */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2"
            style={{
              background: "rgba(106,90,205,0.08)",
              border: "1px solid rgba(106,90,205,0.15)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}
            >
              {initials}
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
                {displayName}
              </p>
              <p
                className="text-[10px]"
                style={{ color: "var(--text)", opacity: 0.4 }}
              >
                Patient
              </p>
            </div>
          </div>

          {/* Nav links */}
          {NAV_LINKS.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/user"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => mobileLink(isActive)}
              style={({ isActive }) => ({
                color: isActive ? "#6a5acd" : "var(--text)",
                opacity: isActive ? 1 : 0.65,
              })}
            >
              {name}
            </NavLink>
          ))}

          {/* Actions */}
          <div
            className="mt-2 flex flex-col gap-1.5"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "10px" }}
          >
            <button
              onClick={handleTheme}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-[rgba(106,90,205,0.07)]"
              style={{ color: "var(--text)", opacity: 0.8 }}
            >
              {mode === "dark" ? (
                <Sun size={15} className="text-amber-400" />
              ) : (
                <Moon size={15} style={{ color: "#6a5acd" }} />
              )}
              {mode === "dark" ? "Light mode" : "Dark mode"}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-[rgba(239,68,68,0.07)]"
              style={{ color: "#dc2626" }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
