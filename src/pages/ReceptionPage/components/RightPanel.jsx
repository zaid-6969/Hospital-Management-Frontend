import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../../../redux/Slices/doctorSlice";
import { fetchAllAppointments } from "../../../redux/Slices/appointmentSlice";
import { UserPlus, Siren, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const RightPanel = () => {
  const dispatch = useDispatch();
  const { list: doctors, loading: loadingDoctors } = useSelector((s) => s.doctors);
  const { list: appointments, total } = useSelector((s) => s.appointments);

  useEffect(() => {
    dispatch(fetchAllDoctors());
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

      {/* Doctor Availability — REAL DATA */}
      <div className="rounded p-4 hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--text)", opacity: 0.4 }}>Doctor Availability</p>

        {loadingDoctors ? (
          <div className="flex justify-center py-4">
            <Loader2 size={18} className="animate-spin" style={{ color: "#6a5acd" }} />
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-xs text-center py-3" style={{ color: "var(--text)", opacity: 0.4 }}>
            No doctors found.
          </p>
        ) : (
          <ul className="space-y-2">
            {doctors.map((doc) => {
              const isAvailable = doc.isAvailable ?? true;
              return (
                <li key={doc._id}
                  className="flex items-center justify-between px-3 py-2 rounded"
                  style={{ background: "rgba(106,90,205,0.05)", border: "1px solid rgba(106,90,205,0.08)" }}>
                  <div className="flex items-center gap-2 min-w-0">
                    {isAvailable
                      ? <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                      : <XCircle size={14} className="shrink-0 text-red-400" />}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>
                        {doc.name}
                      </p>
                      {doc.specialization && (
                        <p className="text-[10px] truncate" style={{ color: "var(--text)", opacity: 0.45 }}>
                          {doc.specialization}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0 ml-2"
                    style={isAvailable
                      ? { background: "rgba(34,197,94,0.12)", color: "#16a34a" }
                      : { background: "rgba(239,68,68,0.12)", color: "#dc2626" }}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
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
