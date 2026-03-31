import { useEffect, useState } from "react";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../service/api";
import {
  ChevronRight,
  Stethoscope,
  Star,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
  });

  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  const handleSubmit = async () => {
    if (editing) {
      await updateDoctor(editing._id, form);
    } else {
      await createDoctor(form);
    }

    setForm({ name: "", specialization: "" });
    setEditing(null);
    setShowModal(false);
    fetchDoctors();
  };

  const handleEdit = (doc) => {
    setEditing(doc);
    setForm({
      name: doc.name,
      specialization: doc.specialization,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  return (
    <div className=" bg-bg  space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Doctors</h1>

        <button
          onClick={() => setShowModal(true)}
          className="p-3 bg-violet-600 text-white rounded-lg text-sm font-semibold"
        >
          + Add Doctor
        </button>
      </div>

      {/* LIST */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
        <div className="grid gap-4">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="p-4 border border-border rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-text">{doc.name}</p>
                <p className="text-sm text-text/60">{doc.specialization}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(doc)}
                  className="px-3 py-1 text-sm bg-primary/10 text-primary rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(doc._id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-card p-6 rounded-2xl w-[350px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-text">
              {editing ? "Edit Doctor" : "Add Doctor"}
            </h2>

            <input
              type="text"
              placeholder="Doctor Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 p-2 border border-border rounded-lg bg-card text-text"
            />

            <input
              type="text"
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) =>
                setForm({
                  ...form,
                  specialization: e.target.value,
                })
              }
              className="w-full mb-4 p-2 border border-border rounded-lg bg-card text-text"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-secondary/20 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-primary text-white rounded-lg"
              >
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── QUICK STAT TILES ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Doctors tile — purple tint */}
        <div
          className="rounded-2xl p-5 border relative overflow-hidden"
          style={{ background: "var(--card)", borderColor: "#6a5acd33" }}
        >
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6"
            style={{ background: "rgba(106,90,205,0.08)" }}
          />
          <div
            className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
            style={{ background: "rgba(106,90,205,0.12)" }}
          >
            <Stethoscope size={18} style={{ color: "#6a5acd" }} />
          </div>
          <p
            className="text-3xl font-extrabold"
            style={{ color: "var(--text)" }}
          >
            {doctors.length}
          </p>
          <p
            className="text-xs font-semibold mt-0.5"
            style={{ color: "#6a5acd" }}
          >
            Registered Doctors
          </p>
        </div>

        {/* Satisfaction tile — star yellow */}
        <div
          className="rounded-2xl p-5 border relative overflow-hidden"
          style={{ background: "var(--card)", borderColor: "#f59e0b33" }}
        >
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6"
            style={{ background: "rgba(245,158,11,0.08)" }}
          />
          <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
            <Star size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-amber-500">4.9</p>
          <p className="text-xs font-semibold mt-0.5 text-amber-600">
            Patient Satisfaction
          </p>
        </div>

        {/* Efficiency tile — green */}
        <div
          className="rounded-2xl p-5 border relative overflow-hidden"
          style={{ background: "var(--card)", borderColor: "#10b98133" }}
        >
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6"
            style={{ background: "rgba(16,185,129,0.08)" }}
          />
          <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
            <Activity size={18} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-500">88%</p>
          <p className="text-xs font-semibold mt-0.5 text-emerald-600">
            Clinical Efficiency
          </p>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Appointments */}
        <div
          className="lg:col-span-2 rounded-2xl border overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <h2
                className="font-bold text-sm"
                style={{ color: "var(--text)" }}
              >
                Recent Appointments
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text)", opacity: 0.4 }}
              >
                Latest patient activity
              </p>
            </div>
            <button
              className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg"
              style={{ color: "#6a5acd", background: "rgba(106,90,205,0.1)" }}
            >
              View all <ChevronRight size={13} />
            </button>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {appointments.slice(0, 6).map((item) => {
              const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.REQUESTED;
              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between px-5 py-3.5 transition-colors"
                  style={{ cursor: "default" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(106,90,205,0.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold text-white"
                      style={{
                        background: "linear-gradient(135deg, #6a5acd, #8b5cf6)",
                      }}
                    >
                      {item.patientId?.name?.[0] || "P"}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--text)" }}
                      >
                        {item.patientId?.name || "Patient"}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text)", opacity: 0.4 }}
                      >
                        {item.doctorId?.name || "Unassigned"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="hidden sm:block text-xs"
                      style={{ color: "var(--text)", opacity: 0.35 }}
                    >
                      {item.date}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${sc.cls}`}
                    >
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })}
            {appointments.length === 0 && (
              <div
                className="py-12 text-center text-sm"
                style={{ color: "var(--text)", opacity: 0.3 }}
              >
                No appointments yet
              </div>
            )}
          </div>
        </div>

        {/* Doctors panel */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* Purple header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #6a5acd, #8b5cf6)" }}
          >
            <div>
              <h2 className="font-bold text-sm text-white">Doctors</h2>
              <p className="text-xs text-white/60 mt-0.5">
                {doctors.length} registered
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Stethoscope size={15} className="text-white" />
            </div>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {doctors.slice(0, 6).map((doc, i) => {
              const colors = [
                "#6a5acd",
                "#8b5cf6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#06b6d4",
              ];
              const bg = colors[i % colors.length];
              return (
                <div
                  key={doc._id}
                  onClick={() => navigate(`/admin/doctor/${doc._id}`)}
                  className="flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors group"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(106,90,205,0.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                    style={{ background: bg }}
                  >
                    {doc.name?.[0] || "D"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text)" }}
                    >
                      {doc.name}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text)", opacity: 0.4 }}
                    >
                      {doc.specialization}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    style={{ color: "var(--text)", opacity: 0.2 }}
                    className="group-hover:opacity-60 transition shrink-0"
                  />
                </div>
              );
            })}
            {doctors.length === 0 && (
              <div
                className="py-12 text-center text-sm"
                style={{ color: "var(--text)", opacity: 0.3 }}
              >
                No doctors yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctors;
