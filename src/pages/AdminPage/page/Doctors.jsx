import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  registerUser,
  getUsers,
} from "../service/api";
import {
  UserPlus, UserCheck, Edit3, Trash2, Stethoscope, X,
  ChevronRight, ChevronLeft, Briefcase, Loader2, Search,
  LayoutGrid, List,
} from "lucide-react";

const PAGE_SIZE = 6;

// ── SEARCHABLE USER DROPDOWN ──────────────────────────────────
const UserSearchDropdown = ({ users, value, onChange }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = users.find((u) => u._id === value);
  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(query.toLowerCase()) ||
      u.email?.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="relative">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={selected ? selected.name : "Search by name or email…"}
          value={open ? query : selected ? selected.name : ""}
          onFocus={() => { setOpen(true); setQuery(""); }}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="w-full pl-9 pr-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/40 text-sm transition-all"
        />
        {value && (
          <button type="button"
            onMouseDown={(e) => { e.preventDefault(); onChange(""); setQuery(""); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors">
            <X size={14} />
          </button>
        )}
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-52 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-400 text-center">No users found</div>
          ) : (
            filtered.map((u) => (
              <button key={u._id} type="button"
                onMouseDown={() => { onChange(u._id); setQuery(""); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors ${value === u._id ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-semibold" : "dark:text-white"}`}>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {u.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-slate-400">{u.email}</div>
                </div>
                {value === u._id && <span className="ml-auto text-purple-600 text-xs">✓</span>}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({ userId: "", name: "", specialization: "", experience: "", image: null, role: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", role: "DOCTOR" });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState("");
  const [availability, setAvailability] = useState([{ day: "", slots: [{ start: "", end: "" }] }]);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  // ── NEW: view toggle + pagination ─────────────────────────
  const [viewMode, setViewMode] = useState("card"); // "card" | "table"
  const [page, setPage] = useState(1);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // ── FETCH ──────────────────────────────────────────────────
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctors();
      const list = Array.isArray(res.data) ? res.data : (res.data?.doctors ?? res.data?.data ?? []);
      setDoctors(list);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  // reset page when filters change
  useEffect(() => { setPage(1); }, [search, filterSpec]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await getUsers("DOCTOR");
      const list = Array.isArray(res.data) ? res.data : (res.data?.users ?? res.data?.data ?? []);
      setUsers(list);
    } catch (err) { setUsers([]); } finally { setUsersLoading(false); }
  };

  // ── FORM HELPERS ───────────────────────────────────────────
  const resetForm = () => {
    setForm({ userId: "", name: "", specialization: "", experience: "", image: null, role: "" });
    setAvailability([{ day: "", slots: [{ start: "", end: "" }] }]);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm((f) => ({ ...f, image: files[0] }));
    else setForm((f) => ({ ...f, [name]: value }));
  };

  const handleEdit = (doc) => {
    setEditId(doc._id);
    setForm({ userId: doc.userId?._id || doc.userId || "", name: doc.name, specialization: doc.specialization, experience: doc.experience, image: null, role: doc.role });
    setAvailability(doc.availability?.length ? doc.availability : [{ day: "", slots: [{ start: "", end: "" }] }]);
    setShowModal(true);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this doctor?")) return;
    setDeletingId(id);
    try {
      await deleteDoctor(id);
      showToast("success", "Doctor removed successfully.");
      fetchDoctors();
    } catch (err) {
      const msg = err?.response?.data?.message ||
        (err?.response?.status === 403 ? "Access denied — make sure you are logged in as ADMIN." :
         err?.response?.status === 401 ? "Session expired. Please log in again." :
         "Failed to delete doctor. Please try again.");
      showToast("error", msg);
    } finally { setDeletingId(null); }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => { if (form[key] !== null && form[key] !== "") formData.append(key, form[key]); });
    formData.append("availability", JSON.stringify(availability));
    try {
      if (editId) await updateDoctor(editId, formData);
      else await createDoctor(formData);
      setShowModal(false);
      resetForm();
      fetchDoctors();
    } catch (err) { console.error("Save failed:", err); }
  };

  const handleRegisterChange = (e) => { const { name, value } = e.target; setRegisterForm((f) => ({ ...f, [name]: value })); };

  const handleRegisterSubmit = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) { alert("Please fill in all fields."); return; }
    setRegisterLoading(true);
    try {
      await registerUser(registerForm);
      alert(`User "${registerForm.name}" registered successfully as ${registerForm.role}!`);
      setRegisterForm({ name: "", email: "", password: "", role: "DOCTOR" });
      setShowRegisterModal(false);
    } catch (err) { alert(err.response?.data?.message || "Registration failed."); }
    finally { setRegisterLoading(false); }
  };

  // ── AVAILABILITY ───────────────────────────────────────────
  const addDay = () => setAvailability((p) => [...p, { day: "", slots: [{ start: "", end: "" }] }]);
  const removeDay = (dIdx) => setAvailability((p) => p.filter((_, i) => i !== dIdx));
  const addSlot = (dIdx) => setAvailability((p) => p.map((d, i) => i !== dIdx ? d : { ...d, slots: [...d.slots, { start: "", end: "" }] }));
  const removeSlot = (dIdx, sIdx) => setAvailability((p) => p.map((d, i) => i !== dIdx ? d : { ...d, slots: d.slots.filter((_, j) => j !== sIdx) }));
  const handleAvailabilityChange = (dIdx, sIdx, field, val) => {
    setAvailability((prev) => prev.map((d, i) => i !== dIdx ? d : {
      ...d,
      day: field === "day" ? val : d.day,
      slots: field !== "day" ? d.slots.map((s, j) => j === sIdx ? { ...s, [field]: val } : s) : d.slots,
    }));
  };

  const goToDetail = (doc) => navigate("/admin/doctor-details", { state: { id: doc._id } });

  // ── FILTERED + PAGINATED ───────────────────────────────────
  const filtered = doctors.filter((d) => {
    const matchName = d.name?.toLowerCase().includes(search.toLowerCase());
    const matchSpec = filterSpec ? d.specialization === filterSpec : true;
    return matchName && matchSpec;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── AVATAR HELPER ─────────────────────────────────────────
  const Avatar = ({ doc, size = "md" }) => {
    const cls = size === "sm" ? "w-9 h-9 rounded-xl text-sm" : "w-16 h-16 rounded-2xl text-2xl";
    return doc.image?.url ? (
      <img src={doc.image.url} className={`${cls} object-cover ring-4 ring-slate-50 dark:ring-slate-700`} alt={doc.name} />
    ) : (
      <div className={`${cls} flex items-center justify-center font-bold text-white ring-4 ring-slate-50 dark:ring-slate-700`}
        style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
        {doc.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) ?? "DR"}
      </div>
    );
  };

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-8 transition-colors duration-300" style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* TOAST */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.type === "success"
            ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>}
          {toast.msg}
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Stethoscope className="text-purple-600" size={32} />
            Medical Staff
          </h1>
          <p className="mt-1 opacity-60">Manage specialist profiles and track clinical performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowRegisterModal(true)}
            className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-purple-500/10 transition-all hover:scale-105 active:scale-95">
            <UserCheck size={18} /> Create Member
          </button>
          <button onClick={() => { resetForm(); setShowModal(true); fetchUsers(); }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95">
            <UserPlus size={18} /> Add Doctor
          </button>
        </div>
      </div>

      {/* FILTER BAR + VIEW TOGGLE */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }} />
        </div>
        <select value={filterSpec} onChange={(e) => setFilterSpec(e.target.value)}
          className="sm:w-52 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }}>
          <option value="">All Specializations</option>
          {[...new Set(doctors.map((d) => d.specialization).filter(Boolean))].sort().map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        {(search || filterSpec) && (
          <button onClick={() => { setSearch(""); setFilterSpec(""); }}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-600 border-2 border-purple-200 hover:bg-purple-50 transition-colors whitespace-nowrap">
            Clear
          </button>
        )}

        {/* VIEW TOGGLE */}
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <button onClick={() => setViewMode("card")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={viewMode === "card"
              ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white" }
              : { color: "var(--text)", opacity: 0.5 }}>
            <LayoutGrid size={14} /> Cards
          </button>
          <button onClick={() => setViewMode("table")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={viewMode === "table"
              ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white" }
              : { color: "var(--text)", opacity: 0.5 }}>
            <List size={14} /> Table
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-purple-500" />
            <p className="text-sm font-medium opacity-50">Loading doctors…</p>
          </div>
        </div>

      ) : doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
          <Stethoscope size={40} className="opacity-30" />
          <p className="text-sm font-medium">No doctors found. Add your first specialist.</p>
        </div>

      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] gap-3">
          <Stethoscope size={36} className="opacity-30" />
          <p className="text-sm font-medium">No doctors match your filters.</p>
        </div>

      ) : (
        <div className="max-w-7xl mx-auto">

          {/* ── CARD VIEW ── */}
          {viewMode === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((doc) => (
                <div key={doc._id} className="group relative rounded-3xl p-6 hover:shadow-2xl transition-all duration-300"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar doc={doc} size="md" />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg truncate w-40">{doc.name}</h2>
                        <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {doc.specialization}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(doc)}
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 rounded-xl transition-colors">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(doc._id)} disabled={deletingId === doc._id}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 rounded-xl transition-colors disabled:opacity-50">
                        {deletingId === doc._id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </div>
                  <div style={{ background: "var(--bg)" }} className="mt-6 flex items-center justify-between p-4 rounded-2xl">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Experience</p>
                      <p className="flex items-center gap-1 font-medium">
                        <Briefcase size={14} className="text-purple-500" />
                        {doc.experience} Years
                      </p>
                    </div>
                    <button onClick={() => goToDetail(doc)}
                      style={{ backgroundColor: "var(--border)" }}
                      className="p-3 rounded-xl shadow-sm hover:text-purple-600 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TABLE VIEW ── */}
          {viewMode === "table" && (
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(106,90,205,0.06)", borderBottom: "1px solid var(--border)" }}>
                      {["Doctor", "Specialization", "Experience", "Availability", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: "var(--text)", opacity: 0.4 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((doc, idx) => (
                      <tr key={doc._id}
                        className="transition-colors"
                        style={{ borderBottom: "1px solid var(--border)", background: idx % 2 !== 0 ? "rgba(106,90,205,0.02)" : "transparent" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(106,90,205,0.05)"}
                        onMouseLeave={e => e.currentTarget.style.background = idx % 2 !== 0 ? "rgba(106,90,205,0.02)" : "transparent"}>

                        {/* Doctor name + avatar */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar doc={doc} size="sm" />
                            <div>
                              <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{doc.name}</p>
                              <p className="text-xs opacity-40">{doc.userId?.email || ""}</p>
                            </div>
                          </div>
                        </td>

                        {/* Specialization */}
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 rounded-lg uppercase tracking-wide">
                            {doc.specialization || "—"}
                          </span>
                        </td>

                        {/* Experience */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text)" }}>
                            <Briefcase size={13} className="text-purple-400" />
                            {doc.experience ? `${doc.experience} yrs` : "—"}
                          </div>
                        </td>

                        {/* Availability days */}
                        <td className="px-5 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {doc.availability?.length > 0 ? doc.availability.map((a) => (
                              <span key={a.day} className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                                style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
                                {a.day?.slice(0, 3)}
                              </span>
                            )) : <span className="text-xs opacity-30">No schedule</span>}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button onClick={() => goToDetail(doc)} title="View"
                              className="w-8 h-8 flex items-center justify-center rounded-xl transition"
                              style={{ background: "rgba(106,90,205,0.1)", color: "#6a5acd" }}>
                              <ChevronRight size={15} />
                            </button>
                            <button onClick={() => handleEdit(doc)} title="Edit"
                              className="w-8 h-8 flex items-center justify-center rounded-xl transition"
                              style={{ background: "rgba(234,179,8,0.1)", color: "#ca8a04" }}>
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => handleDelete(doc._id)} disabled={deletingId === doc._id} title="Delete"
                              className="w-8 h-8 flex items-center justify-center rounded-xl transition disabled:opacity-50"
                              style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626" }}>
                              {deletingId === doc._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAGINATION ── */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-xs opacity-40">
              Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} doctors
            </p>
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all disabled:opacity-30"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <ChevronLeft size={16} />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all"
                  style={p === page
                    ? { background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", color: "white", boxShadow: "0 4px 12px rgba(106,90,205,.3)" }
                    : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }}>
                  {p}
                </button>
              ))}

              {/* Next */}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all disabled:opacity-30"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ── CREATE MEMBER MODAL ── */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-800 w-[480px] p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                  <UserCheck size={22} className="text-purple-600" /> Create Member
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Register a new user with a specific role</p>
              </div>
              <button onClick={() => { setShowRegisterModal(false); setRegisterForm({ name: "", email: "", password: "", role: "DOCTOR" }); }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                <X className="dark:text-white" size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "e.g. Dr. John Smith" },
                { label: "Email Address", name: "email", type: "email", placeholder: "e.g. john@hospital.com" },
                { label: "Password", name: "password", type: "password", placeholder: "Set a secure password" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block uppercase tracking-wider">{label}</label>
                  <input type={type} name={name} value={registerForm[name]} onChange={handleRegisterChange} placeholder={placeholder}
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/40 transition-all" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block uppercase tracking-wider">Role</label>
                <select name="role" value={registerForm.role} onChange={handleRegisterChange}
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/40 transition-all">
                  <option value="DOCTOR">Doctor</option>
                  <option value="ADMIN">Admin</option>
                  <option value="RECEPTIONIST">Receptionist</option>
                  <option value="PATIENT">Patient</option>
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => { setShowRegisterModal(false); setRegisterForm({ name: "", email: "", password: "", role: "DOCTOR" }); }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  Cancel
                </button>
                <button onClick={handleRegisterSubmit} disabled={registerLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                  {registerLoading ? <><Loader2 size={16} className="animate-spin" /> Registering…</> : <><UserCheck size={16} /> Register User</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD / EDIT DOCTOR MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-800 w-[600px] p-6 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white">{editId ? "Edit Doctor" : "Add Doctor"}</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }}><X className="dark:text-white" /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">Select Doctor User</label>
                {usersLoading ? (
                  <div className="w-full p-3 rounded-xl bg-gray-100 dark:bg-slate-900 text-slate-400 text-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Loading users…
                  </div>
                ) : (
                  <UserSearchDropdown users={users} value={form.userId} onChange={(id) => setForm((f) => ({ ...f, userId: id }))} />
                )}
              </div>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Doctor Name"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none" />
              <select name="role" value={form.role} onChange={handleChange}
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none">
                <option value="">Select Role</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
                <option value="RECEPTIONIST">Receptionist</option>
              </select>
              <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none" />
              <input type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (Years)"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none" />

              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block">Profile Image</label>
                <label className="group flex flex-col items-center justify-center gap-3 w-full h-36 rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-500 transition-all cursor-pointer overflow-hidden relative">
                  {form.image ? (
                    <>
                      <img src={URL.createObjectURL(form.image)} alt="preview" className="w-full h-full object-cover absolute inset-0" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-semibold">Click to change</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">Click to upload photo</p>
                        <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, WEBP</p>
                      </div>
                    </>
                  )}
                  <input type="file" name="image" accept="image/*" onChange={handleChange} className="sr-only" />
                </label>
                {form.image && (
                  <button type="button" onClick={() => setForm((f) => ({ ...f, image: null }))}
                    className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                    <X size={12} /> Remove image
                  </button>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold dark:text-white">Availability</h3>
                <button type="button" onClick={addDay}
                  className="text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors">
                  + Add Day
                </button>
              </div>
              {availability.map((dayItem, dIdx) => (
                <div key={dIdx} className="bg-gray-100 dark:bg-slate-900 p-4 rounded-xl space-y-3 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                  <div className="flex items-center gap-2">
                    <select value={dayItem.day} onChange={(e) => handleAvailabilityChange(dIdx, null, "day", e.target.value)}
                      className="flex-1 p-2 rounded-lg dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/40 text-sm">
                      <option value="">Select Day</option>
                      {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => <option key={d}>{d}</option>)}
                    </select>
                    <button type="button" onClick={() => removeDay(dIdx)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0">
                      <X size={15} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {dayItem.slots.map((slot, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
                          <span className="text-xs text-slate-400 font-medium w-8 shrink-0">From</span>
                          <input type="time" value={slot.start} onChange={(e) => handleAvailabilityChange(dIdx, sIdx, "start", e.target.value)}
                            className="flex-1 text-sm dark:bg-slate-800 dark:text-white outline-none" />
                          <span className="text-xs text-slate-300">—</span>
                          <span className="text-xs text-slate-400 font-medium w-5 shrink-0">To</span>
                          <input type="time" value={slot.end} onChange={(e) => handleAvailabilityChange(dIdx, sIdx, "end", e.target.value)}
                            className="flex-1 text-sm dark:bg-slate-800 dark:text-white outline-none" />
                        </div>
                        <button type="button" onClick={() => removeSlot(dIdx, sIdx)} disabled={dayItem.slots.length === 1}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addSlot(dIdx)}
                    className="text-xs font-semibold text-purple-500 hover:text-purple-700 transition-colors">
                    + Add time slot
                  </button>
                </div>
              ))}
              {availability.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No days added yet. Click "Add Day" to start.</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors">
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;