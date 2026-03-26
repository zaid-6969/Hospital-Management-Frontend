import { useEffect, useState } from "react";
import {
  getAllAppointments,
  getDoctors,
  assignDoctor,
  updateAppointmentStatus,
} from "../services/api";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [page]);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments(page, 8);
      setAppointments(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 CHANGE STATUS
  const handleStatusChange = async (id, status) => {
    try {
      let rejectionReason = "";

      if (status === "REJECTED") {
        rejectionReason = prompt("Enter rejection reason:");
        if (!rejectionReason) return;
      }

      await updateAppointmentStatus(id, {
        status,
        rejectionReason,
      });

      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 ASSIGN / CHANGE DOCTOR
  const handleAssign = async (appointmentId, doctorId) => {
    try {
      await assignDoctor(appointmentId, doctorId);
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th>Patient</th>
              <th>Time</th>
              <th>Status</th>
              <th>Doctor</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id} className="border-t">
                {/* PATIENT */}
                <td className="py-3 font-medium">
                  {item.patientId?.name || "No Name"}
                </td>

                {/* TIME */}
                <td>
                  {item.date && item.time
                    ? `${item.date} - ${item.time}`
                    : "Not set"}
                </td>

                {/* STATUS */}
                <td>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded text-sm font-semibold
                      ${
                        item.status === "ACCEPTED"
                          ? "bg-green-100 text-green-600"
                          : item.status === "REJECTED"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }
                    `}
                  >
                    <option value="REQUESTED">Requested</option>
                    <option value="ACCEPTED">Accept</option>
                    <option value="REJECTED">Reject</option>
                  </select>
                </td>

                {/* DOCTOR DROPDOWN 🔥 */}
                <td>
                  <select
                    value={item.doctorId?._id || ""}
                    onChange={(e) =>
                      handleAssign(item._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="">Assign Doctor</option>

                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 items-center gap-2 flex-wrap">
        {/* PREV */}
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${
              page === num
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}

        {/* NEXT */}
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentTable;