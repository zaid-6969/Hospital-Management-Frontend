import { acceptAppointment, rejectAppointment } from "../../../utils/api";

const TimelineCard = ({ data, refresh }) => {
  const handleAccept = async () => {
    try {
      await acceptAppointment(data._id);
      refresh(); // 🔥 reload data without page refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await rejectAppointment(data._id, reason);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h3 className="font-bold">
        {data.patientId?.name || "Patient"}
      </h3>

      <p>{data.date} - {data.time}</p>

      {/* STATUS */}
      <p className="text-sm mt-2">
        Status:{" "}
        <span
          className={
            data.status === "ACCEPTED"
              ? "text-green-600 font-semibold"
              : data.status === "REJECTED"
              ? "text-red-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {data.status}
        </span>
      </p>

      {/* REASON */}
      {data.status === "REJECTED" && (
        <p className="text-sm text-red-500">
          Reason: {data.rejectionReason}
        </p>
      )}

      {/* ACTION BUTTONS */}
      {data.status === "REQUESTED" && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-1 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-1 rounded-lg"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default TimelineCard;