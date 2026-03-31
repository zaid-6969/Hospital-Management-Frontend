import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById } from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// JS Date.getDay() returns: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday,
//                           4=Thursday, 5=Friday, 6=Saturday
// This must exactly match the "day" strings stored in your backend
const DAY_NUMBER_MAP = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await getDoctorById(id);
      setDoctor(res.data);
    } catch (err) {
      console.error("Failed to fetch doctor", err);
    }
  };

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Build a Set of available JS day numbers (0-6)
  // e.g. doctor available Monday + Wednesday → Set {1, 3}
  const availableDayNumbers = new Set(
    (doctor.availability || [])
      .map((a) => DAY_NUMBER_MAP[a.day])
      .filter((n) => n !== undefined)
  );

  // Disable tile if: it's in the past OR the weekday isn't in the doctor's schedule
  const tileDisabled = ({ date, view }) => {
    if (view !== "month") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return !availableDayNumbers.has(date.getDay());
  };

  // Add a CSS class to available future dates so we can style them
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date >= today && availableDayNumbers.has(date.getDay())) {
      return "available-day";
    }
    return null;
  };

  // Get the slots array for the chosen date by matching the weekday name
  const getSlotsForDate = (date) => {
    if (!date) return [];

    // date.getDay() gives 0-6; find the matching name string
    const jsDay = date.getDay();
    const dayName = Object.keys(DAY_NUMBER_MAP).find(
      (key) => DAY_NUMBER_MAP[key] === jsDay
    );

    if (!dayName) return [];

    const dayObj = (doctor.availability || []).find(
      (a) => a.day === dayName
    );

    return dayObj ? dayObj.slots : [];
  };

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  const slots = getSlotsForDate(selectedDate);

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot");
      return;
    }
    navigate("/user/patient-details", {
      state: {
        doctor,
        date: formattedDate,
        time: `${selectedSlot.start} - ${selectedSlot.end}`,
      },
    });
  };

  return (
    <div className="bg-bg dark:bg-bg-bg min-h-screen">
      <style>{`
        /* Available weekday highlight */
        .react-calendar .available-day abbr {
          background: #e0e7ff;
          border-radius: 50%;
          color: #4338ca;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
        }

        /* Selected date */
        .react-calendar__tile--active abbr {
          background: #4f46e5 !important;
          color: white !important;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
        }

        /* Today */
        .react-calendar__tile--now:not(.react-calendar__tile--active) abbr {
          background: #fef08a;
          border-radius: 50%;
          color: #713f12;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
        }

        /* Disabled tiles */
        .react-calendar__tile:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          background: transparent !important;
        }

        .react-calendar {
          border: none !important;
          border-radius: 12px;
          width: 100% !important;
          font-family: inherit;
          background: transparent !important;
        }

        .react-calendar__navigation button {
          font-size: 1rem;
          font-weight: 600;
          background: transparent;
        }

        .react-calendar__month-view__weekdays {
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .react-calendar__tile {
          padding: 0.6rem 0;
          text-align: center;
          background: transparent;
        }
      `}</style>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Doctor Profile */}
        <div className="bg-card border border-border border border-border dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 mb-8">
          {doctor.image?.url ? (
            <img
              src={doctor.image.url}
              alt={doctor.name}
              className="w-36 h-36 object-cover rounded-2xl flex-shrink-0"
            />
          ) : (
            <div className="w-36 h-36 bg-indigo-100 dark:bg-indigo-900 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
              👨‍⚕️
            </div>
          )}

          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:bg-card border-r border border-border border border-border">
              {doctor.name}
            </h1>
            <p className="text-indigo-600 font-medium text-lg">
              {doctor.specialization}
            </p>
            <p className="text-text/60 text-sm">
              {doctor.experience} years of experience
            </p>

            {/* Available day badges showing slot count */}
            <div className="flex flex-wrap gap-2 mt-2">
              {(doctor.availability || []).map((a) => (
                <span
                  key={a.day}
                  className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs px-3 py-1 rounded-full font-semibold border border-indigo-200 dark:border-indigo-700"
                >
                  {a.day} · {a.slots?.length || 0} slots
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Calendar */}
          <div className="bg-card border border-border border border-border dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              📅 Select Appointment Date
            </h2>

            {/* Legend */}
            <div className="flex gap-4 text-xs text-text/60 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-indigo-200" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-indigo-600" />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-200" />
                Today
              </span>
            </div>

            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
              value={selectedDate}
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
              minDate={new Date()}
            />

            {selectedDate && (
              <p className="mt-3 text-center text-sm text-text/60 dark:text-gray-400">
                Selected:{" "}
                <span className="font-semibold text-indigo-600">
                  {selectedDate.toDateString()}
                </span>
              </p>
            )}
          </div>

          {/* Time Slots */}
          <div className="bg-card border border-border border border-border dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
              🕐 Available Time Slots
            </h2>

            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center h-52 text-gray-400 gap-3">
                <span className="text-5xl">📆</span>
                <p className="text-sm">Please select a date first</p>
              </div>
            ) : slots.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-52 text-gray-400 gap-3">
                <span className="text-5xl">😔</span>
                <p className="text-sm font-medium">No slots for this day</p>
                <p className="text-xs text-center px-4">
                  Select a highlighted (available) date from the calendar
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-400 dark:text-text/60 mb-3">
                  {slots.length} slot{slots.length !== 1 ? "s" : ""} available
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {slots.map((slot, i) => {
                    const isSelected =
                      selectedSlot?.start === slot.start &&
                      selectedSlot?.end === slot.end;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-150 ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-600 bg-card border-r border border-border border border-border shadow-md scale-105"
                            : "bg-card border border-border border border-border dark:bg-gray-700 bg-card border border-border border border-border dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        }`}
                      >
                        {slot.start} – {slot.end}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Summary + CTA */}
            {selectedSlot && selectedDate && (
              <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                  Appointment Summary
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Doctor:</span> {doctor.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedDate.toDateString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="font-semibold">Time:</span>{" "}
                  {selectedSlot.start} – {selectedSlot.end}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 bg-card border-r border border-border border border-border py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Continue to Patient Details →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDetails;
