import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAllAppointments, getDoctors } from "../service/api";

// ✅ Chart imports
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchStats = async () => {
    const res = await getAdminStats();
    setStats(res.data);
  };

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  const fetchAppointments = async () => {
    const res = await getAllAppointments(1, 20);
    setAppointments(res.data.data);
  };

  if (!stats)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-text/60 text-lg">Loading Dashboard...</p>
      </div>
    );

  // ✅ Pie Chart Data (from backend)
  const pieData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        data: [
          stats.acceptedPercent,
          stats.rejectedPercent,
          stats.requestedPercent,
        ],
        backgroundColor: [
          "#86efac", // green
          "#fca5a5", // red
          "#fde68a", // yellow
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-bg min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-text">Admin Dashboard</h1>
        <p className="text-text/60">Overview of system performance</p>
      </div>

      {/* 🔝 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card border border border-border border border-border rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-sm text-text/60">Total</p>
          <h2 className="text-3xl font-bold mt-2">{stats.total}</h2>
        </div>

        <div className="p-6 bg-card border border border-border border border-border rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-sm text-text/60">Accepted</p>
          <h2 className="text-3xl font-bold mt-2 text-green-500">
            {stats.acceptedPercent}%
          </h2>
        </div>

        <div className="p-6 bg-card border border border-border border border-border rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-sm text-text/60">Rejected</p>
          <h2 className="text-3xl font-bold mt-2 text-red-500">
            {stats.rejectedPercent}%
          </h2>
        </div>

        <div className="p-6 bg-card border border border-border border border-border rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-sm text-text/60">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-500">
            {stats.requestedPercent}%
          </h2>
        </div>
      </div>

      {/* 📊 ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PIE CHART */}
        <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">
            Appointment Overview
          </h2>

          <div className="h-[250px] flex items-center justify-center">
            <Pie data={pieData} />
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-text/60">Doctors</p>
            <h2 className="text-2xl font-bold mt-2">{doctors.length}</h2>
          </div>

          <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-text/60">Appointments</p>
            <h2 className="text-2xl font-bold mt-2">{stats.total}</h2>
          </div>

          <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-text/60">Pending</p>
            <h2 className="text-2xl font-bold mt-2 text-yellow-500">
              {stats.requestedPercent}%
            </h2>
          </div>

          <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-text/60">Rejected</p>
            <h2 className="text-2xl font-bold mt-2 text-red-500">
              {stats.rejectedPercent}%
            </h2>
          </div>
        </div>
      </div>

      {/* 📋 APPOINTMENTS */}
      <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-text">
          Recent Appointments
        </h2>

        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-black/5 border border-border rounded-xl flex justify-between items-center hover:bg-primary/5 transition"
            >
              <div>
                <p className="font-semibold text-text">
                  👤 {item.patientId?.name}
                </p>
                <p className="text-sm text-text/60">
                  👨‍⚕️ {item.doctorId?.name || "Not Assigned"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : item.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 👨‍⚕️ DOCTORS */}
      <div className="bg-card border border border-border border border-border p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-text">Doctors</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => navigate(`/admin/doctor/${doc._id}`)}
              className="p-4 border border-black/5 border border-border rounded-xl cursor-pointer hover:bg-primary/10 transition"
            >
              <h3 className="font-semibold text-text">{doc.name}</h3>
              <p className="text-sm text-text/60">{doc.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
