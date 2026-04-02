import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getMyAppointments } from "../../../utils/api";
import { Clock, User, CalendarDays, CheckCircle2, XCircle, Hourglass } from "lucide-react";

// ── inline style override for react-calendar to match CSS vars ──
const calendarStyle = `
  .react-calendar {
    width: 100%;
    background: transparent;
    border: none;
    font-family: inherit;
    line-height: 1.5;
  }
  .react-calendar__navigation {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .react-calendar__navigation button {
    min-width: 36px;
    height: 36px;
    background: rgba(106,90,205,0.08);
    border: 1px solid rgba(106,90,205,0.15);
    border-radius: 10px;
    color: var(--text);
    font-size: 13px;
    font-weight: 700;
    transition: all 0.15s;
    cursor: pointer;
  }
  .react-calendar__navigation button:hover {
    background: rgba(106,90,205,0.18);
  }
  .react-calendar__navigation__label {
    flex-grow: 1;
    font-size: 14px;
    font-weight: 800;
    color: var(--text);
    background: transparent !important;
    border: none !important;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    margin-bottom: 4px;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 4px 0;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    color: var(--text);
    opacity: 0.35;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .react-calendar__tile {
    position: relative;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    background: transparent;
    border: none;
    transition: all 0.15s;
    cursor: pointer;
    padding: 4px 2px;
  }
  .react-calendar__tile:hover {
    background: rgba(106,90,205,0.10);
  }
  .react-calendar__tile--now {
    background: rgba(106,90,205,0.12) !important;
    border: 1px solid rgba(106,90,205,0.25) !important;
    color: #6a5acd !important;
    font-weight: 800;
  }
  .react-calendar__tile--active,
  .react-calendar__tile--active:hover {
    background: linear-gradient(135deg,#6a5acd,#8b5cf6) !important;
    color: white !important;
    box-shadow: 0 4px 12px rgba(106,90,205,0.35);
  }
  .react-calendar__tile--active abbr,
  .react-calendar__tile--now abbr {
    color: inherit;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.25;
  }
  .react-calendar__tile abbr {
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
  }
`;

const STATUS = {
  ACCEPTED:  { label: "Accepted", color: "#16a34a", bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.20)",  dot: "#22c55e", icon: CheckCircle2 },
  REJECTED:  { label: "Rejected", color: "#dc2626", bg: "rgba(239,68,68,0.10)",  border: "rgba(239,68,68,0.20)",  dot: "#ef4444", icon: XCircle     },
  REQUESTED: { label: "Pending",  color: "#ca8a04", bg: "rgba(234,179,8,0.10)",  border: "rgba(234,179,8,0.20)",  dot: "#eab308", icon: Hourglass    },
};

const AVATAR_COLORS = [
  "linear-gradient(135deg,#6a5acd,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
];

const DoctorCalendar = () => {
  const [date, setDate]               = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await getMyAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedAppointments = appointments.filter(
    (a) => new Date(a.date).toDateString() === date.toDateString()
  );

  const totalToday    = selectedAppointments.length;
  const acceptedToday = selectedAppointments.filter(a => a.status === "ACCEPTED").length;
  const pendingToday  = selectedAppointments.filter(a => a.status === "REQUESTED").length;

  // Dot markers on calendar tiles
  const tileContent = ({ date: tileDate, view }) => {
    if (view !== "month") return null;
    const dayAppts = appointments.filter(
      (a) => new Date(a.date).toDateString() === tileDate.toDateString()
    );
    if (!dayAppts.length) return null;
    return (
      <div className="flex justify-center gap-0.5 mt-0.5">
        {dayAppts.slice(0, 3).map((a, i) => (
          <span
            key={i}
            style={{
              width: 5, height: 5,
              borderRadius: "50%",
              background: STATUS[a.status]?.dot ?? "#6a5acd",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    );
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <main className="space-y-6">
      {/* inject calendar overrides */}
      <style>{calendarStyle}</style>

      {/* ── HEADER ─────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
          Calendar & Schedule
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text)", opacity: 0.45 }}>
          Manage your daily appointments visually
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── LEFT: CALENDAR ────────────────────────────── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Purple accent */}
          <div className="h-0.5 w-full rounded-full -mt-1"
            style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6,transparent)" }} />

          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
          />

          {/* Legend */}
          <div
            className="flex flex-wrap gap-3 pt-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {Object.entries(STATUS).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
                <span className="text-[10px] font-semibold" style={{ color: "var(--text)", opacity: 0.5 }}>
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: DAY VIEW ───────────────────────────── */}
        <div
          className="xl:col-span-2 rounded-2xl flex flex-col"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Day header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: "var(--text)", opacity: 0.35 }}>Selected Day</p>
              <h2 className="text-base font-extrabold" style={{ color: "var(--text)" }}>
                {formattedDate}
              </h2>
            </div>

            {/* Mini stats */}
            {totalToday > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={{ background: "rgba(106,90,205,0.10)", color: "#6a5acd", border: "1px solid rgba(106,90,205,0.18)" }}>
                  <CalendarDays size={12} />
                  {totalToday} total
                </div>
                {acceptedToday > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(34,197,94,0.10)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.18)" }}>
                    <CheckCircle2 size={12} />
                    {acceptedToday}
                  </div>
                )}
                {pendingToday > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(234,179,8,0.10)", color: "#ca8a04", border: "1px solid rgba(234,179,8,0.18)" }}>
                    <Hourglass size={12} />
                    {pendingToday}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Appointment list */}
          <div className="flex-1 overflow-y-auto p-5">
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="rounded-xl p-4 flex items-center gap-3 animate-pulse"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <div className="w-11 h-11 rounded-xl shrink-0" style={{ background: "var(--border)" }} />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 rounded-full w-32" style={{ background: "var(--border)" }} />
                      <div className="h-2.5 rounded-full w-20" style={{ background: "var(--border)" }} />
                    </div>
                    <div className="h-6 w-20 rounded-lg" style={{ background: "var(--border)" }} />
                  </div>
                ))}
              </div>
            ) : selectedAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-48 gap-3 py-12">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(106,90,205,0.08)" }}>
                  <CalendarDays size={22} style={{ color: "#6a5acd", opacity: 0.6 }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)", opacity: 0.5 }}>
                  No appointments for this day
                </p>
                <p className="text-xs" style={{ color: "var(--text)", opacity: 0.3 }}>
                  Select another date on the calendar
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedAppointments.map((appt, idx) => {
                  const cfg        = STATUS[appt.status] || STATUS.REQUESTED;
                  const StatusIcon = cfg.icon;
                  const avatarBg   = AVATAR_COLORS[(appt.patientId?.name?.charCodeAt(0) ?? idx) % AVATAR_COLORS.length];

                  return (
                    <div
                      key={appt._id}
                      className="rounded-xl p-4 flex items-center gap-4 transition-all hover:shadow-md"
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(106,90,205,0.25)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      {/* Avatar */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0"
                        style={{ background: avatarBg }}
                      >
                        {(appt.patientId?.name?.[0] || "P").toUpperCase()}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>
                          {appt.patientId?.name || "Patient"}
                        </p>
                        <p className="text-xs mt-0.5 flex items-center gap-1"
                          style={{ color: "var(--text)", opacity: 0.45 }}>
                          <Clock size={11} />
                          {appt.time || "—"}
                        </p>
                      </div>

                      {/* Status badge */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                      >
                        <StatusIcon size={12} style={{ color: cfg.color }} />
                        <span className="text-xs font-bold" style={{ color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorCalendar;