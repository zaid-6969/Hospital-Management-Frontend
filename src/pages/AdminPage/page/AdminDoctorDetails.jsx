import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoctorById, getDoctorStats } from "../service/api";
import {
  ArrowLeft, Activity, Star, Calendar,
  Clock, Users, Award, Loader2,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// ── Unwrap common API response shapes ────────────────────────
// Handles: res.data / res.data.doctor / res.data.data / res.data.data.doctor
const unwrapDoctor = (raw) => {
  if (!raw) return null;
  if (raw.name)               return raw;
  if (raw.doctor?.name)       return raw.doctor;
  if (raw.data?.name)         return raw.data;
  if (raw.data?.doctor?.name) return raw.data.doctor;
  // last resort: return the first object that has a name field
  const found = Object.values(raw).find(v => v && typeof v === "object" && v.name);
  return found ?? null;
};

const unwrapStats = (raw) => {
  if (!raw) return {};
  if ("accepted" in raw || "total" in raw) return raw;
  if (raw.stats)                            return raw.stats;
  if (raw.data?.stats)                      return raw.data.stats;
  if (raw.data && ("accepted" in raw.data || "total" in raw.data)) return raw.data;
  return {};
};
// ─────────────────────────────────────────────────────────────

const AdminDoctorDetails = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  // ✅ id is passed via: navigate("/admin/doctor-details", { state: { id: doc._id } })
  const doctorId = location.state?.id;

  const [doctor,  setDoctor]  = useState(null);
  const [stats,   setStats]   = useState({});
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!doctorId) {
      setError("No doctor selected. Please go back and click on a doctor.");
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [docRes, statsRes] = await Promise.all([
          getDoctorById(doctorId),
          getDoctorStats(doctorId),
        ]);

        const doc = unwrapDoctor(docRes?.data);
        if (!doc) throw new Error("Doctor data not found in API response.");

        setDoctor(doc);
        setStats(unwrapStats(statsRes?.data));
      } catch (err) {
        console.error("[AdminDoctorDetails] error:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to load doctor.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [doctorId]);

  // ── Loading ───────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3" style={{ color: "var(--text)", opacity: 0.4 }}>
        <Loader2 size={32} className="animate-spin text-violet-500" style={{ opacity: 1 }} />
        <p className="text-sm font-medium">Loading doctor details…</p>
      </div>
    </div>
  );

  // ── Error ─────────────────────────────────────────────────
  if (error || !doctor) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(239,68,68,0.1)" }}>
        <Award size={28} className="text-red-400" />
      </div>
      <p className="text-red-500 font-semibold text-center">{error || "Doctor not found."}</p>
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:underline">
        <ArrowLeft size={14} /> Go Back
      </button>
    </div>
  );

  // ── Derived values ────────────────────────────────────────
  const { name, specialization, experience, email, phone, image, availability, bio } = doctor;

  const accepted = stats?.accepted          ?? stats?.acceptedAppointments  ?? 0;
  const rejected = stats?.rejected          ?? stats?.rejectedAppointments  ?? 0;
  const total    = stats?.total             ?? stats?.totalAppointments      ?? 0;
  const pending  = stats?.pending           ?? Math.max(0, total - accepted - rejected);

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

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold transition-colors"
        style={{ color: "var(--text)", opacity: 0.5 }}
        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "#6a5acd"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.color = "var(--text)"; }}
      >
        <ArrowLeft size={16} /> Back to Staff
      </button>

      {/* ── Top Row: Profile + Chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          <div className="w-full h-0.5 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

          {image?.url ? (
            <img src={image.url} alt={name}
              className="w-24 h-24 rounded-2xl object-cover mb-4 shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
              {name?.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "DR"}
            </div>
          )}

          <h1 className="text-lg font-extrabold" style={{ color: "var(--text)" }}>{name}</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "#8b5cf6" }}>{specialization}</p>
          <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.4 }}>
            {experience ? `${experience} years experience` : "—"}
          </p>

          <div className="flex items-center gap-1 mt-3">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={13}
                fill={i <= 4 ? "#f59e0b" : "none"}
                stroke={i <= 4 ? "#f59e0b" : "#d1d5db"} />
            ))}
            <span className="text-xs ml-1 font-medium" style={{ color: "var(--text)", opacity: 0.4 }}>4.8</span>
          </div>

          <div className="w-full my-4" style={{ borderTop: "1px solid var(--border)" }} />

          <div className="w-full space-y-2 text-left">
            {email && (
              <div className="flex justify-between text-xs gap-2">
                <span style={{ color: "var(--text)", opacity: 0.4 }}>Email</span>
                <span className="font-medium truncate" style={{ color: "var(--text)" }}>{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--text)", opacity: 0.4 }}>Phone</span>
                <span className="font-medium" style={{ color: "var(--text)" }}>{phone}</span>
              </div>
            )}
          </div>

          {availability?.length > 0 && (
            <div className="w-full mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-left"
                style={{ color: "var(--text)", opacity: 0.3 }}>Available Days</p>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {availability.map((item, idx) => {
                  const label = typeof item === "string" ? item : item?.day ?? "";
                  return label ? (
                    <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(106,90,205,0.1)", color: "#6a5acd", border: "1px solid rgba(106,90,205,.2)" }}>
                      {label.slice(0, 3)}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-2 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          <h3 className="text-sm font-bold flex items-center gap-2 mb-1" style={{ color: "var(--text)" }}>
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
                    <Pie data={chartData} innerRadius={60} outerRadius={90} paddingAngle={6} dataKey="value">
                      {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{
                      background: "var(--card)", border: "1px solid var(--border)",
                      borderRadius: 12, fontSize: 12,
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
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

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5 hover:shadow-lg transition-shadow"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${color}18` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{value}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.4 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Bio ── */}
      {bio && (
        <div className="rounded-2xl p-6 hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(106,90,205,0.12)" }}>
              <Award size={14} style={{ color: "#8b5cf6" }} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text)", opacity: 0.4 }}>
              About
            </p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)", opacity: 0.7 }}>{bio}</p>
        </div>
      )}

    </div>
  );
};

export default AdminDoctorDetails;