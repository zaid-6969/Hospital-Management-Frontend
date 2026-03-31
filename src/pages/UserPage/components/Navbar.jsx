import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle";
import { useState, useRef, useEffect } from "react";
import { logout } from "../services/api";

const NAV_LINKS = [
  { name: "Home", path: "/user" },
  { name: "About", path: "/user/about" },
  { name: "Services", path: "/user/services" },
  { name: "Contact", path: "/user/contact" },
  { name: "Appointment", path: "/user/appointment" },
];

const Navbar = ({ menuOpen, setMenuOpen, user = "Mohammed", onLogout }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const firstLetter = user?.charAt(0).toUpperCase();

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const baseClass = "text-sm font-medium pb-0.5 border-b-2 transition-colors";

  const getClass = (isActive) =>
    `${baseClass} ${
      isActive
        ? "text-violet-600 border-violet-600 font-bold"
        : "text-text/60 border-transparent hover:text-violet-600"
    }`;

  const mobileClass = (isActive) =>
    `text-left text-sm font-medium py-3 px-3 rounded-lg transition ${
      isActive
        ? "text-violet-600 bg-violet-50 font-bold"
        : "text-text/70 hover:text-violet-600 hover:bg-violet-50"
    }`;

  const logoutUser = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav
      style={{ backgroundColor: "var(--bg)" }}
      className="border-b border-border sticky top-0 z-50 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-extrabold text-lg text-text">
            MedLab <span className="text-violet-600">Hospital</span>
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) => getClass(isActive)}
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-4">
          {/* USER AVATAR */}
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition"
            >
              {firstLetter}
            </div>

            {/* DROPDOWN */}
            {open && (
              <div
                style={{ backgroundColor: "var(--bg)" }}
                className="absolute right-0 mt-3 w-52 bg-card border border-secondary rounded-xl shadow-xl p-3 z-50 animate-fadeIn"
              >
                <p className="text-sm font-semibold text-text mb-3 border-b pb-2">
                  {user}
                </p>

                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-violet-50 transition text-sm">
                  <ThemeToggle />
                </button>

                <button
                  onClick={logoutUser}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 transition text-sm mt-1"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BTN */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span
            className={`w-6 h-0.5 bg-text transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-text transition ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-text transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t px-6 pb-4 pt-3 flex flex-col gap-2">
          {/* USER */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
              {firstLetter}
            </div>
            <span className="font-semibold text-text">{user}</span>
          </div>

          {NAV_LINKS.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/user"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => mobileClass(isActive)}
            >
              {name}
            </NavLink>
          ))}

          {/* ACTIONS */}
          <div className=" border-t mt-3 pt-3 flex flex-col gap-2">
            <button className="py-2 rounded-lg bg-violet-100 text-violet-600 font-semibold">
              <ThemeToggle />
            </button>

            <button
              onClick={logoutUser}
              className="py-2 rounded-lg bg-red-50 text-red-500 font-semibold"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
