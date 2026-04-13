import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../../../redux/Slices/appointmentSlice";
import { UserPlus, Siren, Loader2 } from "lucide-react";

const RightPanel = () => {
  const dispatch = useDispatch();
  const { list: appointments, total } = useSelector((s) => s.appointments);

  useEffect(() => {
    dispatch(fetchAllAppointments({ page: 1, limit: 100 }));
  }, [dispatch]);

  // Stats derived from redux appointments
  const pending  = appointments.filter((a) => a.status === "REQUESTED").length;
  const accepted = appointments.filter((a) => a.status === "ACCEPTED").length;
  const rejected = appointments.filter((a) => a.status === "REJECTED").length;

  return (
    <div className="space-y-4">

      {/* Quick Actions */}
      <div className="rounded p-4 hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--text)", opacity: 0.4 }}>Quick Actions</p>

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

      {/* Today's Summary — REAL DATA */}
      <div className="rounded p-4"
        style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 8px 24px rgba(106,90,205,.30)" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-white opacity-70">
          ✦ Today's Summary
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Total",    value: total    },
            { label: "Pending",  value: pending  },
            { label: "Accepted", value: accepted },
            { label: "Rejected", value: rejected },
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