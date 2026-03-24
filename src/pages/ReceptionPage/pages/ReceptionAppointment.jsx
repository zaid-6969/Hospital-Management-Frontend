import { useEffect, useState } from "react";
// import AppointmentModal from "../components/AppointmentModal";
import DoctorCard from "../components/DoctorCard";
import { getDoctors } from "../services/api";

const ReceptionAppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);


  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Available Specialists
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onBook={() => setSelectedDoctor(doc)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReceptionAppointmentPage;