import { useEffect, useState } from "react";
import {
  getAllAppointments, getDoctors, assignDoctor,
  updateAppointmentStatus, deleteAppointment,
} from "../services/api";
import { Eye, Pencil, Trash2, ChevronsUpDown, Search, SlidersHorizontal, X, AlertTriangle } from "lucide-react";

const STATUS_CFG = {
  ACCEPTED: { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  REJECTED: { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  REQUESTED:{ bg: "rgba(106,90,205,0.12)", color: "#6a5acd" },
};

/* ─── Modal Shell ─── */
const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
    <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      {children}
    </div>
  </div>
);

const ModalHeader = ({ title, subtitle, onClose }) => (
  <>
    <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />
    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
      <div>
        <h2 className="text-sm font-bold" style={{ color: "var(--text)" }}>{title}</h2>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--text)", opacity: .4 }}>{subtitle}</p>}
      </div>
      <button onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition"
        style={{ background: "rgba(106,90,205,.12)", color: "#6a5acd" }}>
        <X size={15} />
      </button>
    </div>
  </>
);

const inputStyle = {
  background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)",
  width: "100%", borderRadius: 12, padding: "9px 12px", fontSize: 13, outline: "none",
};

/* ─── View Modal ─── */
const ViewModal = ({ data, onClose }) => (
  <Modal onClose={onClose}>
    <ModalHeader title="Appointment Details" subtitle="Full appointment information" onClose={onClose} />
    <div className="px-6 py-5 space-y-2.5">
      {[
        ["Patient", data.patientId?.name],
        ["Date", data.date],
        ["Time", data.time],
        ["Symptoms", data.symptoms],
        ["Doctor", data.doctorId?.name || "Not assigned"],
        ["Status", data.status],
        data.rejectionReason && ["Rejection Reason", data.rejectionReason],
      ].filter(Boolean).map(([label, value]) => (
        <div key={label} className="flex justify-between items-start gap-4 py-2 rounded-lg px-3"
          style={{ background: "rgba(106,90,205,0.04)" }}>
          <span className="text-[10px] font-bold uppercase tracking-wide w-32 shrink-0"
            style={{ color: "#8b5cf6" }}>{label}</span>
          <span className="text-sm text-right" style={{ color: "var(--text)" }}>{value || "—"}</span>
        </div>
      ))}
    </div>
    <div className="px-6 py-4 flex justify-end" style={{ borderTop: "1px solid var(--border)" }}>
      <button onClick={onClose}
        className="px-5 py-2 text-xs font-bold rounded-xl text-white"
        style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
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
      if (editData.doctorId && editData.doctorId !== data.doctorId?._id) {
        await assignDoctor(data._id, editData.doctorId);
      }
      await updateAppointmentStatus(data._id, {
        status: editData.status,
        rejectionReason: editData.status === "REJECTED" ? editData.rejectionReason : "",
      });
      onSave(); onClose();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const labelStyle = { display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#8b5cf6", marginBottom: 6 };

  return (
    <Modal onClose={onClose}>
      <ModalHeader title="Edit Appointment" subtitle="Update doctor assignment or status" onClose={onClose} />
      <div className="px-6 py-5 space-y-4">
        <div>
          <label style={labelStyle}>Assign Doctor</label>
          <select value={editData.doctorId}
            onChange={(e) => setEditData({ ...editData, doctorId: e.target.value })}
            style={inputStyle}>
            <option value="">— Select Doctor —</option>
            {doctors.map((doc) => <option key={doc._id} value={doc._id}>{doc.name}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            style={inputStyle}>
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        {editData.status === "REJECTED" && (
          <div>
            <label style={labelStyle}>Rejection Reason</label>
            <textarea rows={3} placeholder="Enter reason for rejection…"
              value={editData.rejectionReason}
              onChange={(e) => setEditData({ ...editData, rejectionReason: e.target.value })}
              style={{ ...inputStyle, resize: "none" }} />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <button onClick={onClose}
          className="px-4 py-2 text-xs font-semibold rounded-xl transition"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
          Cancel
        </button>
        <button onClick={handleSave} disabled={saving}
          className="px-5 py-2 text-xs font-bold rounded-xl text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};

/* ─── Delete Modal ─── */
const DeleteModal = ({ data, onClose, onConfirm }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteAppointment(data._id); onConfirm(); onClose(); }
    catch (err) { console.error(err); }
    finally { setDeleting(false); }
  };

  return (
    <Modal onClose={onClose}>
      <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(239,68,68,0.12)" }}>
          <AlertTriangle size={26} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-sm font-bold" style={{ color: "var(--text)" }}>Delete Appointment?</h2>
          <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: .5 }}>
            You're about to delete the appointment for{" "}
            <span className="font-semibold" style={{ opacity: 1 }}>{data.patientId?.name || "this patient"}</span>.
            This cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-3 px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <button onClick={onClose}
          className="px-5 py-2 text-xs font-semibold rounded-xl transition"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
          Cancel
        </button>
        <button onClick={handleDelete} disabled={deleting}
          className="px-5 py-2 text-xs font-bold rounded-xl text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
          {deleting ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </Modal>
  );
};

/* ═══════════════ MAIN TABLE ═══════════════ */
const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors]           = useState([]);
  const [page, setPage]                 = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [total, setTotal]               = useState(0);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [viewData, setViewData]     = useState(null);
  const [editData, setEditData]     = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const limit = 8;

  useEffect(() => { fetchAppointments(); fetchDoctors(); }, [page]);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments(page, limit);
      setAppointments(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) { console.log(err); }
  };

  const fetchDoctors = async () => {
    try { const res = await getDoctors(); setDoctors(res.data); }
    catch (err) { console.log(err); }
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
    } catch (err) { console.log(err); }
  };

  const handleAssign = async (appointmentId, doctorId) => {
    try { await assignDoctor(appointmentId, doctorId); fetchAppointments(); }
    catch (err) { console.log(err); }
  };

  const filtered = appointments.filter((a) => {
    const matchSearch =
      (a.patientId?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.date || "").includes(search);
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const start = (page - 1) * limit + 1;
  const end   = Math.min(page * limit, total);

  return (
    <>
      <div className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <h2 className="text-sm font-bold" style={{ color: "var(--text)" }}>All Appointments</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text)", opacity: .4 }}>
              Manage and track all patient appointments
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 w-44"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <Search size={13} style={{ color: "var(--text)", opacity: .3 }} className="shrink-0" />
              <input type="text" placeholder="Search…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
                style={{ color: "var(--text)" }} />
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl px-3 py-1.5 text-xs font-semibold outline-none"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "#6a5acd" }}>
              <option value="All">All</option>
              <option value="REQUESTED">Requested</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button className="rounded-xl p-1.5 transition"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", opacity: .5 }}>
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(106,90,205,0.04)" }}>
                <th className="w-8 px-5 py-3">
                  <input type="checkbox" className="accent-violet-600 rounded" />
                </th>
                {["Patient", "Date & Time", "Symptoms", "Doctor", "Status", "Action"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{ color: "var(--text)", opacity: .35 }}>
                    <span className="flex items-center gap-1">
                      {col}
                      {col !== "Action" && <ChevronsUpDown size={11} className="opacity-50" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item._id}
                  className="transition-colors"
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: idx % 2 !== 0 ? "rgba(106,90,205,0.02)" : "transparent"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(106,90,205,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = idx % 2 !== 0 ? "rgba(106,90,205,0.02)" : "transparent"; }}>

                  <td className="px-5 py-3">
                    <input type="checkbox" className="accent-violet-600" />
                  </td>

                  <td className="px-4 py-3 font-semibold text-sm" style={{ color: "var(--text)" }}>
                    {item.patientId?.name || "—"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "var(--text)", opacity: .5 }}>
                    {item.date && item.time ? `${item.date} · ${item.time}` : "—"}
                  </td>

                  <td className="px-4 py-3 max-w-[140px] truncate text-xs" style={{ color: "var(--text)", opacity: .5 }}>
                    {item.symptoms || "—"}
                  </td>

                  <td className="px-4 py-3">
                    <select value={item.doctorId?._id || ""}
                      onChange={(e) => handleAssign(item._id, e.target.value)}
                      className="rounded-lg px-2 py-1 text-xs outline-none"
                      style={{ background: "rgba(106,90,205,0.08)", border: "1px solid rgba(106,90,205,0.2)", color: "#6a5acd" }}>
                      <option value="">Assign Doctor</option>
                      {doctors.map((doc) => <option key={doc._id} value={doc._id}>{doc.name}</option>)}
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    <select value={item.status}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg outline-none cursor-pointer"
                      style={{
                        background: STATUS_CFG[item.status]?.bg,
                        color: STATUS_CFG[item.status]?.color,
                        border: `1px solid ${STATUS_CFG[item.status]?.color}30`
                      }}>
                      <option value="REQUESTED">Requested</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewData(item)} title="View"
                        className="w-7 h-7 flex items-center justify-center rounded-lg transition"
                        style={{ background: "rgba(106,90,205,0.1)", color: "#6a5acd" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(106,90,205,0.2)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(106,90,205,0.1)"; }}>
                        <Eye size={13} />
                      </button>
                      <button onClick={() => setEditData(item)} title="Edit"
                        className="w-7 h-7 flex items-center justify-center rounded-lg transition"
                        style={{ background: "rgba(234,179,8,0.1)", color: "#ca8a04" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(234,179,8,0.2)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(234,179,8,0.1)"; }}>
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteData(item)} title="Delete"
                        className="w-7 h-7 flex items-center justify-center rounded-lg transition"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-xs" style={{ color: "var(--text)", opacity: .3 }}>
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3"
          style={{ borderTop: "1px solid var(--border)", background: "rgba(106,90,205,0.02)" }}>
          <p className="text-xs font-medium" style={{ color: "var(--text)", opacity: .4 }}>
            Showing {filtered.length === 0 ? 0 : start} to {end} of {total} entries
          </p>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
              className="px-3 py-1 text-xs rounded-lg font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button key={num} onClick={() => setPage(num)}
                className="w-7 h-7 text-xs rounded-lg font-bold transition"
                style={page === num
                  ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white" }
                  : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
                {num}
              </button>
            ))}

            <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
              className="px-3 py-1 text-xs rounded-lg font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
              Next →
            </button>
          </div>
        </div>
      </div>

      {viewData   && <ViewModal   data={viewData}   onClose={() => setViewData(null)} />}
      {editData   && <EditModal   data={editData}   doctors={doctors} onClose={() => setEditData(null)}   onSave={fetchAppointments} />}
      {deleteData && <DeleteModal data={deleteData} onClose={() => setDeleteData(null)} onConfirm={fetchAppointments} />}
    </>
  );
};

export default AppointmentTable;
