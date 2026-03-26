import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDoctorStats,
  getDoctorById,
  getAllAppointments,
} from "../service/api";

const Doctor = () => {
  const { id } = useParams();

  const [stats, setStats] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const statsRes = await getDoctorStats(id);
    setStats(statsRes.data);

    const doctorRes = await getDoctorById(id);
    setDoctor(doctorRes.data);

    const appointRes = await getAllAppointments(1, 100);

    const filtered = appointRes.data.data.filter(
      (item) => item.doctorId?._id === id
    );

    setAppointments(filtered);
  };

  if (!stats || !doctor) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* 👨‍⚕️ DOCTOR INFO */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">
          {doctor.name}
        </h1>

        <p>Specialization: {doctor.specialization}</p>
        <p>Experience: {doctor.experience} years</p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-indigo-100 rounded-xl">
          Total: {stats.total}
        </div>

        <div className="p-4 bg-green-100 rounded-xl">
          Accepted: {stats.accepted}
        </div>

        <div className="p-4 bg-red-100 rounded-xl">
          Rejected: {stats.rejected}
        </div>
      </div>

      {/* 📋 APPOINTMENTS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-3">
          Doctor Appointments
        </h2>

        {appointments.map((item) => (
          <div key={item._id} className="border-b py-2">
            <p>👤 {item.patientId?.name}</p>
            <p>
              {item.date} - {item.time}
            </p>
            <p>Status: {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;