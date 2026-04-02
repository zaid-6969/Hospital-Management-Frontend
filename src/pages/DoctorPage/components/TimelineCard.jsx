import { useState } from "react";
import { updateAppointmentStatus } from "../utils/api";

const statusConfig = {
  REQUESTED: { label: "Pending",  bg: "rgba(234,179,8,0.12)",  color: "#ca8a04" },
  ACCEPTED:  { label: "Accepted", bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  REJECTED:  { label: "Rejected", bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
};

const AVATAR_COLORS = [
  "linear-gradient(135deg,#6a5acd,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#ef4444,#dc2626)",
];

const TimelineCard = ({ data, refresh }) => {
  const [showModal, setShowModal]           = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reason, setReason]                 = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "REJECTED") {
      setSelectedStatus(value);
      setShowModal(true);
    } else {
      updateStatus(value);
    }
  };

  const updateStatus = async (status, rejectionReason = "") => {
    try {
      await updateAppointmentStatus(data._id, { status, rejectionReason });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectSubmit = () => {
    if (!reason.trim()) return;
    updateStatus("REJECTED", reason);
    setShowModal(false);
    setReason("");
  };

  const cfg     = statusConfig[data.status] || statusConfig.REQUESTED;
  const avatarBg = AVATAR_COLORS[(data.patientId?.name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];

  return (
    <>
      <div
        className="px-5 py-3.5 grid grid-cols-[1fr_auto_auto] gap-4 items-center transition-colors"
        onMouseEnter={e => e.currentTarget.style.background = "rgba(106,90,205,0.035)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        {/* Patient info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: avatarBg }}
          >
            {(data.patientId?.name?.[0] || "P").toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
              {data.patientId?.name || "Patient"}
            </p>
            <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "var(--text)", opacity: 0.4 }}>
              <span>{data.date}</span>
              {data.date && data.time && <span>·</span>}
              <span>{data.time}</span>
            </p>
            {/* Rejection reason inline */}
            {data.status === "REJECTED" && data.rejectionReason && (
              <p
                className="text-[10px] mt-1 px-2 py-0.5 rounded-md inline-block"
                style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }}
              >
                {data.rejectionReason}
              </p>
            )}
          </div>
        </div>

        {/* Status badge */}
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {cfg.label}
        </span>

        {/* Dropdown */}
        <select
          value={data.status}
          onChange={handleChange}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg outline-none cursor-pointer transition shrink-0"
          style={{
            background: "rgba(106,90,205,0.08)",
            border: "1px solid rgba(106,90,205,0.2)",
            color: "#6a5acd",
          }}
        >
          <option value="REQUESTED">Pending</option>
          <option value="ACCEPTED">Accept</option>
          <option value="REJECTED">Reject</option>
        </select>
      </div>

      {/* Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="p-6 rounded-2xl w-[340px] shadow-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="h-0.5 w-full rounded-full mb-5"
              style={{ background: "linear-gradient(90deg,#ef4444,#dc2626)" }}
            />
            <h2 className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
              Rejection Reason
            </h2>
            <p className="text-xs mb-4" style={{ color: "var(--text)", opacity: 0.45 }}>
              Please provide a reason for rejecting this appointment.
            </p>
            <textarea
              className="w-full text-sm rounded-xl px-3 py-2.5 outline-none resize-none"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              rows="3"
              placeholder="Type reason here…"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setShowModal(false); setReason(""); }}
                className="px-4 py-2 text-xs font-semibold rounded-xl transition"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-white transition"
                style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimelineCard;