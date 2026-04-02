import { useEffect, useState } from "react";
import {
  X, ChevronRight, ChevronLeft, Calendar, Clock,
  User, Phone, Activity, CheckCircle, ChevronDown, Stethoscope,
} from "lucide-react";
import { getDoctors, getDoctorById, createAppointment } from "../services/api";

/* ─────────────────────────────────────────
   CONSTANTS & HELPERS
───────────────────────────────────────── */
const DAYS_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAY_MAP    = { Monday:0, Tuesday:1, Wednesday:2, Thursday:3, Friday:4, Saturday:5, Sunday:6 };

function getDatesForDay(dayName) {
  const targetDow = DAY_MAP[dayName];
  const today = new Date(); today.setHours(0,0,0,0);
  const dates = [];
  for (let i = 0; i < 60; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    const dow = (d.getDay() + 6) % 7;
    if (dow === targetDow) dates.push(new Date(d));
  }
  return dates;
}
function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
}
function toISO(date) { return date.toISOString().split("T")[0]; }

/* ─── Step Indicator ─── */
const StepIndicator = ({ step }) => {
  const steps = ["Schedule", "Patient Info", "Confirm"];
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((label, i) => {
        const num = i + 1; const active = step === num; const done = step > num;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={done || active
                  ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white", boxShadow: active ? "0 0 0 4px rgba(106,90,205,0.15)" : "none" }
                  : { background: "rgba(106,90,205,0.1)", color: "#8b5cf6" }}>
                {done ? <CheckCircle size={14} /> : num}
              </div>
              <span className="text-[10px] font-semibold whitespace-nowrap"
                style={{ color: active ? "#6a5acd" : "var(--text)", opacity: active ? 1 : .35 }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 mb-4 transition-all duration-500 rounded-full"
                style={{ background: done ? "linear-gradient(90deg,#6a5acd,#8b5cf6)" : "rgba(106,90,205,0.15)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── Shared input styles ─── */
const iStyle = {
  width:"100%", border:"1px solid var(--border)", borderRadius:12,
  padding:"9px 12px", fontSize:13, background:"var(--bg)", color:"var(--text)", outline:"none",
};
const labelStyle = {
  display:"flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700,
  letterSpacing:"0.05em", textTransform:"uppercase", color:"#8b5cf6", marginBottom:6,
};
const btnPrimary = {
  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
  padding:"10px 20px", borderRadius:12, fontSize:13, fontWeight:700,
  background:"linear-gradient(135deg,#6a5acd,#8b5cf6)", color:"white",
  border:"none", cursor:"pointer", boxShadow:"0 4px 12px rgba(106,90,205,.25)",
};
const btnGhost = {
  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
  padding:"10px 20px", borderRadius:12, fontSize:13, fontWeight:600,
  background:"transparent", color:"#6a5acd", border:"1px solid rgba(106,90,205,.3)", cursor:"pointer",
};

/* ─── Step 1 ─── */
const Step1 = ({ onNext }) => {
  const [doctors, setDoctors]           = useState([]);
  const [selectedDocId, setSelectedDocId] = useState("");
  const [doctor, setDoctor]             = useState(null);
  const [selectedDay, setSelectedDay]   = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots]   = useState([]);
  const [loadingDoc, setLoadingDoc]     = useState(false);

  useEffect(() => { getDoctors().then((r) => setDoctors(r.data)).catch(console.error); }, []);

  useEffect(() => {
    if (!selectedDocId) { setDoctor(null); return; }
    setLoadingDoc(true);
    getDoctorById(selectedDocId).then((r) => setDoctor(r.data)).catch(console.error).finally(() => setLoadingDoc(false));
    setSelectedDay(null); setSelectedDate(null); setSelectedSlot(null);
  }, [selectedDocId]);

  const handleDaySelect = (dayObj) => {
    setSelectedDay(dayObj); setSelectedDate(null); setSelectedSlot(null);
    setAvailableDates(getDatesForDay(dayObj.day));
  };
  const handleDateSelect = async (date) => { setSelectedDate(date); setSelectedSlot(null); setBookedSlots([]); };
  const isSlotBooked = (slot) => bookedSlots.includes(`${slot.start}-${slot.end}`);
  const canProceed = selectedDocId && selectedDay && selectedDate && selectedSlot;

  const pillActive  = { background:"linear-gradient(135deg,#6a5acd,#8b5cf6)", color:"white", border:"1px solid transparent", boxShadow:"0 4px 10px rgba(106,90,205,.25)" };
  const pillInactive= { background:"rgba(106,90,205,0.08)", color:"#6a5acd", border:"1px solid rgba(106,90,205,.2)" };

  return (
    <div className="space-y-5">
      <div>
        <label style={labelStyle}><Stethoscope size={11}/>Select Specialist</label>
        <div className="relative">
          <Stethoscope size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"#8b5cf6" }} />
          <select value={selectedDocId} onChange={(e) => setSelectedDocId(e.target.value)}
            style={{ ...iStyle, paddingLeft:36, appearance:"none", cursor:"pointer" }}>
            <option value="">— Choose a doctor —</option>
            {doctors.map((d) => <option key={d._id} value={d._id}>{d.name}{d.specialization ? ` · ${d.specialization}` : ""}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:"#8b5cf6" }} />
        </div>
      </div>

      {loadingDoc && <p className="text-xs text-center py-2 animate-pulse" style={{ color:"#8b5cf6" }}>Loading doctor schedule…</p>}

      {doctor && (
        <div>
          <label style={labelStyle}><Calendar size={11}/>Available Days</label>
          <div className="flex flex-wrap gap-2">
            {DAYS_ORDER.filter((d) => doctor.availability?.some((a) => a.day === d)).map((dayName) => {
              const dayObj = doctor.availability.find((a) => a.day === dayName);
              const active = selectedDay?.day === dayName;
              return (
                <button key={dayName} onClick={() => handleDaySelect(dayObj)}
                  className="px-3 py-1.5 rounded text-xs font-semibold transition-all duration-200"
                  style={active ? pillActive : pillInactive}>
                  {dayName.slice(0,3)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedDay && (
        <div>
          <label style={labelStyle}><Calendar size={11}/>Pick a Date</label>
          <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1" style={{ scrollbarWidth:"thin" }}>
            {availableDates.map((date) => {
              const isSelected = selectedDate && toISO(date) === toISO(selectedDate);
              const isPast = date < new Date();
              return (
                <button key={toISO(date)} disabled={isPast} onClick={() => handleDateSelect(date)}
                  className="flex flex-col items-center py-2 px-1 rounded border text-xs font-semibold transition-all duration-200"
                  style={isPast
                    ? { opacity:.3, cursor:"not-allowed", background:"var(--bg)", border:"1px solid var(--border)", color:"var(--text)" }
                    : isSelected ? pillActive
                    : { background:"rgba(106,90,205,0.06)", color:"#6a5acd", border:"1px solid rgba(106,90,205,.15)" }}>
                  <span className="text-[10px] opacity-70">{date.toLocaleDateString("en-GB", { month:"short" })}</span>
                  <span className="text-base font-bold leading-tight">{date.getDate()}</span>
                  <span className="text-[9px] opacity-60">{date.toLocaleDateString("en-GB", { weekday:"short" })}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedDate && selectedDay && (
        <div>
          <label style={labelStyle}><Clock size={11}/>Available Slots</label>
          <div className="grid grid-cols-3 gap-2">
            {selectedDay.slots?.map((slot, i) => {
              const booked = isSlotBooked(slot); const active = selectedSlot === slot;
              return (
                <button key={i} disabled={booked} onClick={() => setSelectedSlot(slot)}
                  className="py-2 px-2 rounded text-xs font-semibold border transition-all duration-200 relative"
                  style={booked
                    ? { background:"rgba(239,68,68,0.08)", color:"#dc2626", border:"1px solid rgba(239,68,68,.2)", cursor:"not-allowed", textDecoration:"line-through", opacity:.6 }
                    : active ? pillActive
                    : { background:"rgba(34,197,94,0.08)", color:"#16a34a", border:"1px solid rgba(34,197,94,.2)" }}>
                  {slot.start}<span style={{ opacity:.6 }}> – </span>{slot.end}
                  {booked && <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-red-400 text-white px-1 rounded-full">Full</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedSlot && selectedDate && (
        <div className="flex items-center gap-3 px-4 py-3 rounded"
          style={{ background:"rgba(106,90,205,0.08)", border:"1px solid rgba(106,90,205,.2)" }}>
          <CheckCircle size={15} style={{ color:"#6a5acd", flexShrink:0 }} />
          <p className="text-xs font-medium" style={{ color:"#6a5acd" }}>
            <span className="font-bold">{doctor?.name}</span> · {formatDate(selectedDate)} · {selectedSlot.start}–{selectedSlot.end}
          </p>
        </div>
      )}

      <button disabled={!canProceed} onClick={() => onNext({ doctor, selectedDay, selectedDate, selectedSlot })}
        style={{ ...btnPrimary, width:"100%", opacity: canProceed ? 1 : 0.4, cursor: canProceed ? "pointer" : "not-allowed" }}>
        Continue to Patient Details <ChevronRight size={15} />
      </button>
    </div>
  );
};

/* ─── Step 2 ─── */
const Step2 = ({ schedule, onNext, onBack }) => {
  const [form, setForm] = useState({ name:"", phone:"", age:"", gender:"", symptoms:"" });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const valid = form.name.trim() && form.phone.trim() && form.age.trim() && form.gender && form.symptoms.trim();

  const pillActive  = { background:"linear-gradient(135deg,#6a5acd,#8b5cf6)", color:"white", border:"1px solid transparent" };
  const pillInactive= { background:"rgba(106,90,205,0.08)", color:"#6a5acd", border:"1px solid rgba(106,90,205,.2)" };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-4 py-3 rounded"
        style={{ background:"rgba(106,90,205,0.08)", border:"1px solid rgba(106,90,205,.2)" }}>
        <Calendar size={13} style={{ color:"#8b5cf6", flexShrink:0 }} />
        <p className="text-xs font-medium" style={{ color:"#6a5acd" }}>
          <span className="font-bold">{schedule.doctor?.name}</span>
          {" · "}{formatDate(schedule.selectedDate)}{" · "}{schedule.selectedSlot.start}–{schedule.selectedSlot.end}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={labelStyle}><User size={10}/>Full Name</label>
          <div className="relative">
            <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"#8b5cf6" }} />
            <input style={{ ...iStyle, paddingLeft:32 }} placeholder="Arjun Mehta" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
        </div>
        <div>
          <label style={labelStyle}><Phone size={10}/>Phone</label>
          <div className="relative">
            <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"#8b5cf6" }} />
            <input style={{ ...iStyle, paddingLeft:32 }} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={labelStyle}>Age</label>
          <input type="number" style={iStyle} placeholder="28" min={1} max={120} value={form.age} onChange={(e) => set("age", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Gender</label>
          <div className="flex gap-2">
            {["Male","Female","Other"].map((g) => (
              <button key={g} onClick={() => set("gender", g)}
                className="flex-1 py-2 rounded text-xs font-semibold border transition-all"
                style={form.gender === g ? pillActive : pillInactive}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label style={labelStyle}><Activity size={10}/>Symptoms / Reason</label>
        <textarea rows={3} style={{ ...iStyle, resize:"none" }} placeholder="Describe the patient's symptoms…" value={form.symptoms} onChange={(e) => set("symptoms", e.target.value)} />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} style={{ ...btnGhost, flex:1 }}><ChevronLeft size={14}/>Back</button>
        <button disabled={!valid} onClick={() => onNext({ ...schedule, patient: form })}
          style={{ ...btnPrimary, flex:1, opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed" }}>
          Review & Confirm <ChevronRight size={14}/>
        </button>
      </div>
    </div>
  );
};

/* ─── Step 3 ─── */
const Step3 = ({ data, onBack, onClose, onSuccess }) => {
  const [booking, setBooking] = useState(false);
  const [done, setDone]       = useState(false);

  const handleBook = async () => {
    setBooking(true);
    try {
      await createAppointment({
        doctorId: data.doctor._id, day: data.selectedDay.day, date: toISO(data.selectedDate),
        start: data.selectedSlot.start, end: data.selectedSlot.end,
        patientName: data.patient.name, patientPhone: data.patient.phone,
        age: data.patient.age, gender: data.patient.gender, symptoms: data.patient.symptoms,
      });
      setDone(true);
      setTimeout(() => { onSuccess?.(); onClose(); }, 1800);
    } catch (err) { alert(err.response?.data?.message || "Booking failed. Please try again."); }
    finally { setBooking(false); }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background:"rgba(34,197,94,0.12)" }}>
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <div>
          <h3 className="text-base font-bold" style={{ color:"var(--text)" }}>Appointment Booked!</h3>
          <p className="text-xs mt-1" style={{ color:"var(--text)", opacity:.5 }}>
            {data.patient.name}'s appointment has been confirmed.
          </p>
        </div>
      </div>
    );
  }

  const rows = [
    ["Doctor", data.doctor?.name], ["Specialization", data.doctor?.specialization],
    ["Date", formatDate(data.selectedDate)], ["Day", data.selectedDay.day],
    ["Time", `${data.selectedSlot.start} – ${data.selectedSlot.end}`],
    ["Patient", data.patient.name], ["Phone", data.patient.phone],
    ["Age / Gender", `${data.patient.age} yrs · ${data.patient.gender}`],
    ["Symptoms", data.patient.symptoms],
  ];

  return (
    <div className="space-y-4">
      <div className="rounded overflow-hidden"
        style={{ background:"rgba(106,90,205,0.04)", border:"1px solid rgba(106,90,205,.12)" }}>
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between items-start px-4 py-2.5 gap-4"
            style={{ borderBottom:"1px solid rgba(106,90,205,0.08)" }}>
            <span className="text-[10px] font-bold uppercase tracking-wide w-32 shrink-0" style={{ color:"#8b5cf6" }}>{label}</span>
            <span className="text-xs text-right font-medium" style={{ color:"var(--text)" }}>{value || "—"}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} style={{ ...btnGhost, flex:1 }}><ChevronLeft size={14}/>Back</button>
        <button onClick={handleBook} disabled={booking}
          style={{ ...btnPrimary, flex:1, opacity: booking ? 0.6 : 1, cursor: booking ? "not-allowed" : "pointer" }}>
          {booking
            ? <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"/>Booking…</span>
            : <>Confirm Booking <CheckCircle size={14}/></>}
        </button>
      </div>
    </div>
  );
};

/* ─── Main Modal ─── */
const BookingModal = ({ onClose, onSuccess }) => {
  const [step, setStep]               = useState(1);
  const [scheduleData, setScheduleData] = useState(null);
  const [allData, setAllData]         = useState(null);
  const TITLES = ["Book Appointment", "Patient Details", "Confirm Booking"];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="w-full rounded shadow-2xl overflow-hidden flex flex-col"
        style={{ maxWidth:520, maxHeight:"90vh", background:"var(--card)", border:"1px solid var(--border)" }}>

        {/* Purple accent line */}
        <div className="h-0.5 w-full shrink-0" style={{ background:"linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom:"1px solid var(--border)" }}>
          <div>
            <h2 className="text-sm font-bold" style={{ color:"var(--text)" }}>{TITLES[step - 1]}</h2>
            <p className="text-xs mt-0.5" style={{ color:"var(--text)", opacity:.4 }}>Reception · New Appointment</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition"
            style={{ background:"rgba(106,90,205,.12)", color:"#6a5acd" }}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1" style={{ scrollbarWidth:"thin" }}>
          <StepIndicator step={step} />

          {step === 1 && <Step1 onNext={(d) => { setScheduleData(d); setStep(2); }} />}
          {step === 2 && <Step2 schedule={scheduleData} onBack={() => setStep(1)} onNext={(d) => { setAllData(d); setStep(3); }} />}
          {step === 3 && <Step3 data={allData} onBack={() => setStep(2)} onClose={onClose} onSuccess={onSuccess} />}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
