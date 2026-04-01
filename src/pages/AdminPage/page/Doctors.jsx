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
  Calendar,
  Award,
  X,
  ChevronRight,
  Briefcase,
  Activity,
  PieChart as PieIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
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

  // 🔹 FETCH DATA
  const fetchDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // 🔹 FORM HANDLERS
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleEdit = (doc) => {
    setEditId(doc._id);
    setForm({
      userId: doc.userId?._id || doc.userId,
      name: doc.name,
      specialization: doc.specialization,
      experience: doc.experience,
      image: null,
      role: doc.role,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      await deleteDoctor(id);
      fetchDoctors();
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });
    formData.append("availability", JSON.stringify(availability));

    try {
      if (editId) await updateDoctor(editId, formData);
      else await createDoctor(formData);
      setShowModal(false);
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 AVAILABILITY LOGIC
  const addDay = () =>
    setAvailability([
      ...availability,
      { day: "", slots: [{ start: "", end: "" }] },
    ]);
  const handleAvailabilityChange = (dIdx, sIdx, field, val) => {
    const updated = [...availability];
    if (field === "day") updated[dIdx].day = val;
    else updated[dIdx].slots[sIdx][field] = val;
    setAvailability(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] p-4 md:p-8 transition-colors duration-300">
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Stethoscope className="text-purple-600" size={32} />
            Medical Staff
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage specialist profiles and track clinical performance.
          </p>
        </div>
        <button
          onClick={() => {
            setEditId(null);
            setShowModal(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <UserPlus size={20} /> Add Specialist
        </button>
      </div>

      {/* --- MAIN DOCTOR GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      doc.image?.url ||
                      "https://ui-avatars.com/api/?name=" + doc.name
                    }
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-700"
                    alt={doc.name}
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900 dark:text-white truncate w-40">
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

            {/* QUICK STATS PIE CHART MINI PREVIEW */}
            <div className="mt-6 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
                  Experience
                </p>
                <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Briefcase size={14} className="text-purple-500" />{" "}
                  {doc.experience} Years
                </p>
              </div>
              <button
                onClick={() =>
                  navigate("/admin/doctor-details", {
                    state: { id: doc._id },
                  })
                }
                className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:text-purple-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- PROFESSIONAL MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-800 w-[600px] p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white">
                {editId ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* USER ID */}
              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="Doctor User ID"
                className="col-span-2 p-3 rounded-xl bg-gray-100 dark:bg-slate-900"
              />

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Doctor Name"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900 col-span-2"
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
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900"
              />

              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-900"
              />

              <input type="file" name="image" onChange={handleChange} />
            </div>

            {/* AVAILABILITY */}
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
                    className="w-full p-2 rounded"
                  >
                    <option>Select Day</option>
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
                        className="w-full p-2 rounded"
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
                        className="w-full p-2 rounded"
                      />
                    </div>
                  ))}
                </div>
              ))}

              <button onClick={addDay} className="text-purple-600">
                + Add Day
              </button>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
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

export default Doctors;
