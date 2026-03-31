import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAllAppointments, getDoctors } from "../service/api";
import {
  Users, CalendarCheck, CheckCircle2, XCircle,
  Clock, TrendingUp, ChevronRight, ArrowUpRight,
  Stethoscope, Star, Activity, Plus, MoreHorizontal
} from "lucide-react";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const STATUS_CONFIG = {
  ACCEPTED:  { label: "Accepted", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  REJECTED:  { label: "Rejected", cls: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" },
  REQUESTED: { label: "Pending",  cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  accepted:  { label: "Accepted", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  rejected:  { label: "Rejected", cls: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" },
  requested: { label: "Pending",  cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
};

const Dashboard = () => {
  const [stats, setStats]               = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors]           = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchStats        = async () => { try { const r = await getAdminStats();           setStats(r.data);              } catch {} };
  const fetchDoctors      = async () => { try { const r = await getDoctors();              setDoctors(r.data);            } catch {} };
  const fetchAppointments = async () => { try { const r = await getAllAppointments(1, 20); setAppointments(r.data?.data || []); } catch {} };

  if (!stats) return (
    <div className="flex items-center justify-center h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-[#6a5acd] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm" style={{ color: "var(--text)", opacity: 0.5 }}>Loading dashboard…</p>
      </div>
    </div>
  );

  const doughnutData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [{
      data: [stats.acceptedPercent, stats.rejectedPercent, stats.requestedPercent],
      backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Appointments",
      data: [8, 15, 10, 18, 13, 6, 9],
      backgroundColor: "rgba(106,90,205,0.85)",
      borderRadius: 10,
      borderSkipped: false,
    }],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "rgba(120,110,160,0.8)", font: { size: 11 } } },
      y: { grid: { color: "rgba(106,90,205,0.08)" }, ticks: { color: "rgba(120,110,160,0.8)", font: { size: 11 } } },
    },
  };

  return (
    <div className="space-y-6">

      {/* ── HERO WELCOME BANNER ── */}
      <div
        className="relative rounded-2xl overflow-hidden p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #6a5acd 0%, #8b5cf6 60%, #a78bfa 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
          style={{ background: "rgba(255,255,255,0.3)" }} />
        <div className="absolute bottom-0 right-24 w-24 h-24 rounded-full opacity-10"
          style={{ background: "rgba(255,255,255,0.5)" }} />

        <div className="relative z-10">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Admin Dashboard</p>
          <h1 className="text-2xl font-extrabold text-white">Welcome back, Admin 👋</h1>
          <p className="text-white/60 text-sm mt-1">
            {stats.total} total appointments · {doctors.length} doctors registered
          </p>
        </div>

        <div className="relative z-10 flex gap-3 shrink-0">
          <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center border border-white/20">
            <p className="text-2xl font-extrabold text-white">{stats.total}</p>
            <p className="text-white/60 text-xs mt-0.5">Appointments</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center border border-white/20">
            <p className="text-2xl font-extrabold text-white">{doctors.length}</p>
            <p className="text-white/60 text-xs mt-0.5">Doctors</p>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total */}
        <div className="rounded-2xl p-5 flex flex-col gap-3"
          style={{ background: "linear-gradient(135deg, #6a5acd, #8b5cf6)", boxShadow: "0 8px 24px rgba(106,90,205,0.30)" }}>
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <CalendarCheck size={16} className="text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-white/70 bg-white/15 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={11} /> 12%
            </span>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">{stats.total}</p>
            <p className="text-white/60 text-xs font-medium mt-0.5">Total Appointments</p>
          </div>
        </div>

        {/* Accepted */}
        <div className="rounded-2xl p-5 flex flex-col gap-3 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
              <TrendingUp size={11} /> 8%
            </span>
          </div>
          <div>
            <p className="text-3xl font-extrabold" style={{ color: "var(--text)" }}>{stats.acceptedPercent}%</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.5 }}>Accepted</p>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl p-5 flex flex-col gap-3 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Clock size={16} className="text-amber-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-amber-500">{stats.requestedPercent}%</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.5 }}>Pending</p>
          </div>
        </div>

        {/* Rejected */}
        <div className="rounded-2xl p-5 flex flex-col gap-3 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <XCircle size={16} className="text-red-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-red-500">{stats.rejectedPercent}%</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.5 }}>Rejected</p>
          </div>
        </div>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar chart */}
        <div className="lg:col-span-2 rounded-2xl p-5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-sm" style={{ color: "var(--text)" }}>Weekly Appointments</h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text)", opacity: 0.4 }}>This week's activity</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
              <TrendingUp size={11} /> +14%
            </span>
          </div>
          <Bar data={barData} options={barOptions} height={90} />
        </div>

        {/* Doughnut */}
        <div className="rounded-2xl p-5 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>Status Breakdown</h2>
          <p className="text-xs mb-4" style={{ color: "var(--text)", opacity: 0.4 }}>Appointment outcomes</p>
          <div className="flex justify-center mb-4">
            <div className="w-36 h-36">
              <Doughnut
                data={doughnutData}
                options={{ plugins: { legend: { display: false } }, cutout: "72%" }}
              />
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Accepted", color: "bg-emerald-500", val: stats.acceptedPercent },
              { label: "Rejected", color: "bg-red-500",     val: stats.rejectedPercent },
              { label: "Pending",  color: "bg-amber-500",   val: stats.requestedPercent },
            ].map(({ label, color, val }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-xs font-medium" style={{ color: "var(--text)", opacity: 0.6 }}>{label}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{val}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;