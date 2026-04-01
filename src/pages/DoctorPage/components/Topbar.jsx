import { Bell, Search, RefreshCw, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/doctor":          { title: "Dashboard",  sub: "Welcome back, Doctor 👋" },
  "/doctor/overview": { title: "Overview",   sub: "Your profile & performance" },
  "/doctor/schedule": { title: "Schedule",   sub: "Manage your appointments" },
  "/doctor/settings": { title: "Settings",   sub: "Account & preferences" },
};

const Topbar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const info = PAGE_TITLES[pathname] || { title: "Doctor", sub: "Doctor Portal" };

  return (
    <header
      className="h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-20"
      style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition"
          style={{ background: "rgba(106,90,205,.12)", color: "#6a5acd" }}
        >
          <Menu size={18} />
        </button>

        <div>
          <h1 className="font-bold text-sm leading-tight" style={{ color: "var(--text)" }}>
            {info.title}
          </h1>
          <p className="text-xs mt-0.5 hidden sm:block" style={{ color: "var(--text)", opacity: .4 }}>
            {info.sub}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div
          className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 w-44"
          style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
        >
          <Search size={13} style={{ color: "var(--text)", opacity: .3 }} className="shrink-0" />
          <input
            placeholder="Search…"
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: "var(--text)" }}
          />
        </div>

        {/* Refresh */}
        <button
          onClick={() => window.location.reload()}
          className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center transition"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", opacity: .6 }}
          onMouseEnter={e => { e.currentTarget.style.color = "#6a5acd"; e.currentTarget.style.opacity = 1; e.currentTarget.style.borderColor = "rgba(106,90,205,.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.opacity = .6; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <RefreshCw size={14} />
        </button>

        {/* Bell */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", opacity: .6 }}
          onMouseEnter={e => { e.currentTarget.style.color = "#6a5acd"; e.currentTarget.style.opacity = 1; e.currentTarget.style.borderColor = "rgba(106,90,205,.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.opacity = .6; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <Bell size={14} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"
            style={{ border: "2px solid var(--card)" }} />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
          style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 12px rgba(106,90,205,.30)" }}
        >
          DR
        </div>
      </div>
    </header>
  );
};

export default Topbar;
