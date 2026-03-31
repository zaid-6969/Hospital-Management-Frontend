import { useEffect, useState } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Activity,
  CheckCircle,
  ChevronDown,
  Stethoscope,
} from "lucide-react";
import { getDoctors, getDoctorById, createAppointment } from "../services/api";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const DAYS_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAY_MAP = { Monday:0, Tuesday:1, Wednesday:2, Thursday:3, Friday:4, Saturday:5, Sunday:6 };

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */

// Get all dates for a given day-of-week in current + next month
function getDatesForDay(dayName) {
  const targetDow = DAY_MAP[dayName]; // 0=Mon
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = [];

  // scan 60 days ahead
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // JS getDay: 0=Sun,1=Mon...6=Sat  →  convert
    const dow = (d.getDay() + 6) % 7; // Mon=0
    if (dow === targetDow) dates.push(new Date(d));
  }
  return dates;
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function toISO(date) {
  return date.toISOString().split("T")[0];
}

/* ─────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────── */
const StepIndicator = ({ step }) => {
  const steps = ["Schedule", "Patient Info", "Confirm"];
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = step === num;
        const done = step > num;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${done ? "bg-violet-600 bg-card border-r border border-border border border-border" : active ? "bg-violet-600 bg-card border-r border border-border border border-border ring-4 ring-violet-100" : "bg-violet-100 text-violet-400"}`}
              >
                {done ? <CheckCircle size={14} /> : num}
              </div>
              <span className={`text-[10px] font-semibold whitespace-nowrap ${active ? "text-violet-700" : "text-violet-300"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all duration-500 ${done ? "bg-violet-600" : "bg-violet-100"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────
   STEP 1 — Doctor · Date · Slot
───────────────────────────────────────── */
const Step1 = ({ onNext }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);   // availability dayObj
  const [availableDates, setAvailableDates] = useState([]); // Date[]
  const [selectedDate, setSelectedDate] = useState(null); // Date
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);     // ["09:00-10:00", ...]
  const [loadingDoc, setLoadingDoc] = useState(false);

  // Fetch doctor list
  useEffect(() => {
    getDoctors().then((r) => setDoctors(r.data)).catch(console.error);
  }, []);

  // Fetch doctor details when doctor selected
  useEffect(() => {
    if (!selectedDocId) { setDoctor(null); return; }
    setLoadingDoc(true);
    getDoctorById(selectedDocId)
      .then((r) => setDoctor(r.data))
      .catch(console.error)
      .finally(() => setLoadingDoc(false));
    setSelectedDay(null);
    setSelectedDate(null);
    setSelectedSlot(null);
  }, [selectedDocId]);

  // When day chosen, compute upcoming dates for that weekday
  const handleDaySelect = (dayObj) => {
    setSelectedDay(dayObj);
    setSelectedDate(null);
    setSelectedSlot(null);
    const dates = getDatesForDay(dayObj.day);
    setAvailableDates(dates);
  };

  // When date chosen, fetch booked slots for that date + doctor
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    // Try to get booked slots — if your API has an endpoint, call it here.
    // For now we leave bookedSlots empty (all slots available).
    // If you have: GET /appointments/booked?doctorId=&date=  →  uncomment below:
    // try {
    //   const r = await getBookedSlots(selectedDocId, toISO(date));
    //   setBookedSlots(r.data.slots ?? []);
    // } catch { setBookedSlots([]); }
    setBookedSlots([]);
  };

  const isSlotBooked = (slot) =>
    bookedSlots.includes(`${slot.start}-${slot.end}`);

  const canProceed = selectedDocId && selectedDay && selectedDate && selectedSlot;

  return (
    <div className="space-y-5">
      {/* Doctor Dropdown */}
      <div>
        <label className="bm-label">Select Specialist</label>
        <div className="relative">
          <Stethoscope size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400" />
          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            className="bm-select pl-9"
          >
            <option value="">— Choose a doctor —</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} {d.specialization ? `· ${d.specialization}` : ""}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none" />
        </div>
      </div>

      {loadingDoc && (
        <p className="text-xs text-violet-400 text-center py-2 animate-pulse">Loading doctor schedule…</p>
      )}

      {/* Day picker */}
      {doctor && (
        <div>
          <label className="bm-label flex items-center gap-1.5">
            <Calendar size={12} /> Available Days
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS_ORDER.filter((d) =>
              doctor.availability?.some((a) => a.day === d)
            ).map((dayName) => {
              const dayObj = doctor.availability.find((a) => a.day === dayName);
              const active = selectedDay?.day === dayName;
              return (
                <button
                  key={dayName}
                  onClick={() => handleDaySelect(dayObj)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200
                    ${active
                      ? "bg-violet-600 bg-card border-r border border-border border border-border border-violet-600 shadow-md shadow-violet-200"
                      : "bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100"}`}
                >
                  {dayName.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar Date Picker */}
      {selectedDay && (
        <div>
          <label className="bm-label flex items-center gap-1.5">
            <Calendar size={12} /> Pick a Date
          </label>
          <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1 bm-scroll">
            {availableDates.map((date) => {
              const isSelected = selectedDate && toISO(date) === toISO(selectedDate);
              const isPast = date < new Date();
              return (
                <button
                  key={toISO(date)}
                  disabled={isPast}
                  onClick={() => handleDateSelect(date)}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl border text-xs font-semibold transition-all duration-200
                    ${isPast
                      ? "opacity-30 cursor-not-allowed bg-gray-50 bg-card border border-border border border-border text-gray-400"
                      : isSelected
                      ? "bg-violet-600 bg-card border-r border border-border border border-border border-violet-600 shadow-md shadow-violet-200"
                      : "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100"}`}
                >
                  <span className="text-[10px] font-normal opacity-70">
                    {date.toLocaleDateString("en-GB", { month: "short" })}
                  </span>
                  <span className="text-base font-bold leading-tight">
                    {date.getDate()}
                  </span>
                  <span className="text-[9px] opacity-60">
                    {date.toLocaleDateString("en-GB", { weekday: "short" })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Slot picker */}
      {selectedDate && selectedDay && (
        <div>
          <label className="bm-label flex items-center gap-1.5">
            <Clock size={12} /> Available Slots
          </label>
          <div className="grid grid-cols-3 gap-2">
            {selectedDay.slots?.map((slot, i) => {
              const booked = isSlotBooked(slot);
              const active = selectedSlot === slot;
              return (
                <button
                  key={i}
                  disabled={booked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all duration-200 relative
                    ${booked
                      ? "bg-red-50 text-red-300 border-red-100 cursor-not-allowed line-through opacity-60"
                      : active
                      ? "bg-violet-600 bg-card border-r border border-border border border-border border-violet-600 shadow-md shadow-violet-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"}`}
                >
                  {slot.start}
                  <span className="opacity-60"> – </span>
                  {slot.end}
                  {booked && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-red-400 bg-card border-r border border-border border border-border px-1 rounded-full">
                      Full
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedDay.slots?.every(isSlotBooked) && (
            <p className="text-xs text-red-400 text-center mt-2 font-medium">
              All slots are booked for this date. Please pick another date.
            </p>
          )}
        </div>
      )}

      {/* Summary pill */}
      {selectedSlot && selectedDate && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <CheckCircle size={16} className="text-violet-500 shrink-0" />
          <p className="text-xs text-violet-700 font-medium">
            <span className="font-bold">{doctor?.name}</span> · {formatDate(selectedDate)} · {selectedSlot.start}–{selectedSlot.end}
          </p>
        </div>
      )}

      <button
        disabled={!canProceed}
        onClick={() =>
          onNext({ doctor, selectedDay, selectedDate, selectedSlot })
        }
        className="bm-btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Patient Details <ChevronRight size={15} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────
   STEP 2 — Patient Details
───────────────────────────────────────── */
const Step2 = ({ schedule, onNext, onBack }) => {
  const [form, setForm] = useState({
    name: "", phone: "", age: "", gender: "", symptoms: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const valid =
    form.name.trim() &&
    form.phone.trim() &&
    form.age.trim() &&
    form.gender &&
    form.symptoms.trim();

  return (
    <div className="space-y-4">

      {/* Booking summary banner */}
      <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <Calendar size={14} className="text-violet-400 shrink-0" />
        <p className="text-xs text-violet-600 font-medium">
          <span className="font-bold text-violet-700">{schedule.doctor?.name}</span>
          {" · "}{formatDate(schedule.selectedDate)}
          {" · "}{schedule.selectedSlot.start}–{schedule.selectedSlot.end}
        </p>
      </div>

      {/* Name + Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="bm-label">Full Name</label>
          <div className="relative">
            <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400" />
            <input
              className="bm-input pl-8"
              placeholder="Arjun Mehta"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="bm-label">Phone</label>
          <div className="relative">
            <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400" />
            <input
              className="bm-input pl-8"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="bm-label">Age</label>
          <input
            type="number"
            className="bm-input"
            placeholder="28"
            min={1} max={120}
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
          />
        </div>
        <div>
          <label className="bm-label">Gender</label>
          <div className="flex gap-2">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                onClick={() => set("gender", g)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all
                  ${form.gender === g
                    ? "bg-violet-600 bg-card border-r border border-border border border-border border-violet-600"
                    : "bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100"}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="bm-label flex items-center gap-1.5">
          <Activity size={12} /> Symptoms / Reason
        </label>
        <textarea
          rows={3}
          className="bm-input resize-none"
          placeholder="Describe the patient's symptoms or reason for visit…"
          value={form.symptoms}
          onChange={(e) => set("symptoms", e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="bm-btn-ghost flex-1">
          <ChevronLeft size={15} /> Back
        </button>
        <button
          disabled={!valid}
          onClick={() => onNext({ ...schedule, patient: form })}
          className="bm-btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review & Confirm <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   STEP 3 — Confirm
───────────────────────────────────────── */
const Step3 = ({ data, onBack, onClose, onSuccess }) => {
  const [booking, setBooking] = useState(false);
  const [done, setDone] = useState(false);

  const handleBook = async () => {
    setBooking(true);
    try {
      await createAppointment({
        doctorId: data.doctor._id,
        day: data.selectedDay.day,
        date: toISO(data.selectedDate),
        start: data.selectedSlot.start,
        end: data.selectedSlot.end,
        patientName: data.patient.name,
        patientPhone: data.patient.phone,
        age: data.patient.age,
        gender: data.patient.gender,
        symptoms: data.patient.symptoms,
      });
      setDone(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1800);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce-once">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Appointment Booked!</h3>
          <p className="text-sm text-text/60 mt-1">
            {data.patient.name}'s appointment has been confirmed.
          </p>
        </div>
      </div>
    );
  }

  const rows = [
    ["Doctor", data.doctor?.name],
    ["Specialization", data.doctor?.specialization],
    ["Date", formatDate(data.selectedDate)],
    ["Day", data.selectedDay.day],
    ["Time", `${data.selectedSlot.start} – ${data.selectedSlot.end}`],
    ["Patient", data.patient.name],
    ["Phone", data.patient.phone],
    ["Age / Gender", `${data.patient.age} yrs · ${data.patient.gender}`],
    ["Symptoms", data.patient.symptoms],
  ];

  return (
    <div className="space-y-4">
      <div className="bg-violet-50 border border-violet-100 rounded-2xl overflow-hidden divide-y divide-violet-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between items-start px-4 py-2.5 gap-4">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wide w-32 shrink-0">
              {label}
            </span>
            <span className="text-xs text-gray-700 text-right font-medium">{value || "—"}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="bm-btn-ghost flex-1">
          <ChevronLeft size={15} /> Back
        </button>
        <button
          onClick={handleBook}
          disabled={booking}
          className="bm-btn-primary flex-1 disabled:opacity-60"
        >
          {booking ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking…
            </span>
          ) : (
            <>Confirm Booking <CheckCircle size={15} /></>
          )}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN MODAL
───────────────────────────────────────── */
const BookingModal = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [scheduleData, setScheduleData] = useState(null);
  const [allData, setAllData] = useState(null);

  const TITLES = [
    "Book Appointment",
    "Patient Details",
    "Confirm Booking",
  ];

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        .bm-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 6px;
        }
        .bm-input {
          width: 100%;
          border: 1px solid #ddd6fe;
          border-radius: 12px;
          padding: 9px 12px;
          font-size: 13px;
          background: rgba(245,243,255,0.5);
          color: #1e1b4b;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .bm-input::placeholder { color: #c4b5fd; }
        .bm-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.08); }
        .bm-select {
          width: 100%;
          appearance: none;
          border: 1px solid #ddd6fe;
          border-radius: 12px;
          padding: 9px 12px;
          font-size: 13px;
          background: rgba(245,243,255,0.5);
          color: #1e1b4b;
          outline: none;
          cursor: pointer;
        }
        .bm-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          background: #7c3aed;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          box-shadow: 0 4px 12px rgba(124,58,237,0.25);
        }
        .bm-btn-primary:hover:not(:disabled) { background: #6d28d9; transform: translateY(-1px); }
        .bm-btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          background: transparent;
          color: #7c3aed;
          border: 1px solid #ddd6fe;
          cursor: pointer;
          transition: background 0.2s;
        }
        .bm-btn-ghost:hover { background: #f5f3ff; }
        .bm-scroll::-webkit-scrollbar { width: 4px; }
        .bm-scroll::-webkit-scrollbar-thumb { background: #ddd6fe; border-radius: 4px; }
      `}</style>

      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <div
          className="bg-card border border-border border border-border rounded-2xl w-full shadow-2xl shadow-violet-100 border border-violet-100 overflow-hidden flex flex-col"
          style={{ maxWidth: 520, maxHeight: "90vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-violet-100 bg-violet-50/60 shrink-0">
            <div>
              <h2 className="text-base font-bold text-violet-700">{TITLES[step - 1]}</h2>
              <p className="text-xs text-violet-400 mt-0.5">Reception · New Appointment</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 text-violet-400 hover:bg-violet-200 hover:text-violet-600 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 overflow-y-auto flex-1 bm-scroll">
            <StepIndicator step={step} />

            {step === 1 && (
              <Step1
                onNext={(data) => {
                  setScheduleData(data);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && (
              <Step2
                schedule={scheduleData}
                onBack={() => setStep(1)}
                onNext={(data) => {
                  setAllData(data);
                  setStep(3);
                }}
              />
            )}

            {step === 3 && (
              <Step3
                data={allData}
                onBack={() => setStep(2)}
                onClose={onClose}
                onSuccess={onSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;