import { useEffect, useState } from "react";
// import AppointmentModal from "../components/AppointmentModal";
import DoctorCard from "../components/DoctorCard";
import { getDoctors } from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 👉 IMPORTANT: keep your backend slots state (if already exists)
  const [slots, setSlots] = useState([]); // use your existing if present

  const navigate = useNavigate();

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

  // ✅ FORMAT DATE
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  // 👉 OPTIONAL: If you already have slot API, connect here
  /*
  useEffect(() => {
    if (selectedDoctor && formattedDate) {
      fetchSlots(selectedDoctor._id, formattedDate);
    }
  }, [selectedDoctor, formattedDate]);
  */

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Available Specialists
        </h1>

        {/* 🔹 Doctor List (UNCHANGED) */}
        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onBook={() => setSelectedDoctor(doc)}
            />
          ))}
        </div>

        {/* ✅ SELECTED DOCTOR */}
        {selectedDoctor && (
          <div className="mt-10 p-4 bg-white rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">
              Selected Doctor
            </h2>
            <p className="text-gray-700">
              {selectedDoctor.name} - {selectedDoctor.specialization}
            </p>
          </div>
        )}

        {/* ✅ CALENDAR (FIXED ISSUE HERE) */}
        {selectedDoctor && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              Select Date
            </h2>

            <div className="flex justify-center">
              <Calendar
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null); // reset slot
                }}
                value={selectedDate}
              />
            </div>
          </div>
        )}

        {/* ✅ SLOTS (USE YOUR BACKEND DATA) */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              Available Slots
            </h2>

            <div className="flex flex-wrap justify-center">
              {slots.length > 0 ? (
                slots.map((slot, index) => {
                  const isBooked =
                    slot.isBooked || slot.booked || false;

                  const slotTime = slot.time || slot;

                  return (
                    <button
                      key={index}
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slotTime)}
                      className={`px-4 py-2 m-2 rounded-lg border ${
                        isBooked
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : selectedSlot === slotTime
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-blue-100"
                      }`}
                    >
                      {slotTime}
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-500">
                  No slots available
                </p>
              )}
            </div>
          </div>
        )}

        {/* ✅ NEXT BUTTON */}
        {selectedSlot && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (!selectedDoctor || !selectedDate || !selectedSlot) {
                  alert("Please select doctor, date and slot");
                  return;
                }

                console.log("DATE:", formattedDate); // ✅ check

                navigate("/patient-details", {
                  state: {
                    doctor: selectedDoctor,
                    date: formattedDate,
                    time: selectedSlot,
                  },
                });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AppointmentPage;