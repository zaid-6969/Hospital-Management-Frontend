import { NavLink, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/user" },
  { name: "About", path: "/user/about" },
  { name: "Services", path: "/user/services" },
  { name: "Contact", path: "/user/contact" },
  { name: "Appointment", path: "/user/appointment" },
];


const Navbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const baseClass =
    "text-sm font-medium pb-0.5 border-b-2 transition-colors";

  const getClass = (isActive) =>
    `${baseClass} ${
      isActive
        ? "text-violet-600 border-violet-600 font-bold"
        : "text-gray-500 border-transparent hover:text-violet-600"
    }`;

  const mobileClass = (isActive) =>
    `text-left text-sm font-medium py-3 px-2 rounded-lg transition-colors ${
      isActive
        ? "text-violet-600 bg-violet-50 font-bold"
        : "text-gray-600 hover:text-violet-600"
    }`;

  return (
    <nav className="bg-card border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
            <span className="text-white font-extrabold text-base">M</span>
          </div>
          <span className="font-extrabold text-lg text-gray-900">
            MedLab <span className="text-violet-600">Hospital</span>
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ name, path }) => (
            <NavLink key={name} to={path} className={({ isActive }) => getClass(isActive)}>
              {name}
            </NavLink>
          ))}
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-3">
          {[
            { name: "Sign In", path: "/", style: "text-gray-700 hover:text-violet-600" },
            { name: "Register", path: "/", style: "bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full shadow-lg shadow-violet-200" },
          ].map(({ name, path, style }) => (
            <NavLink key={name} to={path} end={path === "/user"} className={`text-sm font-bold ${style}`}>
              {name}
            </NavLink>
          ))}
        </div>

        {/* MOBILE BTN */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`w-6 h-0.5 bg-gray-800 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-gray-800 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-gray-800 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t px-6 pb-4 pt-2 flex flex-col gap-1">
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

          <div className="flex gap-3 mt-2 pt-3 border-t">
            {[
              { name: "Sign In", path: "/", style: "border-2 border-violet-300 text-violet-600" },
              { name: "Register", path: "/", style: "bg-violet-600 text-white" },
            ].map(({ name, path, style }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex-1 text-center font-bold py-2 rounded-full text-sm ${style}`}
              >
                {name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;