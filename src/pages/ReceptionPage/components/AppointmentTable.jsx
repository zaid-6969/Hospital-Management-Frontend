import { useEffect, useState } from "react";
import {
  getAllAppointments,
  getDoctors,
  assignDoctor,
  updateAppointmentStatus,
} from "../services/api";
import { Eye, Pencil, Trash2, ChevronsUpDown, Search, SlidersHorizontal } from "lucide-react";

const STATUS_STYLES = {
  ACCEPTED: "bg-green-100 text-green-700 border border-green-200",
  REJECTED: "bg-red-100 text-red-600 border border-red-200",
  REQUESTED: "bg-violet-100 text-violet-700 border border-violet-200",
};

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ NEW STATES
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [page]);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments(page, limit);
      setAppointments(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
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

  const handleStatusChange = async (id, status) => {
    try {
      let rejectionReason = "";
      if (status === "REJECTED") {
        rejectionReason = prompt("Enter rejection reason:");
        if (!rejectionReason) return;
      }
      await updateAppointmentStatus(id, { status, rejectionReason });
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async (appointmentId, doctorId) => {
    try {
      await assignDoctor(appointmentId, doctorId);
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = appointments.filter((a) => {
    const matchSearch =
      (a.patientId?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.date || "").includes(search);
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-violet-100 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-violet-100">
        <div>
          <h2 className="text-base font-bold text-text">All Appointments</h2>
          <p className="text-xs text-violet-400 mt-0.5">Manage and track all patient appointments</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 border border-violet-200 rounded-xl px-3 py-1.5 bg-violet-50 w-48">
            <Search size={14} className="text-violet-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-text placeholder:text-violet-300 w-full text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-violet-200 rounded-xl px-3 py-1.5 text-sm bg-violet-50 text-violet-700 outline-none font-medium"
          >
            <option value="All">All</option>
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button className="border border-violet-200 rounded-xl p-1.5 bg-violet-50 text-violet-400 hover:text-violet-600 hover:bg-violet-100 transition-colors">
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-violet-100 bg-violet-50/60">
              <th className="w-8 px-5 py-3">
                <input type="checkbox" className="accent-violet-600 rounded" />
              </th>
              {["Patient", "Date & Time", "Symptoms", "Doctor", "Status", "Action"].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-bold text-violet-500 text-xs uppercase tracking-wide whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    {col}
                    {col !== "Action" && <ChevronsUpDown size={12} className="opacity-50" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, idx) => (
              <tr key={item._id} className={`border-b border-violet-50 hover:bg-violet-50/50 ${idx % 2 !== 0 ? "bg-violet-50/20" : ""}`}>

                <td className="px-5 py-3">
                  <input type="checkbox" className="accent-violet-600" />
                </td>

                <td className="px-4 py-3 font-semibold text-text">
                  {item.patientId?.name || "—"}
                </td>

                <td className="px-4 py-3 text-text/60 whitespace-nowrap">
                  {item.date && item.time ? `${item.date} · ${item.time}` : "—"}
                </td>

                <td className="px-4 py-3 text-text/60 max-w-[140px] truncate">
                  {item.symptoms || "—"}
                </td>

                <td className="px-4 py-3">
                  <select
                    value={item.doctorId?._id || ""}
                    onChange={(e) => handleAssign(item._id, e.target.value)}
                    className="border border-violet-200 rounded-lg px-2 py-1 text-xs bg-violet-50 text-violet-700 outline-none"
                  >
                    <option value="">Assign Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-3">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[item.status]}`}
                  >
                    <option value="REQUESTED">Requested</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>

                {/* ACTION */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">

                    {/* VIEW */}
                    <button
                      onClick={() => setViewData(item)}
                      className="text-violet-500 hover:text-violet-700"
                    >
                      <Eye size={15} />
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => setEditData(item)}
                      className="text-amber-500 hover:text-amber-700"
                    >
                      <Pencil size={15} />
                    </button>

                    <button className="text-red-400 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (UNCHANGED) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-violet-100 bg-violet-50/40">
        <p className="text-xs text-violet-400 font-medium">
          Showing {filtered.length === 0 ? 0 : start} to {end} of {total} entries
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1 text-xs rounded-lg border border-violet-200 bg-card text-violet-500 hover:bg-violet-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-7 h-7 text-xs rounded-lg font-bold transition-colors ${
                page === num
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
                  : "border border-violet-200 bg-card text-violet-500 hover:bg-violet-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 text-xs rounded-lg border border-violet-200 bg-card text-violet-500 hover:bg-violet-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next →
          </button>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewData && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 space-y-2">
            <h2 className="font-bold">Patient Details</h2>
            <p>Name: {viewData.patientId?.name}</p>
            <p>Date: {viewData.date}</p>
            <p>Time: {viewData.time}</p>
            <p>Doctor: {viewData.doctorId?.name}</p>
            <p>Status: {viewData.status}</p>

            <button onClick={() => setViewData(null)} className="mt-3 bg-violet-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3">
            <h2 className="font-bold">Edit Appointment</h2>

            <select
              value={editData.doctorId?._id || ""}
              onChange={(e) =>
                setEditData({ ...editData, doctorId: { _id: e.target.value } })
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>

            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
              className="w-full border p-2 rounded"
            >
              <option value="REQUESTED">Requested</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditData(null)}>Cancel</button>

              <button
                onClick={async () => {
                  await assignDoctor(editData._id, editData.doctorId._id);
                  await updateAppointmentStatus(editData._id, {
                    status: editData.status,
                  });
                  setEditData(null);
                  fetchAppointments();
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;