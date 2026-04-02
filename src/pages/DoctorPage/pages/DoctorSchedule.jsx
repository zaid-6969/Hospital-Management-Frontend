import { useEffect, useState } from "react";
import { getMyAppointments } from "../../../utils/api";
import TimelineCard from "../components/TimelineCard";
import { Calendar, Clock, CheckCircle2, XCircle, Hourglass, Search } from "lucide-react";

const FILTERS = ["All", "REQUESTED", "ACCEPTED", "REJECTED"];

const DoctorSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch]             = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ── Derived stats ──────────────────────────────────────────
  const total     = appointments.length;
  const accepted  = appointments.filter(a => a.status === "ACCEPTED").length;
  const rejected  = appointments.filter(a => a.status === "REJECTED").length;
  const pending   = appointments.filter(a => a.status === "REQUESTED").length;

  // ── Filtered list ──────────────────────────────────────────
  const filtered = appointments.filter(a => {
    const matchFilter = activeFilter === "All" || a.status === activeFilter;
    const matchSearch = !search.trim() ||
      a.patientId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.date?.includes(search) ||
      a.time?.includes(search);
    return matchFilter && matchSearch;
  });

  const statCards = [
    {
      label: "Total",
      value: total,
      icon: Calendar,
      color: "#6a5acd",
      bg: "rgba(106,90,205,0.10)",
      border: "rgba(106,90,205,0.20)",
    },
    {
      label: "Accepted",
      value: accepted,
      icon: CheckCircle2,
      color: "#16a34a",
      bg: "rgba(34,197,94,0.10)",
      border: "rgba(34,197,94,0.20)",
    },
    {
      label: "Pending",
      value: pending,
      icon: Hourglass,
      color: "#ca8a04",
      bg: "rgba(234,179,8,0.10)",
      border: "rgba(234,179,8,0.20)",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "#dc2626",
      bg: "rgba(239,68,68,0.10)",
      border: "rgba(239,68,68,0.20)",
    },
  ];

  const filterConfig = {
    All:       { color: "#6a5acd", bg: "rgba(106,90,205,0.12)" },
    REQUESTED: { color: "#ca8a04", bg: "rgba(234,179,8,0.12)"  },
    ACCEPTED:  { color: "#16a34a", bg: "rgba(34,197,94,0.12)"  },
    REJECTED:  { color: "#dc2626", bg: "rgba(239,68,68,0.12)"  },
  };

  const filterLabel = { All: "All", REQUESTED: "Pending", ACCEPTED: "Accepted", REJECTED: "Rejected" };

  return (
    <main className="space-y-6">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            My Schedule
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text)", opacity: 0.45 }}>
            {total} appointment{total !== 1 ? "s" : ""} in total
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text)", opacity: 0.35 }}
          />
          <input
            type="text"
            placeholder="Search patient, date…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 text-sm rounded-xl outline-none w-52 transition-all focus:w-64"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      {/* ── STAT CARDS ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map(({ label, value, icon: Icon, color, bg, border }) => (
          <div
            key={label}
            className="rounded-2xl p-4 transition-shadow hover:shadow-md"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{value}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.45 }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── FILTER TABS ────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => {
          const isActive = activeFilter === f;
          const cfg = filterConfig[f];
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              style={{
                background: isActive ? cfg.bg    : "var(--card)",
                color:      isActive ? cfg.color : "var(--text)",
                border:     isActive
                  ? `1px solid ${cfg.color}40`
                  : "1px solid var(--border)",
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {filterLabel[f]}
              {f !== "All" && (
                <span
                  className="ml-1.5 font-bold"
                  style={{ opacity: isActive ? 1 : 0.5 }}
                >
                  {f === "REQUESTED" ? pending : f === "ACCEPTED" ? accepted : rejected}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── APPOINTMENT LIST ───────────────────────────────── */}
      {loading ? (
        /* Skeleton */
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="rounded-2xl p-4 animate-pulse"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl" style={{ background: "var(--border)" }} />
                <div className="space-y-2 flex-1">
                  <div className="h-3 rounded-full w-32" style={{ background: "var(--border)" }} />
                  <div className="h-2.5 rounded-full w-20" style={{ background: "var(--border)" }} />
                </div>
                <div className="h-6 w-20 rounded-lg" style={{ background: "var(--border)" }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div
          className="rounded-2xl p-12 flex flex-col items-center justify-center gap-3 text-center"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(106,90,205,0.10)" }}
          >
            <Clock size={24} style={{ color: "#6a5acd" }} />
          </div>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            No appointments found
          </p>
          <p className="text-xs" style={{ color: "var(--text)", opacity: 0.4 }}>
            {search ? "Try a different search term" : "Your schedule is clear for now"}
          </p>
        </div>
      ) : (
        /* List with date grouping */
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Table header */}
          <div
            className="px-5 py-3 grid grid-cols-[1fr_auto_auto] gap-4 items-center"
            style={{
              borderBottom: "1px solid var(--border)",
              background: "rgba(106,90,205,0.04)",
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text)", opacity: 0.4 }}>Patient</span>
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text)", opacity: 0.4 }}>Status</span>
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text)", opacity: 0.4 }}>Action</span>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filtered.map(item => (
              <TimelineCard key={item._id} data={item} refresh={fetchAppointments} />
            ))}
          </div>
        </div>
      )}

    </main>
  );
};

export default DoctorSchedule;