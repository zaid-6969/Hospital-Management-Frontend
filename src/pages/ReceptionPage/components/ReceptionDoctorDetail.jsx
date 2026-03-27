import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorById } from "../services/api";
import { createAppointment } from "../services/api";

const ReceptionDoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    const res = await getDoctorById(id);
    setDoctor(res.data);
  };

  if (!doctor) return <p className="p-10">Loading...</p>;

  const handleBook = async () => {
    try {
      await createAppointment({
        doctorId: doctor._id,
        day: selectedDay.day,
        start: selectedSlot.start,
        end: selectedSlot.end,
      });

      alert("Appointment booked ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen p-10">
      <div className="grid md:grid-cols-3 gap-10">
        {/* LEFT */}
        <img src={doctor.image?.url} className="rounded-2xl" />

        {/* CENTER */}
        <div>
          <h1 className="text-3xl font-bold">{doctor.name}</h1>
          <p className="text-gray-500">{doctor.specialization}</p>
        </div>

        {/* RIGHT (BOOKING CARD) */}
        <div className="bg-card p-6 rounded-2xl shadow space-y-4">
          <h3 className="font-semibold">Reserve a Session</h3>

          {/* 🔥 DAYS */}
          <div>
            <p className="text-sm font-medium mb-2">Select Day</p>

            <div className="flex flex-wrap gap-2">
              {doctor.availability.map((dayObj) => (
                <button
                  key={dayObj.day}
                  onClick={() => {
                    setSelectedDay(dayObj);
                    setSelectedSlot(null);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    selectedDay?.day === dayObj.day
                      ? "bg-indigo-600 text-white"
                      : "bg-bg"
                  }`}
                >
                  {dayObj.day}
                </button>
              ))}
            </div>
          </div>

          {/* 🔥 SLOTS */}
          {selectedDay && (
            <div>
              <p className="text-sm font-medium mb-2">Select Time</p>

              <div className="flex flex-wrap gap-2">
                {selectedDay.slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedSlot === slot
                        ? "bg-indigo-600 text-white"
                        : "bg-bg"
                    }`}
                  >
                    {slot.start} - {slot.end}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleBook}
            disabled={!selectedSlot}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDoctorDetails;
