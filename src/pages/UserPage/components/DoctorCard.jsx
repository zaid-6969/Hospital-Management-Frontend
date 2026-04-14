import { useNavigate } from "react-router-dom";
import { Star, Stethoscope, Clock } from "lucide-react";

// Deterministic doctor photo based on name initial
const DOCTOR_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80",
];

const DoctorCard = ({ doctor, onBook, selected }) => {
  const navigate = useNavigate();

  const fallbackIdx = (doctor.name?.charCodeAt(4) || 0) % DOCTOR_FALLBACK_IMAGES.length;
  const imgSrc = doctor.image?.url || DOCTOR_FALLBACK_IMAGES[fallbackIdx];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all cursor-pointer hover:-translate-y-0.5"
      style={{
        background: "var(--card)",
        border: selected ? "1.5px solid #7c3aed" : "1px solid var(--border)",
        boxShadow: selected ? "0 0 0 3px rgba(124,58,237,0.15)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
      onClick={() => navigate(`/user/doctor/${doctor._id}`)}
    >
      <div className="flex gap-4 p-5">
        {/* Doctor photo */}
        <div className="relative shrink-0">
          <img
            src={imgSrc}
            alt={doctor.name}
            className="w-24 h-24 rounded-xl object-cover object-top"
          />
          {/* Availability dot */}
          <span
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
            style={{
              background: "#10b981",
              borderColor: "var(--card)",
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h2 className="font-extrabold text-base leading-tight" style={{ color: "var(--text)" }}>
              {doctor.name}
            </h2>
            <p className="text-sm font-semibold mt-0.5" style={{ color: "#7c3aed" }}>
              {doctor.specialization}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={11} fill="#f59e0b" stroke="#f59e0b" />
              ))}
              <span className="text-[11px] ml-1" style={{ color: "var(--text)", opacity: 0.4 }}>4.8</span>
            </div>
          </div>

          {/* Experience chip */}
          <div
            className="flex items-center gap-2 mt-3 px-3 py-2 rounded-xl w-fit"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <Stethoscope size={12} style={{ color: "#7c3aed" }} />
            <span className="text-xs font-semibold" style={{ color: "#7c3aed" }}>
              {doctor.experience} yrs exp
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-1.5">
          <Clock size={12} style={{ color: "var(--text)", opacity: 0.4 }} />
          <span className="text-xs" style={{ color: "var(--text)", opacity: 0.4 }}>
            {doctor.next || "Available today"}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onBook?.(); }}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)" }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;