import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminStats,
  getAllAppointments,
  getDoctors,
} from "../service/api";

// ✅ Chart imports
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
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
        <p className="text-gray-500 text-lg">Loading Dashboard...</p>
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
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      {/* 🔝 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-indigo-100 rounded-2xl shadow">
          <p className="text-sm text-gray-600">Total</p>
          <h2 className="text-2xl font-bold mt-2">
            {stats.total}
          </h2>
        </div>

        <div className="p-6 bg-green-100 rounded-2xl shadow">
          <p className="text-sm text-gray-600">Accepted</p>
          <h2 className="text-2xl font-bold mt-2">
            {stats.acceptedPercent}%
          </h2>
        </div>

        <div className="p-6 bg-red-100 rounded-2xl shadow">
          <p className="text-sm text-gray-600">Rejected</p>
          <h2 className="text-2xl font-bold mt-2">
            {stats.rejectedPercent}%
          </h2>
        </div>

        <div className="p-6 bg-yellow-100 rounded-2xl shadow">
          <p className="text-sm text-gray-600">Pending</p>
          <h2 className="text-2xl font-bold mt-2">
            {stats.requestedPercent}%
          </h2>
        </div>
      </div>

      {/* 📊 ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Appointment Overview
          </h2>

          <div className="h-[250px] flex items-center justify-center">
            <Pie data={pieData} />
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-indigo-100 p-6 rounded-2xl shadow">
            <p className="text-sm text-gray-600">Doctors</p>
            <h2 className="text-2xl font-bold mt-2">
              {doctors.length}
            </h2>
          </div>

          <div className="bg-green-100 p-6 rounded-2xl shadow">
            <p className="text-sm text-gray-600">Appointments</p>
            <h2 className="text-2xl font-bold mt-2">
              {stats.total}
            </h2>
          </div>

          <div className="bg-yellow-100 p-6 rounded-2xl shadow">
            <p className="text-sm text-gray-600">Pending</p>
            <h2 className="text-2xl font-bold mt-2">
              {stats.requestedPercent}%
            </h2>
          </div>

          <div className="bg-red-100 p-6 rounded-2xl shadow">
            <p className="text-sm text-gray-600">Rejected</p>
            <h2 className="text-2xl font-bold mt-2">
              {stats.rejectedPercent}%
            </h2>
          </div>
        </div>
      </div>

      {/* 📋 APPOINTMENTS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recent Appointments
        </h2>

        <div className="space-y-4 max-h-[350px] overflow-y-auto">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold">
                  👤 {item.patientId?.name}
                </p>
                <p className="text-sm text-gray-500">
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
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Doctors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() =>
                navigate(`/admin/doctor/${doc._id}`)
              }
              className="p-4 border rounded-xl cursor-pointer hover:bg-indigo-50"
            >
              <h3 className="font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-500">
                {doc.specialization}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;