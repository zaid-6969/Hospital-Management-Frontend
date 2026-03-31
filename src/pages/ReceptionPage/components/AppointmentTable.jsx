import { useEffect, useState } from "react";
import {
  getAllAppointments,
  getDoctors,
  assignDoctor,
  updateAppointmentStatus,
  deleteAppointment,
} from "../services/api";
import {
  Eye,
  Pencil,
  Trash2,
  ChevronsUpDown,
  Search,
  SlidersHorizontal,
  X,
  AlertTriangle,
} from "lucide-react";

const STATUS_STYLES = {
  ACCEPTED: "bg-green-100 text-green-700 border border-green-200",
  REJECTED: "bg-red-100 text-red-600 border border-red-200",
  REQUESTED: "bg-violet-100 text-violet-700 border border-violet-200",
};

/* ─── Reusable Modal Shell ─── */
const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
    <div className="bg-card border border-border border border-border rounded-2xl w-full max-w-md shadow-2xl shadow-violet-100 border border-violet-100 overflow-hidden">
      {children}
    </div>
  </div>
);

const ModalHeader = ({ title, subtitle, onClose }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-violet-100 bg-violet-50/60">
    <div>
      <h2 className="text-base font-bold text-violet-700">{title}</h2>
      {subtitle && <p className="text-xs text-violet-400 mt-0.5">{subtitle}</p>}
    </div>
    <button
      onClick={onClose}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 text-violet-400 hover:bg-violet-200 hover:text-violet-600 transition-colors"
    >
      <X size={15} />
    </button>
  </div>
);

/* ─── View Modal ─── */
const ViewModal = ({ data, onClose }) => (
  <Modal onClose={onClose}>
    <ModalHeader
      title="Appointment Details"
      subtitle="Full appointment information"
      onClose={onClose}
    />
    <div className="px-6 py-5 space-y-3">
      {[
        ["Patient", data.patientId?.name],
        ["Date", data.date],
        ["Time", data.time],
        ["Symptoms", data.symptoms],
        ["Doctor", data.doctorId?.name || "Not assigned"],
        ["Status", data.status],
        data.rejectionReason && ["Rejection Reason", data.rejectionReason],
      ]
        .filter(Boolean)
        .map(([label, value]) => (
          <div key={label} className="flex justify-between items-start gap-4">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wide w-32 shrink-0">
              {label}
            </span>
            <span className="text-sm text-gray-700 text-right">{value || "—"}</span>
          </div>
        ))}
    </div>
    <div className="px-6 py-4 border-t border-violet-100 bg-violet-50/30 flex justify-end">
      <button
        onClick={onClose}
        className="px-5 py-2 text-sm font-bold rounded-xl bg-violet-600 hover:bg-violet-700 bg-card border-r border border-border border border-border transition-colors"
      >
        Close
      </button>
    </div>
  </Modal>
);

/* ─── Edit Modal ─── */
const EditModal = ({ data, doctors, onClose, onSave }) => {
  const [editData, setEditData] = useState({
    doctorId: data.doctorId?._id || "",
    status: data.status || "REQUESTED",
    rejectionReason: data.rejectionReason || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Assign doctor if changed
      if (editData.doctorId && editData.doctorId !== data.doctorId?._id) {
        await assignDoctor(data._id, editData.doctorId);
      }
      // Update status
      await updateAppointmentStatus(data._id, {
        status: editData.status,
        rejectionReason:
          editData.status === "REJECTED" ? editData.rejectionReason : "",
      });
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader
        title="Edit Appointment"
        subtitle="Update doctor assignment or status"
        onClose={onClose}
      />

      <div className="px-6 py-5 space-y-4">
        {/* Doctor Select */}
        <div>
          <label className="block text-xs font-bold text-violet-500 uppercase tracking-wide mb-1.5">
            Assign Doctor
          </label>
          <select
            value={editData.doctorId}
            onChange={(e) => setEditData({ ...editData, doctorId: e.target.value })}
            className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-violet-50/50 text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
          >
            <option value="">— Select Doctor —</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-xs font-bold text-violet-500 uppercase tracking-wide mb-1.5">
            Status
          </label>
          <select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-violet-50/50 text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
          >
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Rejection Reason — only shown when REJECTED */}
        {editData.status === "REJECTED" && (
          <div>
            <label className="block text-xs font-bold text-violet-500 uppercase tracking-wide mb-1.5">
              Rejection Reason
            </label>
            <textarea
              rows={3}
              placeholder="Enter reason for rejection…"
              value={editData.rejectionReason}
              onChange={(e) =>
                setEditData({ ...editData, rejectionReason: e.target.value })
              }
              className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-violet-50/50 text-gray-700 placeholder:text-violet-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t border-violet-100 bg-violet-50/30">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-semibold rounded-xl border border-violet-200 text-violet-500 hover:bg-violet-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 text-sm font-bold rounded-xl bg-violet-600 hover:bg-violet-700 bg-card border-r border border-border border border-border transition-colors shadow-md shadow-violet-200 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};

/* ─── Delete Confirm Modal ─── */
const DeleteModal = ({ data, onClose, onConfirm }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAppointment(data._id);
      onConfirm();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle size={26} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-800">Delete Appointment?</h2>
          <p className="text-sm text-text/60 mt-1">
            You're about to delete the appointment for{" "}
            <span className="font-semibold text-gray-700">
              {data.patientId?.name || "this patient"}
            </span>
            . This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm font-semibold rounded-xl border bg-card border border-border border border-border text-text/60 hover:bg-secondary/10 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-5 py-2 text-sm font-bold rounded-xl bg-red-500 hover:bg-red-600 bg-card border-r border border-border border border-border transition-colors shadow-md shadow-red-100 disabled:opacity-60"
        >
          {deleting ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </Modal>
  );
};

/* ═══════════════════════════════════════
   MAIN TABLE
═══════════════════════════════════════ */
const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null); // ✅ NEW

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
    <>
      <div className="bg-card rounded-2xl shadow-sm border border-violet-100 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-violet-100">
          <div>
            <h2 className="text-base font-bold text-text">All Appointments</h2>
            <p className="text-xs text-violet-400 mt-0.5">
              Manage and track all patient appointments
            </p>
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
                {["Patient", "Date & Time", "Symptoms", "Doctor", "Status", "Action"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left font-bold text-violet-500 text-xs uppercase tracking-wide whitespace-nowrap"
                    >
                      <span className="flex items-center gap-1">
                        {col}
                        {col !== "Action" && (
                          <ChevronsUpDown size={12} className="opacity-50" />
                        )}
                      </span>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={item._id}
                  className={`border-b border-violet-50 hover:bg-violet-50/50 ${
                    idx % 2 !== 0 ? "bg-violet-50/20" : ""
                  }`}
                >
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
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        STATUS_STYLES[item.status]
                      }`}
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
                        title="View"
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 text-violet-500 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                      >
                        <Eye size={14} />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => setEditData(item)}
                        title="Edit"
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 hover:text-amber-700 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>

                      {/* DELETE ✅ */}
                      <button
                        onClick={() => setDeleteData(item)}
                        title="Delete"
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-violet-300 text-sm">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
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
                    ? "bg-violet-600 bg-card border-r border border-border border border-border shadow-sm shadow-violet-200"
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
      </div>

      {/* ── MODALS (outside the table div so they overlay the whole page) ── */}

      {viewData && (
        <ViewModal data={viewData} onClose={() => setViewData(null)} />
      )}

      {editData && (
        <EditModal
          data={editData}
          doctors={doctors}
          onClose={() => setEditData(null)}
          onSave={fetchAppointments}
        />
      )}

      {deleteData && (
        <DeleteModal
          data={deleteData}
          onClose={() => setDeleteData(null)}
          onConfirm={fetchAppointments}
        />
      )}
    </>
  );
};

export default AppointmentTable;