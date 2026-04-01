import { useState } from "react";
import { updateAppointmentStatus } from "../utils/api";

const statusConfig = {
  REQUESTED: { label: "Requested", bg: "rgba(234,179,8,0.12)",  color: "#ca8a04"  },
  ACCEPTED:  { label: "Accepted",  bg: "rgba(34,197,94,0.12)",  color: "#16a34a"  },
  REJECTED:  { label: "Rejected",  bg: "rgba(239,68,68,0.12)",  color: "#dc2626"  },
};

const TimelineCard = ({ data, refresh }) => {
  const [showModal, setShowModal]       = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reason, setReason]             = useState("");

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

  const cfg = statusConfig[data.status] || statusConfig.REQUESTED;

  return (
    <>
      <div
        className="p-4 rounded-2xl hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Left: avatar + info */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}
            >
              {(data.patientId?.name?.[0] || "P").toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
                {data.patientId?.name || "Patient"}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text)", opacity: .45 }}>
                {data.date}  ·  {data.time}
              </p>
            </div>
          </div>

          {/* Right: status badge */}
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>

        {/* Rejection reason */}
        {data.status === "REJECTED" && data.rejectionReason && (
          <p className="mt-3 text-xs px-3 py-2 rounded-lg"
            style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.15)" }}>
            Reason: {data.rejectionReason}
          </p>
        )}

        {/* Status dropdown */}
        <div className="mt-3 flex items-center gap-2">
          <label className="text-xs font-medium" style={{ color: "var(--text)", opacity: .4 }}>
            Update:
          </label>
          <select
            value={data.status}
            onChange={handleChange}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg outline-none cursor-pointer transition"
            style={{
              background: "rgba(106,90,205,0.08)",
              border: "1px solid rgba(106,90,205,0.2)",
              color: "#6a5acd"
            }}
          >
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED" disabled={data.status === "ACCEPTED"}>Accept</option>
            <option value="REJECTED" disabled={data.status === "REJECTED"}>Reject</option>
          </select>
        </div>
      </div>

      {/* Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="p-6 rounded-2xl w-[340px] shadow-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            {/* Purple accent line */}
            <div className="h-0.5 w-full rounded-full mb-5"
              style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

            <h2 className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
              Rejection Reason
            </h2>
            <p className="text-xs mb-4" style={{ color: "var(--text)", opacity: .45 }}>
              Please provide a reason for rejecting this appointment.
            </p>

            <textarea
              className="w-full text-sm rounded-xl px-3 py-2.5 outline-none resize-none"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text)"
              }}
              rows="3"
              placeholder="Type reason here…"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setShowModal(false); setReason(""); }}
                className="px-4 py-2 text-xs font-semibold rounded-xl transition"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)"
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
