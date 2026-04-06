import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDoctorProfile, toggleDoctorAvailability } from "../../../redux/Slices/doctorSlice";
import { getMyDoctorStats } from "../utils/api";
import {
  Activity, Calendar, Users, Clock, Award, Star, Loader2, CheckCircle2, XCircle,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DoctorOverview = () => {
  const dispatch = useDispatch();
  const { myProfile: doctor, loading: profileLoading } = useSelector((s) => s.doctors);
  const [stats,   setStats]   = useState({});
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [, statsRes] = await Promise.all([
        dispatch(fetchMyDoctorProfile()),
        getMyDoctorStats(),
      ]);

      const sRaw = statsRes?.data;
      const s    = (sRaw && ("accepted" in sRaw || "total" in sRaw))
        ? sRaw
        : sRaw?.stats ?? sRaw?.data ?? sRaw ?? {};
      setStats(s);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    if (!doctor?._id) return;
    setToggling(true);
    await dispatch(toggleDoctorAvailability({
      doctorId: doctor._id,
      isAvailable: !(doctor.isAvailable ?? true),
    }));
    setToggling(false);
  };

  const accepted = stats?.accepted ?? stats?.acceptedAppointments ?? 0;
  const rejected = stats?.rejected ?? stats?.rejectedAppointments ?? 0;
  const total    = stats?.total    ?? stats?.totalAppointments    ?? 0;
  const pending  = stats?.pending  ?? Math.max(0, total - accepted - rejected);

  const chartData = [
    { name: "Accepted", value: accepted, color: "#10b981" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
    { name: "Pending",  value: pending,  color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  const statCards = [
    { label: "Total Appointments", value: total,    icon: Calendar, color: "#6a5acd" },
    { label: "Accepted",           value: accepted, icon: Users,    color: "#10b981" },
    { label: "Rejected",           value: rejected, icon: Clock,    color: "#ef4444" },
    { label: "Pending",            value: pending,  icon: Activity, color: "#f59e0b" },
  ];

  // ── Loading ─────────────────────────────────────────────────
  if (loading || profileLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3" style={{ color: "var(--text)", opacity: 0.4 }}>
        <Loader2 size={30} className="animate-spin" style={{ color: "#6a5acd", opacity: 1 }} />
        <p className="text-sm font-medium">Loading overview…</p>
      </div>
    </div>
  );

  return (
    <main className="space-y-6">

      {/* ── HEADER ───────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
          Welcome, Dr. {doctor?.name ?? "—"}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text)", opacity: 0.45 }}>
          {doctor?.specialization ?? ""}
        </p>
      </div>

      {/* ── TOP ROW: Profile + Chart ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Purple accent line */}
          <div className="w-full h-0.5 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

          {/* Avatar */}
          {doctor?.image?.url ? (
            <img src={doctor.image.url} alt={doctor.name}
              className="w-24 h-24 rounded-2xl object-cover mb-4 shadow-lg" />
          ) : (
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}
            >
              {doctor?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "DR"}
            </div>
          )}

          <h2 className="text-lg font-extrabold" style={{ color: "var(--text)" }}>
            {doctor?.name ?? "—"}
          </h2>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "#8b5cf6" }}>
            {doctor?.specialization ?? "—"}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.4 }}>
            {doctor?.experience ? `${doctor.experience} years experience` : ""}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={13}
                fill={i <= 4 ? "#f59e0b" : "none"}
                stroke={i <= 4 ? "#f59e0b" : "#d1d5db"} />
            ))}
            <span className="text-xs ml-1 font-medium" style={{ color: "var(--text)", opacity: 0.4 }}>4.8</span>
          </div>

          {/* ── Availability Toggle ── */}
          <div className="w-full mt-4">
            <button
              onClick={handleToggleAvailability}
              disabled={toggling}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
              style={
                (doctor?.isAvailable ?? true)
                  ? { background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#16a34a" }
                  : { background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#dc2626" }
              }
            >
              {toggling ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (doctor?.isAvailable ?? true) ? (
                <><CheckCircle2 size={14} /> Available — Click to go Unavailable</>
              ) : (
                <><XCircle size={14} /> Unavailable — Click to go Available</>
              )}
            </button>
          </div>

          <div className="w-full my-4" style={{ borderTop: "1px solid var(--border)" }} />

          {/* Contact */}
          <div className="w-full space-y-2 text-left">
            {doctor?.email && (
              <div className="flex justify-between text-xs gap-2">
                <span style={{ color: "var(--text)", opacity: 0.4 }}>Email</span>
                <span className="font-medium truncate" style={{ color: "var(--text)" }}>
                  {doctor.email}
                </span>
              </div>
            )}
            {doctor?.phone && (
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--text)", opacity: 0.4 }}>Phone</span>
                <span className="font-medium" style={{ color: "var(--text)" }}>
                  {doctor.phone}
                </span>
              </div>
            )}
          </div>

          {/* Availability days */}
          {doctor?.availability?.length > 0 && (
            <div className="w-full mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-left"
                style={{ color: "var(--text)", opacity: 0.3 }}>Available Days</p>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {doctor.availability.map((item, idx) => {
                  const label = typeof item === "string" ? item : item?.day ?? "";
                  return label ? (
                    <span key={idx}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                      style={{
                        background: "rgba(106,90,205,0.1)",
                        color: "#6a5acd",
                        border: "1px solid rgba(106,90,205,0.2)",
                      }}>
                      {label.slice(0, 3)}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Chart Card */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <h3 className="text-sm font-bold flex items-center gap-2 mb-1"
            style={{ color: "var(--text)" }}>
            <Activity size={15} style={{ color: "#8b5cf6" }} />
            Performance Analytics
          </h3>
          <p className="text-xs mb-6" style={{ color: "var(--text)", opacity: 0.4 }}>
            Appointment outcomes overview
          </p>

          {total === 0 ? (
            <div className="h-56 flex flex-col items-center justify-center gap-2"
              style={{ color: "var(--text)", opacity: 0.3 }}>
              <Calendar size={32} />
              <p className="text-sm">No appointment data yet.</p>
            </div>
          ) : (
            <>
              <div className="h-56 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={6}
                      dataKey="value"
                    >
                      {chartData.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                        color: "var(--text)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-5 mt-2 flex-wrap">
                {chartData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text)", opacity: 0.6 }}>
                      {d.name}{" "}
                      <span className="font-bold" style={{ opacity: 1 }}>{d.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── STAT CARDS ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl p-5 hover:shadow-lg transition-shadow"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${color}18` }}
            >
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{value}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.4 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── BIO ──────────────────────────────────────────── */}
      {doctor?.bio && (
        <div
          className="rounded-2xl p-6 hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(106,90,205,0.12)" }}>
              <Award size={14} style={{ color: "#8b5cf6" }} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--text)", opacity: 0.4 }}>About</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)", opacity: 0.7 }}>
            {doctor.bio}
          </p>
        </div>
      )}

    </main>
  );
};

export default DoctorOverview;