import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Star, Calendar, Clock, Users, Award } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";

// ── STATIC MOCK DATA ──────────────────────────────────────────
const MOCK_DOC = {
  name: "Dr. Sarah Mitchell",
  specialization: "Cardiologist",
  experience: 12,
  email: "s.mitchell@medlab.com",
  phone: "+1 (555) 234-5678",
  image: null,
  availability: ["Monday", "Wednesday", "Friday"],
  bio: "Dr. Mitchell is a board-certified cardiologist with over 12 years of experience in interventional cardiology and heart failure management.",
};

const MOCK_STATS = {
  accepted: 142,
  rejected: 18,
  total: 185,
};

// ─────────────────────────────────────────────────────────────

const AdminDoctorDetails = () => {
  const navigate = useNavigate();

  const { name, specialization, experience, email, phone, image, availability, bio } = MOCK_DOC;
  const accepted = MOCK_STATS.accepted;
  const rejected = MOCK_STATS.rejected;
  const total    = MOCK_STATS.total;
  const pending  = total - (accepted + rejected);

  const chartData = [
    { name: "Accepted", value: accepted, color: "#10b981" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
    { name: "Pending",  value: pending,  color: "#f59e0b" },
  ];

  const statCards = [
    { label: "Total Appointments", value: total,    icon: Calendar, color: "#6a5acd" },
    { label: "Accepted",           value: accepted, icon: Users,    color: "#10b981" },
    { label: "Rejected",           value: rejected, icon: Clock,    color: "#ef4444" },
    { label: "Pending",            value: pending,  icon: Activity, color: "#f59e0b" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold transition-colors"
        style={{ color: "var(--text)", opacity: .5 }}
        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "#6a5acd"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = .5; e.currentTarget.style.color = "var(--text)"; }}
      >
        <ArrowLeft size={16} /> Back to Staff
      </button>

      {/* Top row: profile + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile card */}
        <div className="rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          {/* Purple accent line */}
          <div className="w-full h-0.5 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

          {/* Avatar */}
          {image?.url ? (
            <img src={image.url} alt={name}
              className="w-24 h-24 rounded-2xl object-cover mb-4 shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
              {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
          )}

          <h1 className="text-lg font-extrabold" style={{ color: "var(--text)" }}>{name}</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "#8b5cf6" }}>{specialization}</p>
          <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: .4 }}>{experience} years experience</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={13} fill={i <= 4 ? "#f59e0b" : "none"} stroke={i <= 4 ? "#f59e0b" : "#d1d5db"} />
            ))}
            <span className="text-xs ml-1 font-medium" style={{ color: "var(--text)", opacity: .4 }}>4.8</span>
          </div>

          {/* Divider */}
          <div className="w-full my-4" style={{ borderTop: "1px solid var(--border)" }} />

          {/* Contact info */}
          <div className="w-full space-y-2 text-left">
            <div className="flex justify-between text-xs">
              <span style={{ color: "var(--text)", opacity: .4 }}>Email</span>
              <span className="font-medium" style={{ color: "var(--text)" }}>{email}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: "var(--text)", opacity: .4 }}>Phone</span>
              <span className="font-medium" style={{ color: "var(--text)" }}>{phone}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="w-full mt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-left"
              style={{ color: "var(--text)", opacity: .3 }}>Available Days</p>
            <div className="flex flex-wrap gap-1.5 justify-start">
              {availability.map(day => (
                <span key={day} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{ background: "rgba(106,90,205,0.1)", color: "#6a5acd", border: "1px solid rgba(106,90,205,.2)" }}>
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart card */}
        <div className="lg:col-span-2 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          <h3 className="text-sm font-bold flex items-center gap-2 mb-1" style={{ color: "var(--text)" }}>
            <Activity size={15} style={{ color: "#8b5cf6" }} />
            Performance Analytics
          </h3>
          <p className="text-xs mb-6" style={{ color: "var(--text)", opacity: .4 }}>Appointment outcomes overview</p>

          <div className="h-56 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} innerRadius={60} outerRadius={90} paddingAngle={6} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--card)", border: "1px solid var(--border)",
                    borderRadius: 12, fontSize: 12
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-5 mt-2">
            {chartData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs font-semibold" style={{ color: "var(--text)", opacity: .6 }}>
                  {d.name} <span className="font-bold" style={{ opacity: 1 }}>{d.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5 hover:shadow-lg transition-shadow"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${color}18` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{value}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: .4 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Bio card */}
      <div className="rounded-2xl p-6 hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(106,90,205,0.12)" }}>
            <Award size={14} style={{ color: "#8b5cf6" }} />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text)", opacity: .4 }}>About</p>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)", opacity: .7 }}>{bio}</p>
      </div>

    </div>
  );
};

export default AdminDoctorDetails;
