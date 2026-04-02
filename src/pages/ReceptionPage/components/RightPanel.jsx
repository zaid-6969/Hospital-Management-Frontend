import { UserPlus, Siren, Clock, CheckCircle2 } from "lucide-react";

const DOCTORS = [
  { name: "Dr. Julian", time: "11:30 AM", available: false },
  { name: "Dr. Sarah",  time: "Now",      available: true  },
  { name: "Dr. Priya",  time: "2:00 PM",  available: false },
];

const RightPanel = () => {
  return (
    <div className="space-y-4">

      {/* Quick Actions */}
      <div className="rounded p-4 hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--text)", opacity: .4 }}>Quick Actions</p>

        <button className="w-full mb-2 flex items-center gap-3 p-3 rounded text-sm font-semibold transition-all"
          style={{ background: "rgba(106,90,205,0.08)", border: "1px solid rgba(106,90,205,0.18)", color: "#6a5acd" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(106,90,205,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(106,90,205,0.08)"; }}>
          <UserPlus size={16} />
          Register Patient
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded text-sm font-semibold transition-all"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", color: "#dc2626" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}>
          <Siren size={16} />
          Emergency Entry
        </button>
      </div>

      {/* Doctor Availability */}
      <div className="rounded p-4 hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--text)", opacity: .4 }}>Doctor Availability</p>

        <ul className="space-y-2">
          {DOCTORS.map((doc) => (
            <li key={doc.name} className="flex items-center justify-between px-3 py-2 rounded"
              style={{ background: "rgba(106,90,205,0.05)", border: "1px solid rgba(106,90,205,0.08)" }}>
              <div className="flex items-center gap-2">
                {doc.available
                  ? <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  : <Clock size={14} className="shrink-0" style={{ color: "#8b5cf6", opacity: .5 }} />}
                <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{doc.name}</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                style={doc.available
                  ? { background: "rgba(34,197,94,0.12)", color: "#16a34a" }
                  : { background: "rgba(106,90,205,0.12)", color: "#6a5acd" }}>
                {doc.available ? "Available" : doc.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Today's Summary */}
      <div className="rounded p-4"
        style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 8px 24px rgba(106,90,205,.30)" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-white opacity-70">
          ✦ Today's Summary
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Total",    value: "24" },
            { label: "Pending",  value: "8"  },
            { label: "Accepted", value: "13" },
            { label: "Rejected", value: "3"  },
          ].map((s) => (
            <div key={s.label} className="rounded p-3 text-center"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
              <div className="text-xl font-extrabold text-white">{s.value}</div>
              <div className="text-[10px] font-semibold mt-0.5 uppercase tracking-wide text-white opacity-70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RightPanel;
