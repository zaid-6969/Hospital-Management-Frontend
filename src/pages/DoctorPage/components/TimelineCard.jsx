import { useState } from "react";
import { updateAppointmentStatus } from "../utils/api";
// import { acceptAppointment, rejectAppointment } from "../../../utils/api";

const TimelineCard = ({ data, refresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "REJECTED") {
      setSelectedStatus(value);
      setShowModal(true); // 🔥 open popup
    } else {
      updateStatus(value);
    }
  };

  const updateStatus = async (status, rejectionReason = "") => {
    try {
      await updateAppointmentStatus(data._id, {
        status,
        rejectionReason,
      });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectSubmit = () => {
    if (!reason) return;
    updateStatus("REJECTED", reason);
    setShowModal(false);
    setReason("");
  };

  // 🎨 STATUS COLORS
  const statusColors = {
    REQUESTED: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow relative">
      <h3 className="font-bold">
        {data.patientId?.name || "Patient"}
      </h3>

      <p>{data.date} - {data.time}</p>

      {/* STATUS DROPDOWN */}
      <div className="mt-3">
        <select
          value={data.status}
          onChange={handleChange}
          className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${statusColors[data.status]}`}
        >
          <option value="REQUESTED">Requested</option>

          <option
            value="ACCEPTED"
            disabled={data.status === "ACCEPTED"} // smart disable
          >
            Accept
          </option>

          <option
            value="REJECTED"
            disabled={data.status === "REJECTED"} // smart disable
          >
            Reject
          </option>
        </select>
      </div>

      {/* REJECTION REASON */}
      {data.status === "REJECTED" && (
        <p className="text-sm text-red-500 mt-2">
          Reason: {data.rejectionReason}
        </p>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg">
            <h2 className="text-lg font-semibold mb-3">
              Enter Rejection Reason
            </h2>

            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              rows="3"
              placeholder="Type reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleRejectSubmit}
                className="px-4 py-1 bg-red-500 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineCard;