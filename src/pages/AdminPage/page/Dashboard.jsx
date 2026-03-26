import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminStats,
  getAllAppointments,
  getDoctors,
} from "../service/api";

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

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* 🔝 STATS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 bg-indigo-100 rounded-xl">
          Total: {stats.total}
        </div>

        <div className="p-5 bg-green-100 rounded-xl">
          Accepted: {stats.acceptedPercent}%
        </div>

        <div className="p-5 bg-red-100 rounded-xl">
          Rejected: {stats.rejectedPercent}%
        </div>

        <div className="p-5 bg-yellow-100 rounded-xl">
          Requested: {stats.requestedPercent}%
        </div>
      </div>

      {/* 📋 APPOINTMENTS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          All Appointments
        </h2>

        {appointments.map((item) => (
          <div key={item._id} className="border-b py-2">
            <p>👤 {item.patientId?.name}</p>
            <p>👨‍⚕️ {item.doctorId?.name || "Not Assigned"}</p>
            <p>Status: {item.status}</p>
          </div>
        ))}
      </div>

      {/* 👨‍⚕️ DOCTORS */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Doctors
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() =>
                navigate(`/admin/doctor/${doc._id}`)
              }
              className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-indigo-50"
            >
              <h3 className="font-bold">{doc.name}</h3>
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