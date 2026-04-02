import { useEffect, useState, useRef } from "react";
import DoctorCard from "../components/DoctorCard";
import {
  getDoctors,
  getMyAppointments,
  deleteMyAppointment,
} from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Stethoscope,
  CalendarDays,
  Clock,
  ChevronRight,
  CheckCircle2,
  Loader2,
  CalendarCheck,
  Bell,
  CheckCircle,
  XCircle,
  Hourglass,
  RefreshCw,
} from "lucide-react";

// ── Calendar CSS override ─────────────────────────────────────
const calStyle = `
  .appt-cal { width:100%; background:transparent; border:none; font-family:inherit; }
  .appt-cal .react-calendar__navigation { display:flex; align-items:center; margin-bottom:12px; gap:4px; }
  .appt-cal .react-calendar__navigation button {
    min-width:36px; height:36px; background:rgba(109,40,217,0.08);
    border:1px solid rgba(109,40,217,0.15); border-radius:10px;
    color:var(--text); font-size:13px; font-weight:700; transition:all .15s; cursor:pointer;
  }
  .appt-cal .react-calendar__navigation button:hover { background:rgba(109,40,217,0.18); }
  .appt-cal .react-calendar__navigation__label {
    flex-grow:1; font-size:14px; font-weight:800;
    color:var(--text); background:transparent!important; border:none!important;
  }
  .appt-cal .react-calendar__month-view__weekdays { text-align:center; margin-bottom:4px; }
  .appt-cal .react-calendar__month-view__weekdays__weekday { padding:4px 0; }
  .appt-cal .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration:none; font-size:11px; font-weight:700;
    color:var(--text); opacity:.35; text-transform:uppercase; letter-spacing:.05em;
  }
  .appt-cal .react-calendar__tile {
    aspect-ratio:1; display:flex; align-items:center; justify-content:center;
    border-radius:10px; font-size:13px; font-weight:600;
    color:var(--text); background:transparent; border:none;
    transition:all .15s; cursor:pointer; padding:6px 2px;
  }
  .appt-cal .react-calendar__tile:hover { background:rgba(109,40,217,0.10); }
  .appt-cal .react-calendar__tile--now {
    background:rgba(109,40,217,0.12)!important;
    border:1px solid rgba(109,40,217,0.25)!important;
    color:#7c3aed!important; font-weight:800;
  }
  .appt-cal .react-calendar__tile--active,
  .appt-cal .react-calendar__tile--active:hover {
    background:linear-gradient(135deg,#7c3aed,#8b5cf6)!important;
    color:white!important; box-shadow:0 4px 12px rgba(124,58,237,.35);
  }
  .appt-cal .react-calendar__month-view__days__day--neighboringMonth { opacity:.25; }
`;

const STEPS = ["Choose Doctor", "Pick Date", "Select Slot", "Confirm"];

const STATUS_CFG = {
  ACCEPTED: {
    label: "Accepted",
    color: "#16a34a",
    bg: "rgba(34,197,94,0.10)",
    border: "rgba(34,197,94,0.25)",
    icon: CheckCircle,
    alert: "✅ Your appointment has been accepted by the doctor!",
  },
  REJECTED: {
    label: "Rejected",
    color: "#dc2626",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.25)",
    icon: XCircle,
    alert: "❌ Your appointment was rejected. Please book another slot.",
  },
  REQUESTED: {
    label: "Pending",
    color: "#ca8a04",
    bg: "rgba(234,179,8,0.10)",
    border: "rgba(234,179,8,0.25)",
    icon: Hourglass,
    alert: null,
  },
};

// ── Toast component ───────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === "ACCEPTED";
  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl max-w-sm animate-slideIn"
      style={{
        background: isSuccess ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
        border: `1px solid ${isSuccess ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle size={18} style={{ color: "#16a34a" }} />
        ) : (
          <XCircle size={18} style={{ color: "#dc2626" }} />
        )}
      </div>
      <div className="flex-1">
        <p
          className="text-sm font-bold"
          style={{ color: isSuccess ? "#16a34a" : "#dc2626" }}
        >
          {isSuccess ? "Appointment Accepted!" : "Appointment Rejected"}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "var(--text)", opacity: 0.7 }}
        >
          {isSuccess
            ? "Your booking has been confirmed by the doctor."
            : "The doctor has declined your request. Please rebook."}
        </p>
      </div>
      <button
        onClick={onClose}
        className="shrink-0 text-lg leading-none opacity-40 hover:opacity-80"
        style={{ color: "var(--text)" }}
      >
        ✕
      </button>
    </div>
  );
};

const AppointmentPage = () => {
  const [activeTab, setActiveTab] = useState("book");
  const [doctors, setDoctors] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [newCount, setNewCount] = useState(0); // unread status changes
  const prevStatuses = useRef({}); // track previous statuses

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return;

    const dayName = selectedDate
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase()
      .trim();

    const availability = selectedDoctor.availability?.find((a) =>
      a.day?.toLowerCase().includes(dayName.slice(0, 3)),
    );

    if (!availability) {
      setSlots([]);
      return;
    }

    const generatedSlots = availability.slots.map(
      (slot) => `${slot.start} - ${slot.end}`,
    );

    setSlots(generatedSlots);
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    fetchDoctors();
    fetchMyAppointments();

    // ── Poll every 15s for status changes ────────────────────
    const interval = setInterval(fetchMyAppointments, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const res = await getDoctors();
      const list = Array.isArray(res.data)
        ? res.data
        : (res.data?.doctors ?? res.data?.data ?? []);
      setDoctors(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const fetchMyAppointments = async () => {
    setLoadingAppts(true);
    try {
      const res = await getMyAppointments();
      const list = Array.isArray(res.data)
        ? res.data
        : (res.data?.appointments ?? res.data?.data ?? []);

      // ── Detect status changes → fire toasts ──────────────
      list.forEach((appt) => {
        const prev = prevStatuses.current[appt._id];
        const current = appt.status;

        if (prev && prev !== current) {
          if (current === "ACCEPTED") {
            toast.success(
              `Dr. ${appt.doctorId?.name} accepted your appointment`,
              {
                icon: "✅",
                style: {
                  background: "var(--card)",
                  color: "#16a34a",
                  border: "1px solid rgba(34,197,94,0.3)",
                },
              },
            );
          }

          if (current === "REJECTED") {
            toast.error(
              `Dr. ${appt.doctorId?.name} rejected your appointment`,
              {
                icon: "❌",
                style: {
                  background: "var(--card)",
                  color: "#dc2626",
                  border: "1px solid rgba(239,68,68,0.3)",
                },
              },
            );
          }
        }

        prevStatuses.current[appt._id] = current;
      });

      setMyAppointments(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAppts(false);
    }
  };

  const dismissToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;
  const step = selectedSlot ? 3 : selectedDate ? 2 : selectedDoctor ? 1 : 0;

  const handleNext = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      alert("Please select a doctor, date and time slot.");
      return;
    }
    navigate("/user/patient-details", {
      state: {
        doctor: selectedDoctor,
        date: formattedDate,
        time: selectedSlot,
      },
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "my") {
      setNewCount(0);
      fetchMyAppointments();
    }
  };

  // ── Counts for tab badge ──────────────────────────────────
  const pendingCount = myAppointments.filter(
    (a) => a.status === "REQUESTED",
  ).length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <style>{calStyle}</style>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}.animate-slideIn{animation:slideIn .3s ease}`}</style>

      {/* ── TOASTS ─────────────────────────────────────────── */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <Toast key={t.id} type={t.type} onClose={() => dismissToast(t.id)} />
        ))}
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-extrabold"
              style={{ color: "var(--text)" }}
            >
              Appointments
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text)", opacity: 0.5 }}
            >
              Book a specialist or track your existing appointments.
            </p>
          </div>
          {/* Refresh button */}
          <button
            onClick={fetchMyAppointments}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors mt-1"
            style={{
              background: "rgba(124,58,237,0.08)",
              color: "#7c3aed",
              border: "1px solid rgba(124,58,237,0.18)",
            }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* ── TABS ───────────────────────────────────────────── */}
        <div
          className="flex gap-1 p-1 rounded-2xl"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Book tab */}
          <button
            onClick={() => handleTabChange("book")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{
              background:
                activeTab === "book"
                  ? "linear-gradient(135deg,#7c3aed,#8b5cf6)"
                  : "transparent",
              color: activeTab === "book" ? "white" : "var(--text)",
              opacity: activeTab === "book" ? 1 : 0.5,
              boxShadow:
                activeTab === "book"
                  ? "0 4px 14px rgba(124,58,237,0.3)"
                  : "none",
            }}
          >
            <Stethoscope size={15} /> Book Appointment
          </button>

          {/* My Appointments tab */}
          <button
            onClick={() => handleTabChange("my")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all relative"
            style={{
              background:
                activeTab === "my"
                  ? "linear-gradient(135deg,#7c3aed,#8b5cf6)"
                  : "transparent",
              color: activeTab === "my" ? "white" : "var(--text)",
              opacity: activeTab === "my" ? 1 : 0.5,
              boxShadow:
                activeTab === "my" ? "0 4px 14px rgba(124,58,237,0.3)" : "none",
            }}
          >
            <CalendarCheck size={15} /> My Appointments
            {/* Unread badge */}
            {newCount > 0 && activeTab !== "my" && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center text-white"
                style={{ background: "#ef4444" }}
              >
                {newCount}
              </span>
            )}
            {/* Pending badge */}
            {pendingCount > 0 && activeTab === "my" && (
              <span
                className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold"
                style={{ background: "rgba(255,255,255,0.25)" }}
              >
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════
            TAB: BOOK APPOINTMENT
        ══════════════════════════════════════════════════════ */}
        {activeTab === "book" && (
          <div className="space-y-8">
            {/* Step indicator */}
            <div className="flex items-center gap-0">
              {STEPS.map((label, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div
                    key={label}
                    className="flex items-center flex-1 last:flex-none"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all"
                        style={{
                          background:
                            done || active
                              ? "linear-gradient(135deg,#7c3aed,#8b5cf6)"
                              : "var(--card)",
                          border:
                            done || active ? "none" : "1px solid var(--border)",
                          color: done || active ? "white" : "var(--text)",
                          opacity: done || active ? 1 : 0.4,
                          boxShadow: active
                            ? "0 4px 12px rgba(124,58,237,0.35)"
                            : "none",
                        }}
                      >
                        {done ? <CheckCircle2 size={14} /> : i + 1}
                      </div>
                      <span
                        className="text-[10px] font-bold hidden sm:block"
                        style={{
                          color: active ? "#7c3aed" : "var(--text)",
                          opacity: active ? 1 : 0.4,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className="flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all"
                        style={{
                          background:
                            i < step
                              ? "linear-gradient(90deg,#7c3aed,#8b5cf6)"
                              : "var(--border)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step 1: Doctor list */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.12)" }}
                >
                  <Stethoscope size={14} style={{ color: "#7c3aed" }} />
                </div>
                <h2
                  className="text-base font-extrabold"
                  style={{ color: "var(--text)" }}
                >
                  Available Specialists
                </h2>
              </div>
              {loadingDoctors ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2
                    size={28}
                    className="animate-spin"
                    style={{ color: "#7c3aed" }}
                  />
                </div>
              ) : doctors.length === 0 ? (
                <div
                  className="text-center py-16 text-sm"
                  style={{ color: "var(--text)", opacity: 0.4 }}
                >
                  No doctors available.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {doctors.map((doc) => (
                    <DoctorCard
                      key={doc._id}
                      doctor={doc}
                      selected={selectedDoctor?._id === doc._id}
                      onBook={() => {
                        setSelectedDoctor(doc);
                        setSelectedDate(null);
                        setSelectedSlot(null);
                      }}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Step 2: Calendar */}
            {selectedDoctor && (
              <section
                className="rounded-2xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="flex items-center gap-3 mb-6 pb-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {selectedDoctor.image?.url ? (
                    <img
                      src={selectedDoctor.image.url}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold"
                      style={{
                        background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                      }}
                    >
                      {selectedDoctor.name?.[0]}
                    </div>
                  )}
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--text)" }}
                    >
                      {selectedDoctor.name}
                    </p>
                    <p className="text-xs" style={{ color: "#7c3aed" }}>
                      {selectedDoctor.specialization}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDoctor(null);
                      setSelectedDate(null);
                      setSelectedSlot(null);
                    }}
                    className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(124,58,237,0.08)",
                      color: "#7c3aed",
                      border: "1px solid rgba(124,58,237,0.18)",
                    }}
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(124,58,237,0.12)" }}
                  >
                    <CalendarDays size={14} style={{ color: "#7c3aed" }} />
                  </div>
                  <h2
                    className="text-base font-extrabold"
                    style={{ color: "var(--text)" }}
                  >
                    Select a Date
                  </h2>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <Calendar
                      className="appt-cal"
                      onChange={(date) => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                      value={selectedDate}
                      minDate={new Date()}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Step 3: Slots */}
            {selectedDate && (
              <section
                className="rounded-2xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(124,58,237,0.12)" }}
                  >
                    <Clock size={14} style={{ color: "#7c3aed" }} />
                  </div>
                  <h2
                    className="text-base font-extrabold"
                    style={{ color: "var(--text)" }}
                  >
                    Available Slots
                  </h2>
                  <span
                    className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{
                      background: "rgba(124,58,237,0.08)",
                      color: "#7c3aed",
                    }}
                  >
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {slots.length === 0 ? (
                  <div
                    className="text-center py-8 text-sm"
                    style={{ color: "var(--text)", opacity: 0.4 }}
                  >
                    No slots available for this date.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {slots.map((slot, index) => {
                      const isBooked = slot.isBooked || slot.booked || false;
                      const slotTime = slot.time || slot;
                      const isSelected = selectedSlot === slotTime;
                      return (
                        <button
                          key={index}
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slotTime)}
                          className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                          style={{
                            background: isBooked
                              ? "var(--border)"
                              : isSelected
                                ? "linear-gradient(135deg,#7c3aed,#8b5cf6)"
                                : "rgba(124,58,237,0.07)",
                            color: isBooked
                              ? "var(--text)"
                              : isSelected
                                ? "white"
                                : "#7c3aed",
                            border: isSelected
                              ? "none"
                              : `1px solid ${isBooked ? "var(--border)" : "rgba(124,58,237,0.2)"}`,
                            opacity: isBooked ? 0.4 : 1,
                            cursor: isBooked ? "not-allowed" : "pointer",
                            boxShadow: isSelected
                              ? "0 4px 12px rgba(124,58,237,0.3)"
                              : "none",
                          }}
                        >
                          {slotTime}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* Step 4: Summary + Confirm */}
            {selectedSlot && (
              <section
                className="rounded-2xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h2
                  className="text-base font-extrabold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  Booking Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Doctor", value: selectedDoctor?.name },
                    {
                      label: "Specialization",
                      value: selectedDoctor?.specialization,
                    },
                    {
                      label: "Date",
                      value: selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }),
                    },
                    { label: "Time", value: selectedSlot },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center text-sm py-2"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span style={{ color: "var(--text)", opacity: 0.45 }}>
                        {label}
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: "var(--text)" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                  }}
                >
                  Confirm & Continue <ChevronRight size={16} />
                </button>
              </section>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB: MY APPOINTMENTS
        ══════════════════════════════════════════════════════ */}
        {activeTab === "my" && (
          <div className="space-y-4">
            {loadingAppts ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 animate-pulse flex gap-4"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl shrink-0"
                      style={{ background: "var(--border)" }}
                    />
                    <div className="flex-1 space-y-2 py-1">
                      <div
                        className="h-3 rounded-full w-36"
                        style={{ background: "var(--border)" }}
                      />
                      <div
                        className="h-2.5 rounded-full w-24"
                        style={{ background: "var(--border)" }}
                      />
                    </div>
                    <div
                      className="h-7 w-20 rounded-lg self-center"
                      style={{ background: "var(--border)" }}
                    />
                  </div>
                ))}
              </div>
            ) : myAppointments.length === 0 ? (
              <div
                className="rounded-2xl p-14 flex flex-col items-center gap-3 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.10)" }}
                >
                  <CalendarCheck
                    size={24}
                    style={{ color: "#7c3aed", opacity: 0.7 }}
                  />
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  No appointments yet
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--text)", opacity: 0.4 }}
                >
                  Book your first appointment using the Book tab.
                </p>
                <button
                  onClick={() => setActiveTab("book")}
                  className="mt-2 px-5 py-2 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                  }}
                >
                  Book Now
                </button>
              </div>
            ) : (
              <>
                {/* Alert banners for accepted/rejected */}
                {myAppointments.filter(
                  (a) => a.status === "ACCEPTED" || a.status === "REJECTED",
                ).length > 0 && (
                  <div className="space-y-2">
                    {myAppointments
                      .filter(
                        (a) =>
                          a.status === "ACCEPTED" || a.status === "REJECTED",
                      )
                      .slice(0, 3)
                      .map((a) => {
                        const cfg = STATUS_CFG[a.status];
                        const Icon = cfg.icon;
                        return (
                          <div
                            key={a._id + "-alert"}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
                            style={{
                              background: cfg.bg,
                              border: `1px solid ${cfg.border}`,
                              color: cfg.color,
                            }}
                          >
                            <Icon size={16} />
                            <span>
                              <b>{a.doctorId?.name ?? "Doctor"}</b>
                              {a.status === "ACCEPTED"
                                ? ` accepted your appointment on ${a.date} at ${a.time}`
                                : ` rejected your appointment on ${a.date} at ${a.time}`}
                              {a.rejectionReason && ` — "${a.rejectionReason}"`}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Appointment cards */}
                <div className="space-y-3">
                  {myAppointments.map((appt) => {
                    const cfg = STATUS_CFG[appt.status] || STATUS_CFG.REQUESTED;
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={appt._id}
                        className="rounded-2xl p-5 flex items-center gap-4 transition-all hover:shadow-md"
                        style={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(124,58,237,0.25)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                      >
                        {/* Doctor avatar */}
                        {appt.doctorId?.image?.url ? (
                          <img
                            src={appt.doctorId.image.url}
                            alt={appt.doctorId.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                        ) : (
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                            }}
                          >
                            {appt.doctorId?.name?.[0] ?? "D"}
                          </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-bold text-sm truncate"
                            style={{ color: "var(--text)" }}
                          >
                            {appt.doctorId?.name ?? "Doctor"}
                          </p>
                          <p
                            className="text-xs font-medium mt-0.5"
                            style={{ color: "#7c3aed" }}
                          >
                            {appt.doctorId?.specialization ?? ""}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span
                              className="text-xs flex items-center gap-1"
                              style={{ color: "var(--text)", opacity: 0.45 }}
                            >
                              <CalendarDays size={11} /> {appt.date}
                            </span>
                            <span
                              className="text-xs flex items-center gap-1"
                              style={{ color: "var(--text)", opacity: 0.45 }}
                            >
                              <Clock size={11} /> {appt.time}
                            </span>
                          </div>
                          {/* Rejection reason */}
                          {appt.status === "REJECTED" &&
                            appt.rejectionReason && (
                              <p
                                className="text-[10px] mt-1.5 px-2 py-1 rounded-lg inline-block"
                                style={{
                                  background: "rgba(239,68,68,0.08)",
                                  color: "#dc2626",
                                  border: "1px solid rgba(239,68,68,0.2)",
                                }}
                              >
                                Reason: {appt.rejectionReason}
                              </p>
                            )}
                        </div>

                        {/* Status badge */}
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0"
                          style={{
                            background: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                          }}
                        >
                          <Icon size={13} style={{ color: cfg.color }} />
                          <span
                            className="text-xs font-bold"
                            style={{ color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <button
                          onClick={async () => {
                            if (!window.confirm("Delete this appointment?"))
                              return;

                            try {
                              await deleteMyAppointment(appt._id);
                              fetchMyAppointments(); // refresh list
                            } catch (err) {
                              alert("Failed to delete");
                            }
                          }}
                          className="ml-3 px-3 py-1 text-xs rounded-lg font-semibold"
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            color: "#dc2626",
                            border: "1px solid rgba(239,68,68,0.3)",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AppointmentPage;
