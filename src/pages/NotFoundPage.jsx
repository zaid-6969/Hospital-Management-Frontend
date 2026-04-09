import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, LayoutDashboard, Users, CalendarCheck } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth?.user);

  const getHomeRoute = () => {
    if (!user) return "/";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "DOCTOR") return "/doctor";
    if (user.role === "RECEPTIONIST") return "/reception";
    if (user.role === "PATIENT") return "/user";
    return "/";
  };

  const getQuickLinks = () => {
    if (user?.role === "ADMIN") return [
      { label: "Dashboard",    icon: LayoutDashboard, path: "/admin" },
      { label: "Doctors",      icon: Users,           path: "/admin/list" },
      { label: "Appointments", icon: CalendarCheck,   path: "/admin" },
    ];
    if (user?.role === "DOCTOR") return [
      { label: "Schedule",  icon: CalendarCheck,   path: "/doctor" },
      { label: "Overview",  icon: LayoutDashboard, path: "/doctor/overview" },
    ];
    return [
      { label: "Home", icon: LayoutDashboard, path: getHomeRoute() },
    ];
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="rounded-3xl p-10 sm:p-14 text-center w-full max-w-md"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Purple accent top bar */}
        <div
          className="w-16 h-1 rounded-full mx-auto mb-8"
          style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }}
        />

        {/* 404 number */}
        <div className="relative inline-block mb-6">
          <span
            className="text-8xl font-extrabold leading-none select-none"
            style={{
              background: "linear-gradient(135deg,#6a5acd,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-4px",
            }}
          >
            404
          </span>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: "rgba(106,90,205,0.1)",
              border: "1px solid rgba(106,90,205,0.2)",
              color: "#6a5acd",
            }}
          >
            Page not found
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-extrabold mb-3"
          style={{ color: "var(--text)" }}
        >
          Oops! Wrong turn
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "var(--text)", opacity: 0.5 }}
        >
          The page you're looking for doesn't exist or you don't have
          permission to access it.
        </p>

        {/* Go home button */}
        <button
          onClick={() => navigate(getHomeRoute())}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white mb-6 transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(135deg,#6a5acd,#8b5cf6)",
            boxShadow: "0 4px 14px rgba(106,90,205,0.30)",
          }}
        >
          <ArrowLeft size={15} />
          Go back home
        </button>

        {/* Divider */}
        <div
          className="mb-5"
          style={{ borderTop: "1px solid var(--border)" }}
        />

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-2">
          {getQuickLinks().map(({ label, icon: Icon, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
              style={{
                background: "rgba(106,90,205,0.07)",
                border: "1px solid rgba(106,90,205,0.15)",
                color: "var(--text)",
                opacity: 0.7,
              }}
            >
              <Icon size={13} style={{ color: "#6a5acd", opacity: 1 }} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;