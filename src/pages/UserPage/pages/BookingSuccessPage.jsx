import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, CalendarDays, Clock, User, Stethoscope, ArrowRight, Home } from "lucide-react";

const DOCTOR_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
];

const BookingSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { doctor, date, time, patientName } = state || {};

  const fallbackIdx = (doctor?.name?.charCodeAt(4) || 0) % DOCTOR_FALLBACK_IMAGES.length;
  const imgSrc = doctor?.image?.url || DOCTOR_FALLBACK_IMAGES[fallbackIdx];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
      >
        {/* Green success header */}
        <div
          className="relative py-10 px-8 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg,#059669,#10b981)" }}
        >
          <div className="absolute inset-0 bg-black/5" />
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)" }}
            >
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-white mb-1">Appointment Requested!</h1>
            <p className="text-green-100 text-sm">
              We'll notify you once the doctor confirms.
            </p>
          </div>
        </div>

        {/* Booking details */}
        <div className="p-7">
          {doctor && (
            <div
              className="rounded-2xl p-5 mb-6"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              {/* Doctor header */}
              <div
                className="flex items-center gap-4 pb-4 mb-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <img
                  src={imgSrc}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-xl object-cover object-top"
                />
                <div>
                  <p className="font-bold text-base" style={{ color: "var(--text)" }}>{doctor.name}</p>
                  <p className="text-sm font-semibold" style={{ color: "#7c3aed" }}>{doctor.specialization}</p>
                </div>
              </div>

              {/* Detail rows */}
              <div className="space-y-3">
                {patientName && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2" style={{ color: "var(--text)", opacity: 0.45 }}>
                      <User size={13} />
                      <span>Patient</span>
                    </div>
                    <span className="font-semibold" style={{ color: "var(--text)" }}>{patientName}</span>
                  </div>
                )}
                {date && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2" style={{ color: "var(--text)", opacity: 0.45 }}>
                      <CalendarDays size={13} />
                      <span>Date</span>
                    </div>
                    <span className="font-semibold" style={{ color: "var(--text)" }}>
                      {new Date(date).toDateString()}
                    </span>
                  </div>
                )}
                {time && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2" style={{ color: "var(--text)", opacity: 0.45 }}>
                      <Clock size={13} />
                      <span>Time</span>
                    </div>
                    <span className="font-semibold" style={{ color: "var(--text)" }}>{time}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-1">
                  <div className="flex items-center gap-2" style={{ color: "var(--text)", opacity: 0.45 }}>
                    <Stethoscope size={13} />
                    <span>Status</span>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-bold"
                    style={{ background: "rgba(234,179,8,0.12)", color: "#b45309", border: "1px solid rgba(234,179,8,0.3)" }}
                  >
                    Pending Confirmation
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/user")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
              style={{ border: "1.5px solid rgba(124,58,237,0.3)", color: "#7c3aed", background: "rgba(124,58,237,0.06)" }}
            >
              <Home size={15} /> Home
            </button>
            <button
              onClick={() => navigate("/user/appointment")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)" }}
            >
              Book Another <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;