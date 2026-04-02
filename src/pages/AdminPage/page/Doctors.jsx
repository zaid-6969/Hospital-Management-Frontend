import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../service/api";
import {
  UserPlus,
  Edit3,
  Trash2,
  Stethoscope,
  X,
  ChevronRight,
  Briefcase,
  Loader2,
} from "lucide-react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    name: "",
    specialization: "",
    experience: "",
    image: null,
    role: "",
  });

  const [availability, setAvailability] = useState([
    { day: "", slots: [{ start: "", end: "" }] },
  ]);

  // ── FETCH ──────────────────────────────────────────────────────
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctors();
      // handle both res.data = [] and res.data.doctors = []
      const list = Array.isArray(res.data)
        ? res.data
        : (res.data?.doctors ?? res.data?.data ?? []);
      setDoctors(list);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ── HELPERS ────────────────────────────────────────────────────
  const resetForm = () => {
    setForm({
      userId: "",
      name: "",
      specialization: "",
      experience: "",
      image: null,
      role: "",
    });
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
    setForm({
      userId: doc.userId?._id || doc.userId || "",
      name: doc.name,
      specialization: doc.specialization,
      experience: doc.experience,
      image: null,
      role: doc.role,
    });
    setAvailability(
      doc.availability?.length
        ? doc.availability
        : [{ day: "", slots: [{ start: "", end: "" }] }],
    );
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this doctor?")) return;
    try {
      await deleteDoctor(id);
      fetchDoctors();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "")
        formData.append(key, form[key]);
    });
    formData.append("availability", JSON.stringify(availability));
    try {
      if (editId) await updateDoctor(editId, formData);
      else await createDoctor(formData);
      setShowModal(false);
      resetForm();
      fetchDoctors();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // ── AVAILABILITY ───────────────────────────────────────────────
  const addDay = () =>
    setAvailability((p) => [
      ...p,
      { day: "", slots: [{ start: "", end: "" }] },
    ]);

  const handleAvailabilityChange = (dIdx, sIdx, field, val) => {
    setAvailability((prev) =>
      prev.map((d, i) =>
        i !== dIdx
          ? d
          : {
              ...d,
              day: field === "day" ? val : d.day,
              slots:
                field !== "day"
                  ? d.slots.map((s, j) =>
                      j === sIdx ? { ...s, [field]: val } : s,
                    )
                  : d.slots,
            },
      ),
    );
  };

  // ── NAVIGATE TO DETAIL ─────────────────────────────────────────
  // Pass the doctor's _id via router state — AdminDoctorDetails reads location.state.id
  const goToDetail = (doc) => {
    navigate("/admin/doctor-details", { state: { id: doc._id } });
  };

  // ── RENDER ─────────────────────────────────────────────────────
  return (
    <div
      className=" p-4 md:p-8 transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 style={{ color: "var(--text)" }} className="text-3xl font-black  flex items-center gap-3">
            <Stethoscope className="text-purple-600" size={32} />
            Medical Staff
          </h1>
          <p style={{ color: "var(--text)" }}  className=" mt-1">
            Manage specialist profiles and track clinical performance.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <UserPlus size={20} /> Add Members
        </button>
      </div>

      {/* LOADING / EMPTY / GRID */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="flex flex-col items-center gap-3 "  style={{ color: "var(--text)" }} >
            <Loader2 size={32} className="animate-spin text-purple-500" />
            <p className="text-sm font-medium">Loading doctors…</p>
          </div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3" style={{ color: "var(--text)" }} >
          <Stethoscope size={40} className="opacity-30" />
          <p className="text-sm font-medium">
            No doctors found. Add your first specialist.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="group relative rounded-3xl p-6 hover:shadow-2xl transition-all duration-300"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {doc.image?.url ? (
                      <img
                        src={doc.image.url}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-700"
                        alt={doc.name}
                      />
                    ) : (
                      <div
                      style={{ color: "var(--text)" }} 
                        className=" w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold ring-4 ring-slate-50 dark:ring-slate-700"
                        style={{
                          background: " linear-gradient(135deg,#6a5acd,#8b5cf6)",
                        }}
                      >
                        {doc.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2) ?? "DR"}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg truncate w-40" style={{ color: "var(--text)" }} >
                      {doc.name}
                    </h2>
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {doc.specialization}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 rounded-xl transition-colors"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div style={{ background: "var(--bg)" }} className="mt-6 flex items-center justify-between  p-4 rounded-2xl">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
                    Experience
                  </p>
                  <p  style={{ color: "var(--text)" }}  className="font-bol flex items-center gap-1">
                    <Briefcase size={14} className="text-purple-500" />
                    {doc.experience} Years
                  </p>
                </div>
                {/* ✅ onClick passes doc._id via router state */}
                <button
                  onClick={() => goToDetail(doc)}
                  style={{backgroundColor:"var(--border)"}}
                  className="p-3 rounded-xl shadow-sm hover:text-purple-600 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-800 w-[600px] p-6 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white">
                {editId ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <X className="dark:text-white" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="Doctor User ID"
                className="col-span-2 p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none"
              />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Doctor Name"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none"
              >
                <option value="">Select Role</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
                <option value="RECEPTIONIST">Receptionist</option>
              </select>
              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none"
              />
              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience (Years)"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 dark:text-white outline-none"
              />
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
                  Profile Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-sm dark:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-bold dark:text-white">Availability</h3>
              {availability.map((dayItem, dIdx) => (
                <div
                  key={dIdx}
                  className="bg-gray-100 dark:bg-slate-900 p-4 rounded-xl space-y-3"
                >
                  <select
                    value={dayItem.day}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        dIdx,
                        null,
                        "day",
                        e.target.value,
                      )
                    }
                    className="w-full p-2 rounded dark:bg-slate-800 dark:text-white outline-none"
                  >
                    <option value="">Select Day</option>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  {dayItem.slots.map((slot, sIdx) => (
                    <div key={sIdx} className="flex gap-2">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            dIdx,
                            sIdx,
                            "start",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 rounded dark:bg-slate-800 dark:text-white outline-none"
                      />
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            dIdx,
                            sIdx,
                            "end",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 rounded dark:bg-slate-800 dark:text-white outline-none"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={addDay}
                className="text-purple-600 font-semibold text-sm"
              >
                + Add Day
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              >
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
