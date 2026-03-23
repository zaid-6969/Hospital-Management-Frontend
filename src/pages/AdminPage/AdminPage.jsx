import { useState } from "react";

// ── Icons (inline SVG to avoid deps) ────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  doctors: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  tools: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  appointments: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  plus: "M12 5v14 M5 12h14",
  close: "M18 6L6 18 M6 6l12 12",
  xray: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  mri: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  ultrasound: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  ecg: "M22 12h-4l-3 9L9 3l-3 9H2",
  ct: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z M12 8v4l3 3",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  chevron: "M9 18l6-6-6-6",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
};

// ── Sample Data ──────────────────────────────────────────────────────────────
const initDoctors = [
  { id: 1, name: "Dr. Amara Patel", specialization: "Radiologist", experience: 8, status: "Active", image: "AP" },
  { id: 2, name: "Dr. James Okafor", specialization: "Cardiologist", experience: 12, status: "Active", image: "JO" },
  { id: 3, name: "Dr. Lena Fischer", specialization: "Neurologist", experience: 6, status: "On Leave", image: "LF" },
  { id: 4, name: "Dr. Ravi Sharma", specialization: "Orthopedic", experience: 10, status: "Active", image: "RS" },
];

const initTools = [
  { id: 1, name: "X-Ray Machine", model: "Siemens AXIOM", type: "X-Ray", status: "Operational", location: "Room 101", icon: "xray" },
  { id: 2, name: "MRI Scanner", model: "GE SIGNA 3T", type: "MRI", status: "Operational", location: "Room 203", icon: "mri" },
  { id: 3, name: "CT Scanner", model: "Philips IQon", type: "CT Scan", status: "Maintenance", location: "Room 105", icon: "ct" },
  { id: 4, name: "Ultrasound Unit", model: "Mindray DC-70", type: "Ultrasound", status: "Operational", location: "Room 112", icon: "ultrasound" },
  { id: 5, name: "ECG Machine", model: "Schiller AT-102", type: "ECG", status: "Operational", location: "Room 118", icon: "ecg" },
];

const stats = [
  { label: "Total Doctors", value: "24", sub: "+2 this month", icon: "doctors", color: "from-[#6a5acd] to-[#8e84c6]" },
  { label: "Medical Tools", value: "18", sub: "3 in maintenance", icon: "tools", color: "from-[#3cb47a] to-[#5dd4a0]" },
  { label: "Appointments", value: "142", sub: "Today's count", icon: "appointments", color: "from-[#e8943a] to-[#f5b97a]" },
  { label: "Active Patients", value: "389", sub: "Currently admitted", icon: "users", color: "from-[#e05555] to-[#f08080]" },
];

const specializations = ["Radiologist","Cardiologist","Neurologist","Orthopedic","Dermatologist","Oncologist","Pediatrician","Surgeon"];
const toolTypes = ["X-Ray","MRI","CT Scan","Ultrasound","ECG","Endoscope","Ventilator","Defibrillator"];

// ── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, size = "md" }) => {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-xl bg-[#ede9ff] text-[#6a5acd] font-semibold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
};

// ── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    Active: "bg-green-50 text-green-600 border-green-200",
    "On Leave": "bg-amber-50 text-amber-600 border-amber-200",
    Operational: "bg-green-50 text-green-600 border-green-200",
    Maintenance: "bg-red-50 text-red-500 border-red-200",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${map[status] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
      {status}
    </span>
  );
};

// ── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backdropFilter: "blur(4px)", background: "rgba(26,22,48,0.45)" }}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e0e0e0]">
        <h2 className="text-base font-semibold text-[#222]" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</h2>
        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f8f9fb] text-[#777] transition-colors">
          <Icon d={icons.close} size={16} />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  </div>
);

// ── Form Field ───────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-[#777] uppercase tracking-wide">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input {...props} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e0e0e0] text-sm text-[#222] bg-[#f8f9fb] focus:outline-none focus:ring-2 focus:ring-[#6a5acd]/30 focus:border-[#6a5acd] transition-all placeholder:text-[#bbb]" />
);

const Select = ({ children, ...props }) => (
  <select {...props} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e0e0e0] text-sm text-[#222] bg-[#f8f9fb] focus:outline-none focus:ring-2 focus:ring-[#6a5acd]/30 focus:border-[#6a5acd] transition-all appearance-none cursor-pointer">
    {children}
  </select>
);

// ── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "doctors", label: "Doctors", icon: "doctors" },
  { id: "tools", label: "Medical Tools", icon: "tools" },
  { id: "appointments", label: "Appointments", icon: "appointments" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const Sidebar = ({ active, setActive }) => (
  <aside className="w-[240px] min-h-screen flex-shrink-0 flex flex-col" style={{ background: "#1a1630" }}>
    {/* Logo */}
    <div className="px-6 py-7 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#6a5acd" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div>
          <div className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>MedAdmin</div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Healthcare Portal</div>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
      <div className="px-3 pb-2 pt-1 text-xs font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>MAIN MENU</div>
      {navItems.slice(0, 3).map(item => (
        <button key={item.id} onClick={() => setActive(item.id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
            ${active === item.id
              ? "bg-[#6a5acd] text-white shadow-lg shadow-[#6a5acd]/30"
              : "text-white/50 hover:text-white hover:bg-white/5"}`}>
          <Icon d={icons[item.icon]} size={17} />
          {item.label}
        </button>
      ))}

      <div className="px-3 pb-2 pt-4 text-xs font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>SYSTEM</div>
      {navItems.slice(3).map(item => (
        <button key={item.id} onClick={() => setActive(item.id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
            ${active === item.id
              ? "bg-[#6a5acd] text-white shadow-lg shadow-[#6a5acd]/30"
              : "text-white/50 hover:text-white hover:bg-white/5"}`}>
          <Icon d={icons[item.icon]} size={17} />
          {item.label}
        </button>
      ))}
    </nav>

    {/* Admin profile */}
    <div className="mx-3 mb-4 p-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(255,255,255,0.05)" }}>
      <div className="w-9 h-9 rounded-xl bg-[#6a5acd] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">AD</div>
      <div className="min-w-0">
        <div className="text-white text-sm font-medium leading-tight truncate">Admin User</div>
        <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>admin@medportal.io</div>
      </div>
    </div>
  </aside>
);

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ stat }) => (
  <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-[#e0e0e0]/60 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
      <Icon d={icons[stat.icon]} size={20} stroke="white" />
    </div>
    <div>
      <div className="text-2xl font-bold text-[#222] leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
      <div className="text-sm text-[#777] mt-0.5">{stat.label}</div>
      <div className="text-xs text-[#6a5acd] font-medium mt-1">{stat.sub}</div>
    </div>
  </div>
);

// ── Dashboard View ───────────────────────────────────────────────────────────
const DashboardView = ({ doctors, tools }) => (
  <div className="flex flex-col gap-6">
    {/* Stats */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s, i) => <StatCard key={i} stat={s} />)}
    </div>

    {/* Recent doctors + tools */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Doctors preview */}
      <div className="bg-white rounded-2xl border border-[#e0e0e0]/60 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e0e0e0] flex items-center justify-between">
          <h3 className="font-semibold text-[#222] text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>Recent Doctors</h3>
          <span className="text-xs text-[#6a5acd] font-medium">{doctors.length} total</span>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {doctors.slice(0, 4).map(d => (
            <div key={d.id} className="px-5 py-3 flex items-center gap-3 hover:bg-[#f8f9fb] transition-colors">
              <Avatar initials={d.image} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#222] truncate">{d.name}</div>
                <div className="text-xs text-[#777]">{d.specialization}</div>
              </div>
              <Badge status={d.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Tools preview */}
      <div className="bg-white rounded-2xl border border-[#e0e0e0]/60 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e0e0e0] flex items-center justify-between">
          <h3 className="font-semibold text-[#222] text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>Medical Tools</h3>
          <span className="text-xs text-[#6a5acd] font-medium">{tools.length} devices</span>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {tools.slice(0, 4).map(t => (
            <div key={t.id} className="px-5 py-3 flex items-center gap-3 hover:bg-[#f8f9fb] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#ede9ff] flex items-center justify-center flex-shrink-0">
                <Icon d={icons[t.icon] || icons.tools} size={15} stroke="#6a5acd" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#222] truncate">{t.name}</div>
                <div className="text-xs text-[#777]">{t.location}</div>
              </div>
              <Badge status={t.status} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Activity bar chart placeholder */}
    <div className="bg-white rounded-2xl border border-[#e0e0e0]/60 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#222] text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>Weekly Appointments</h3>
        <span className="text-xs text-[#777]">This week</span>
      </div>
      <div className="flex items-end gap-2 h-24">
        {[65, 80, 55, 90, 70, 142, 45].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-lg transition-all"
              style={{ height: `${(h / 142) * 80}px`, background: i === 5 ? "#6a5acd" : "#ede9ff" }} />
            <span className="text-xs text-[#777]">{["M","T","W","T","F","S","S"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Doctors View ─────────────────────────────────────────────────────────────
const DoctorsView = ({ doctors, setDoctors }) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", specialization: "", experience: "", status: "Active" });

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.specialization) return;
    const initials = form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    setDoctors(prev => [...prev, { ...form, id: Date.now(), image: initials, experience: Number(form.experience) }]);
    setForm({ name: "", specialization: "", experience: "", status: "Active" });
    setShowModal(false);
  };

  const handleDelete = (id) => setDoctors(prev => prev.filter(d => d.id !== id));

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#222]" style={{ fontFamily: "'Syne', sans-serif" }}>Doctors</h2>
          <p className="text-sm text-[#777] mt-0.5">{doctors.length} registered doctors</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]">
              <Icon d={icons.search} size={15} />
            </span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search doctors..."
              className="pl-9 pr-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6a5acd]/30 focus:border-[#6a5acd] w-52 transition-all" />
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "#6a5acd" }}>
            <Icon d={icons.plus} size={15} />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e0e0e0]/60 shadow-sm overflow-hidden">
        <div className="grid text-xs font-semibold text-[#777] uppercase tracking-wide px-5 py-3 border-b border-[#f0f0f0]"
          style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr auto" }}>
          <span>Doctor</span><span>Specialization</span><span>Experience</span><span>Status</span><span>Actions</span>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-[#777] text-sm">No doctors found.</div>
        )}
        {filtered.map((d, i) => (
          <div key={d.id}
            className={`grid items-center px-5 py-3.5 gap-4 hover:bg-[#f8f9fb] transition-colors ${i !== filtered.length - 1 ? "border-b border-[#f0f0f0]" : ""}`}
            style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr auto" }}>
            <div className="flex items-center gap-3">
              <Avatar initials={d.image} size="sm" />
              <div>
                <div className="text-sm font-medium text-[#222]">{d.name}</div>
              </div>
            </div>
            <span className="text-sm text-[#777]">{d.specialization}</span>
            <span className="text-sm text-[#777]">{d.experience} yrs</span>
            <Badge status={d.status} />
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#bbb] hover:text-[#6a5acd] hover:bg-[#ede9ff] transition-colors">
                <Icon d={icons.edit} size={14} />
              </button>
              <button onClick={() => handleDelete(d.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors">
                <Icon d={icons.trash} size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add New Doctor" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Field label="Full Name">
              <Input placeholder="Dr. John Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Specialization">
              <Select value={form.specialization} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))}>
                <option value="">Select specialization</option>
                {specializations.map(s => <option key={s}>{s}</option>)}
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Experience (years)">
                <Input type="number" placeholder="5" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} />
              </Field>
              <Field label="Status">
                <Select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option>Active</option>
                  <option>On Leave</option>
                </Select>
              </Field>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm font-medium text-[#777] hover:bg-[#f8f9fb] transition-colors">
                Cancel
              </button>
              <button onClick={handleAdd}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "#6a5acd" }}>
                Add Doctor
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Tools View ───────────────────────────────────────────────────────────────
const ToolsView = ({ tools, setTools }) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", model: "", type: "X-Ray", status: "Operational", location: "" });

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  const typeIconMap = { "X-Ray": "xray", "MRI": "mri", "CT Scan": "ct", "Ultrasound": "ultrasound", "ECG": "ecg" };

  const handleAdd = () => {
    if (!form.name || !form.model) return;
    setTools(prev => [...prev, { ...form, id: Date.now(), icon: typeIconMap[form.type] || "tools" }]);
    setForm({ name: "", model: "", type: "X-Ray", status: "Operational", location: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => setTools(prev => prev.filter(t => t.id !== id));

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#222]" style={{ fontFamily: "'Syne', sans-serif" }}>Medical Tools</h2>
          <p className="text-sm text-[#777] mt-0.5">{tools.length} devices registered</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]">
              <Icon d={icons.search} size={15} />
            </span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="pl-9 pr-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6a5acd]/30 focus:border-[#6a5acd] w-52 transition-all" />
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "#6a5acd" }}>
            <Icon d={icons.plus} size={15} />
            Add Tool
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-[#e0e0e0]/60 shadow-sm p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#ede9ff] flex items-center justify-center">
                <Icon d={icons[t.icon] || icons.tools} size={20} stroke="#6a5acd" />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#bbb] hover:text-[#6a5acd] hover:bg-[#ede9ff] transition-colors">
                  <Icon d={icons.edit} size={13} />
                </button>
                <button onClick={() => handleDelete(t.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Icon d={icons.trash} size={13} />
                </button>
              </div>
            </div>
            <div className="mb-1 font-semibold text-[#222] text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{t.name}</div>
            <div className="text-xs text-[#777] mb-3">{t.model}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-0.5 rounded-lg font-medium bg-[#ede9ff] text-[#6a5acd]">{t.type}</span>
              <Badge status={t.status} />
            </div>
            <div className="mt-3 pt-3 border-t border-[#f0f0f0] text-xs text-[#777] flex items-center gap-1.5">
              <Icon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" size={12} />
              {t.location}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Medical Tool" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Field label="Tool Name">
              <Input placeholder="e.g. X-Ray Machine" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Model">
              <Input placeholder="e.g. Siemens AXIOM" value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Type">
                <Select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  {toolTypes.map(t => <option key={t}>{t}</option>)}
                </Select>
              </Field>
              <Field label="Status">
                <Select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option>Operational</option>
                  <option>Maintenance</option>
                </Select>
              </Field>
            </div>
            <Field label="Location / Room">
              <Input placeholder="e.g. Room 101" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm font-medium text-[#777] hover:bg-[#f8f9fb] transition-colors">
                Cancel
              </button>
              <button onClick={handleAdd}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "#6a5acd" }}>
                Add Tool
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Main App ─────────────────────────────────────────────────────────────────
export default function Admin() {
  const [active, setActive] = useState("dashboard");
  const [doctors, setDoctors] = useState(initDoctors);
  const [tools, setTools] = useState(initTools);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.2s ease; }
      `}</style>
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <Sidebar active={active} setActive={setActive} />

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-[#e0e0e0] px-6 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
            <div>
              <h1 className="text-base font-semibold text-[#222] capitalize" style={{ fontFamily: "'Syne', sans-serif" }}>
                {active === "dashboard" ? "Overview" : active.replace("-", " ")}
              </h1>
              <p className="text-xs text-[#777]">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-[#e0e0e0] text-[#777] hover:bg-[#f8f9fb] transition-colors">
                <Icon d={icons.bell} size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6a5acd]" />
              </button>
              <div className="w-9 h-9 rounded-xl bg-[#6a5acd] flex items-center justify-center text-white text-xs font-semibold">AD</div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {active === "dashboard" && <DashboardView doctors={doctors} tools={tools} />}
            {active === "doctors" && <DoctorsView doctors={doctors} setDoctors={setDoctors} />}
            {active === "tools" && <ToolsView tools={tools} setTools={setTools} />}
            {(active === "appointments" || active === "settings") && (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#ede9ff] flex items-center justify-center">
                  <Icon d={icons[active] || icons.settings} size={24} stroke="#6a5acd" />
                </div>
                <div className="text-base font-semibold text-[#222] capitalize" style={{ fontFamily: "'Syne', sans-serif" }}>{active} — Coming Soon</div>
                <p className="text-sm text-[#777]">This section is under construction.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}